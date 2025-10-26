import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type OAuthType = 'kakao' | 'google';

interface OAuthPopUp {
	open: (type: OAuthType) => void;
	code: string | null;
	close: () => void;
	isOpen: boolean;
}

const useOAuthPopUp = (): OAuthPopUp => {
	const popUpRef = useRef<Window | null>(null);
	const [code, setCode] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback((type: OAuthType) => {
		const OAUTH_URLS: Record<OAuthType, string> = {
			kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`,
			google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`,
		};

		const url = OAUTH_URLS[type];

		// ✅ RN WebView 환경: RN에게 URL을 직접 전달
		if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'OPEN_AUTH', url }));
			setIsOpen(true);
			return;
		}

		// ✅ 일반 브라우저 팝업
		const width = 500;
		const height = 600;
		const left = window.screen.width / 2 - width / 2;
		const top = window.screen.height / 2 - height / 2;

		const newPopUp = window.open(url, type, `width=${width},height=${height},left=${left},top=${top}`);

		if (newPopUp) {
			popUpRef.current = newPopUp;
			setIsOpen(true);
		}
	}, []);

	const close = useCallback(() => {
		if (popUpRef.current) {
			popUpRef.current.close();
			popUpRef.current = null;
			setIsOpen(false);
		}
	}, []);

	// ✅ code 수신 (RN → WebView / 브라우저 팝업)
	useEffect(() => {
		const oAuthCodeListener = (event: MessageEvent) => {
			try {
				const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

				if (typeof data === 'object' && data !== null && ('code' in data || 'type' in data)) {
					if (data.type === 'OAUTH_CODE' && data.code) {
						setCode(data.code);
						setIsOpen(false);
					}
					if (!data.type && data.code) {
						setCode(data.code);
						setIsOpen(false);
					}
				}
			} catch (e) {
				console.warn('OAuth 메시지 파싱 실패:', e);
			}
		};

		window.addEventListener('message', oAuthCodeListener);
		return () => window.removeEventListener('message', oAuthCodeListener);
	}, []);

	// ✅ 팝업 상태 체크 (브라우저용)
	useEffect(() => {
		const interval = setInterval(() => {
			if (popUpRef.current && popUpRef.current.closed) {
				popUpRef.current = null;
				setIsOpen(false);
			}
		}, 700);
		return () => clearInterval(interval);
	}, []);

	return useMemo(() => ({ open, code, close, isOpen }), [open, code, close, isOpen]);
};

export default useOAuthPopUp;
