'use client';

import { useLoginWithOauthCode } from '@/features/auth/hooks/useLoginWithOauthCode';
import useOAuthPopUp from '@/features/auth/hooks/useOauthPopup';
import LoginFailText from '@/features/auth/LoginFailText';
import Modal from '@/shared/components/Modal';
import SocialBtn from '@/shared/components/SocialBtn';
import Logo from '@/shared/icon/Logo';

export default function Page() {
	const { open, code, isOpen } = useOAuthPopUp();
	const { isFail, setSocialType } = useLoginWithOauthCode(code);

	return (
		<Modal>
			<div className="flex flex-col items-center w-full px-6 desktop:px-0 py-[42px] max-w-[335px] desktop:max-w-[320px] desktop:pt-[143px]  gap-6 desktop:gap-[48px] ">
				<div className="flex flex-col gap-5 items-center">
					<Logo className="w-[112px] h-[32px] desktop:w-[175px] desktop:h-[50px]" />
					<div className="h-12 text-center typo-body2-normal  desktop:typo-body1-normal ">
						3초면 끝.
						<br />
						당신의 일상에 딱, 바로 이 픽!
					</div>
				</div>
				<div className="flex flex-col gap-2 w-full items-center box-border">
					<SocialBtn
						type="kakao"
						onClick={() => {
							open('kakao');
							setSocialType('kakao');
						}}
						isLoading={isOpen}
					/>
					<SocialBtn
						type="google"
						onClick={() => {
							open('google');
							setSocialType('google');
						}}
						isLoading={isOpen}
					/>
					{isFail && <LoginFailText />}
				</div>
			</div>
		</Modal>
	);
}
