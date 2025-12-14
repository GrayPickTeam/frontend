import { myProfileInfo } from '@/features/mypage/api/server';
import MyContents from '@/features/mypage/MyContents';
import UserInfo from '@/features/mypage/UserInfo';
import { MODAL_PATH } from '@/shared/const/url';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
	title: '마이페이지',
};

export default async function MyPage() {
	const response = await myProfileInfo();

	if (response.status === 'relogin') {
		redirect(MODAL_PATH.login, RedirectType.push);
	}

	return (
		<div className="flex w-full justify-center min-h-[calc(100vh-64px-94px)] desktop:bg-bg-gray">
			<div className="flex flex-col w-full justify-center items-center gap-5 desktop:flex-row desktop:items-start desktop:pt-7 max-w-maxw">
				<section className="flex flex-col items-center px-5 w-full desktop:px-10 pt-[50px] desktop:py-14 desktop:w-[387px] gap-6 desktop:gap-9 desktop:border-2 bg-white desktop:border-line-normal-alternative desktop:rounded-[20px]">
					<UserInfo {...response.result} />
				</section>
				<section className="flex w-full">
					<MyContents {...response.result} />
				</section>
			</div>
		</div>
	);
}
