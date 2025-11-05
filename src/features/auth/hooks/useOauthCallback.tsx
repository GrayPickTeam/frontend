import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { loginUser, OAuthType } from '../api/oauth';
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

		// ✅ RN WebView 환경 (ReactNativeWebView 존재)
		if (window.ReactNativeWebView) {
			try {
				// 로그인 직전 기록한 history 길이 가져오기
				const preLoginHistoryLength = Number(localStorage.getItem('pre_login_history_length') || 0);
				localStorage.removeItem('pre_login_history_length');

				// 현재 페이지 기준 뒤로 이동할 단계 계산
				const naviDepth = preLoginHistoryLength - window.history.length - 1;

				const doLogin = async () => {
					try {
						const user = await loginUser(code, type);

						if (!user.nickname) {
							// 닉네임 없으면 온보딩
							router.replace('/onboarding');
							return;
						}

						// 로그인 성공, 캐시 초기화 후 원래 페이지 복귀
						queryClient.clear();
						if (naviDepth < 0) {
							window.history.go(naviDepth);
						} else {
							router.replace('/'); // fallback
						}
					} catch (err) {
						console.error('로그인 실패:', err);
						// 실패 시 원래 페이지 복귀 시도
						if (naviDepth < 0) {
							window.history.go(naviDepth + 1);
						} else {
							router.replace('/');
						}
					}
				};

				doLogin();
			} catch (err) {
				console.error('원래 페이지 복귀 실패:', err);
				router.replace('/');
			}

			return;
		}

		// 웹이나 rn내부가 아닌경우는 외부 브라우저 -> 딥링크로 복귀 시도
		const deeplinkUrl = `com.graypick.co.kr://callback?code=${code}`;
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
