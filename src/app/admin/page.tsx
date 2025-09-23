import { SolidBtn } from '@/shared/components/SolidBtn';
import { CLIENT_NAVI_PATH } from '@/shared/const/url';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: '관리자 페이지',
};

export default function Admin() {
	return (
		<div className="flex items-center justify-center min-h-screen flex-col gap-0.5">
			관리자 페이지입니다.
			<Link href={CLIENT_NAVI_PATH.home.path}>
				<SolidBtn label="그레이픽 유저서비스로 이동" />
			</Link>
		</div>
	);
}
