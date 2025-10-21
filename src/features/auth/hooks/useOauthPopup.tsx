import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type OAuthType = 'kakao' | 'google';

interface OAuthPopUp {
	open: (type: OAuthType) => void;
	code: string | null;
	close: () => void;
	isOpen: boolean;
}

// RN WebView / 브라우저 팝업 메시지 타입 정의
interface OAuthMessage {
	type?: 'OAUTH_CODE';
	code?: string;
}

// Oauth팝업을 열고 팝업창을 통해 code를 수신하는 훅
const useOAuthPopUp = (): OAuthPopUp => {
	const popUpRef = useRef<Window | null>(null);
	const [code, setCode] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback((type: OAuthType) => {
		const width = 500;
		const height = 600;
		const left = window.screen.width / 2 - width / 2;
		const top = window.screen.height / 2 - height / 2;

		const OAUTH_URLS: Record<OAuthType, string> = {
			kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`,
			google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`,
		};

		const TITLE_MAP: Record<OAuthType, string> = {
			kakao: '카카오',
			google: '구글',
		};

		const url = OAUTH_URLS[type];
		const newPopUp = window.open(url, TITLE_MAP[type], `width=${width},height=${height},left=${left},top=${top}`);

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

	// ✅ 부모 창에서 메시지 수신 (웹 브라우저 + RN WebView)
	useEffect(() => {
		if (window.opener) return;

		const oAuthCodeListener = (event: MessageEvent) => {
			try {
				let data: unknown;

				// RN WebView에서 오는 경우 문자열(JSON)일 수 있음
				if (typeof event.data === 'string') {
					data = JSON.parse(event.data);
				} else {
					data = event.data;
				}

				// 타입가드
				const isOAuthMessage = (obj: unknown): obj is OAuthMessage => {
					return typeof obj === 'object' && obj !== null && ('code' in obj || 'type' in obj);
				};

				if (!isOAuthMessage(data)) return;

				// RN WebView에서 오는 경우
				if (data.type === 'OAUTH_CODE' && data.code) {
					setCode(data.code);
					setIsOpen(false);
				}

				// 기존 브라우저 팝업 방식
				if (!data.type && data.code) {
					setCode(data.code);
					setIsOpen(false);
				}
			} catch (e) {
				console.warn('OAuth 메시지 파싱 실패:', e);
			}
		};

		window.addEventListener('message', oAuthCodeListener);
		return () => window.removeEventListener('message', oAuthCodeListener);
	}, []);

	// 0.7초마다 팝업창 열림 여부 확인
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
