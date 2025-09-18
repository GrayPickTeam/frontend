import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_NAME } from './shared/const/cookie';
import { clearAuth } from './features/auth/utils/cookie';
import { MODAL_PATH } from './shared/const/url';

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const cookieStore = await cookies();

	// 오타 방지용 상수값 관리
	const { access, nickname } = COOKIE_NAME.auth;
	const protectedPaths = ['/onboarding', '/mypage', '/mypage/profile'];

	const hasToken = cookieStore.has(access);
	const nickValue = cookieStore.get(nickname)?.value;

	if (hasToken && nickValue === '' && !(pathname === '/onboarding')) {
		const referer = req.headers.get('referer') || '';
		const isFromModalLogin = referer.includes(MODAL_PATH.login);

		// modal-login에서 온 경우라면 생략 (slot 삭제에 의한 경유인 경우 무시)
		if (!isFromModalLogin) {
			await clearAuth();
			return NextResponse.redirect(new URL('/', req.url));
		}
	}
	// 토큰없을 경우 특정 페이지 진입 불가
	if (!hasToken && protectedPaths.includes(pathname)) {
		await clearAuth();
		return NextResponse.redirect(new URL('/?logout=true', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.well-known|sitemap.xml|robots.txt|.*.png$|.*.svg$|.*.jpg$).*)'],
};
