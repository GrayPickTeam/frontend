'use server';

import { SERVER_URL } from '@/shared/const/url';
import { redirect } from 'next/navigation';
import { AuthResult, storeAuth } from '../utils/cookie';
import { SocialType } from '@/shared/components/SocialBtn';

export type OAuthType = 'kakao' | 'google';

export const authorize = async (type: OAuthType) => {
	const oauthURL = {
		kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`,
		google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`,
	};

	redirect(oauthURL[type]);
};

export const loginUser = async (code: string, type: SocialType): Promise<AuthResult> => {
	const URL_MAP: Record<SocialType, string> = {
		kakao: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
		google: `${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`,
	};

	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${SERVER_URL.oauth}/${type}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify({
			code,
			redirectUri: URL_MAP[type],
		}),
		cache: 'no-store',
	});

	if (!response.ok) {
		console.error('소셜 로그인 실패', await response.text());
		throw new Error('소셜 에러');
	}
	const data = await response.json();
	const result = data.result;

	await storeAuth(result);

	return result;
};
