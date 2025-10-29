import { useEffect } from 'react';

export const useOauthCallback = () => {
	useEffect(() => {
		const url = new URL(window.location.href);
		const code = url.searchParams.get('code');

		if (!code) return;

		// ✅ RN WebView 환경 (ReactNativeWebView 존재)
		if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'OAUTH_CODE', code }));
			return;
		}

		// ✅ 일반 브라우저 팝업 환경
		if (window.opener) {
			window.opener.postMessage({ type: 'OAUTH_CODE', code }, '*');
			window.close?.();
			return;
		}
	}, []);
};
