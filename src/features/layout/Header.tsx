// Global Navigation Bar
'use server';

import Navibar from './Navibar';
import Link from 'next/link';
import Image from 'next/image';
import { SolidBtn } from '@/shared/components/SolidBtn';
import SearchIcon from '@/shared/icon/Search';
import { CLIENT_NAVI_PATH, MODAL_PATH } from '@/shared/const/url';
import Logo from '@/shared/icon/Logo';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/shared/const/cookie';

const Header = async () => {
	const cookieStore = await cookies();
	const isLogin = cookieStore.get(COOKIE_NAME.auth.access)?.value;
	const profileImg = cookieStore.get(COOKIE_NAME.auth.img)?.value;

	return (
		<header className="sticky top-0 w-full px-5 mx-auto flex justify-center bg-white z-20 shadow-xs">
			<div className="flex justify-between items-center top-0 w-full max-w-maxw h-16">
				<Link href="/" className="font-medium">
					<Logo className="w-[112px] h-[32px] object-contain" role="img" aria-label="서비스 로고" />
				</Link>
				<Navibar />
				<div className="flex gap-5 items-center ">
					<Link href={CLIENT_NAVI_PATH.search.path}>
						<SearchIcon width={24} height={24} />
					</Link>
					{isLogin && !!profileImg ? (
						<Link href="/mypage" className="w-8 h-8 overflow-hidden">
							<Image
								src={profileImg}
								alt="프로필 이미지"
								width={32}
								height={32}
								draggable={false}
								sizes="100vw"
								className="rounded-full w-8 h-8 object-cover object-center border-1 border-line-normal"
							/>
						</Link>
					) : (
						<Link href={MODAL_PATH.login}>
							<SolidBtn label="로그인" size="small" />
						</Link>
					)}

					<Link href={MODAL_PATH.link} className="desktop:hidden cursor-pointer">
						<Image src="/svgs/menu.svg" alt="네비바 열기" width={24} height={24} draggable={false} />
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
