'use client';

import { useOauthCallback } from '@/features/auth/hooks/useOauthCallback';

export default function OAuthCallbackPage() {
	useOauthCallback('google');

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<p className="typo-heading1 mb-4">로그인 처리 중입니다...</p>
			<div className="w-8 h-8 border-4 border-accent-bg-blue border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
}
