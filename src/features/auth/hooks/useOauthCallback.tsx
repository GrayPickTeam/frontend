import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { OAuthType } from '../api/oauth';
import { useQueryClient } from '@tanstack/react-query';

export const useOauthCallback = (type: OAuthType) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	useEffect(() => {
		const url = new URL(window.location.href);
		const code = url.searchParams.get('code');
		if (!code) return;

		// ✅ 일반 브라우저 팝업 환경
		if (window.opener) {
			window.opener.postMessage({ type: 'OAUTH_CODE', code }, '*');
			window.close?.();
			return;
		}

		//모바일에서 앱 외부 브라우저 -> 딥링크로 복귀 시도
		const deeplinkUrl = `com.graypick://callback?code=${code}`;
		let opened = false;

		const handleBlur = () => {
			opened = true; // 앱으로 전환됨
			clearTimeout(timer);
			window.removeEventListener('blur', handleBlur);
		};

		window.addEventListener('blur', handleBlur);

		const timer = setTimeout(() => {
			window.removeEventListener('blur', handleBlur);
			if (!opened) {
				alert('앱이 설치되어 있지 않아요. 앱에서 다시 시도해주세요.');
			}
		}, 1000);

		window.location.href = deeplinkUrl;
	}, [queryClient, router, type]);
};
