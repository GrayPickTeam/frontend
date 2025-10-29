'use client';

import { useOauthCallback } from '@/features/auth/hooks/useOauthCallback';

export default function OAuthCallbackPage() {
	useOauthCallback();

	return <p>로그인 처리 중입니다...</p>;
}
