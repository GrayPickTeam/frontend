import WithDrawalForm from '@/features/mypage/WithDrawalForm';
import { COOKIE_NAME } from '@/shared/const/cookie';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: '회원 탈퇴',
};

export default async function withDrawal() {
	const cookieStore = await cookies();
	const nickname = cookieStore.get(COOKIE_NAME.auth.nickname)?.value;
	return (
		<div className="flex flex-col max-w-[480px] w-full justify-center px-5 py-12 desktop:py-15 gap-6 mx-auto desktop:gap-10">
			<p className="flex flex-col  gap-5 w-full">
				<span className="typo-heading1 font-bold text-label-normal">{nickname}님과 마지막이라니 아쉬워요</span>
				<span className="typo-body1-normal text-label-neutral font-regular">
					그레이픽 서비스를 이용해주셔서 감사해요.
					<br />
					고객님이 느끼셨던 점을 저희에게 공유해주시면 더욱 알찬 서비스를 제공할 수 있도록 최선을 다하겠습니다.
				</span>
			</p>

			<WithDrawalForm nickname={nickname || ''} />
		</div>
	);
}
