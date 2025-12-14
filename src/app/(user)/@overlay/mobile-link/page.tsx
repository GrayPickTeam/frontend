import HamberMenu from '@/features/layout/HamberMenu';
import Link from 'next/link';
import { isLoggedIn } from '@/features/auth/utils/cookie';
import { NAVIBAR_PATH } from '@/shared/const/url';
import Logo from '@/shared/icon/Logo';
import LogoutBtn from '@/features/layout/LogoutBtn';

export default async function Page() {
	const isLoggedInUser = await isLoggedIn();

	return (
		<HamberMenu>
			<div className="flex flex-col mt-[68px] px-2.5 py-2 gap-3">
				<Logo className="w-[150px] h-[42px]  ml-4.5" />
				<nav className="flex flex-col">
					{NAVIBAR_PATH.map(({ name, path }) => (
						<NaviBtn key={name} title={name} link={path} />
					))}
				</nav>
			</div>
			<LogoutBtn isLogin={isLoggedInUser} />
		</HamberMenu>
	);
}

interface NaviBtnProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	title: string;
	link: string;
}

const NaviBtn = ({ title, link, ...anchorProps }: NaviBtnProps) => {
	return (
		<Link href={link} {...anchorProps} className="ml-8 my-3 typo-body1-normal font-regular text-label-normal">
			{title}
		</Link>
	);
};
