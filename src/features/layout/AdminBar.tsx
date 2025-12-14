import { ADMIN_NAVIBAR_PATH } from '@/shared/const/url';
import Logo from '@/shared/icon/Logo';
import Link from 'next/link';

const AdminBar = () => {
	return (
		<header className="sticky top-0 w-full px-5 mx-auto flex justify-center bg-white z-20 shadow-xs">
			<div className="flex justify-between items-center top-0 w-full max-w-maxw h-16">
				<Link href="/admin" className="font-medium">
					<Logo className="w-[112px] h-[32px] object-contain" role="img" aria-label="서비스 로고" />
				</Link>
				<nav className="hidden desktop:flex justify-between items-center gap-[70px] ">
					{ADMIN_NAVIBAR_PATH.map(({ name, path }) => (
						<Link key={name} href={path} className="typo-body1-normal font-bold text-label-normal">
							{name}
						</Link>
					))}
				</nav>

				{/* TODO: 반응형 보류 */}
				{/* <div className="flex gap-5 items-center "></div> */}
			</div>
		</header>
	);
};

export default AdminBar;
