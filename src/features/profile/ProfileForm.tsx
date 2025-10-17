'use client';

import { SolidBtn } from '@/shared/components/SolidBtn';

import { useState } from 'react';
import { Keyword } from '@/shared/const/committee';
import { useRouter } from 'next/navigation';
import { editProfile } from './api/server';
import Nickname from '../onboarding/Nickname';
import Keywords from '../onboarding/Keywords';
import Link from 'next/link';
import { CLIENT_NAVI_PATH } from '@/shared/const/url';
import { areArraysEqualUnordered } from '@/shared/util';

interface ProfileFormProps {
	initialNick: string;
	initailKeywords: Keyword[];
}

const ProfileForm = ({ initialNick, initailKeywords }: ProfileFormProps) => {
	const [keywords, setKeywords] = useState<Keyword[]>([...initailKeywords]);
	const [isValidateNick, setIsValidateNick] = useState<boolean>(false);
	const canSumbit = keywords.length > 0 && isValidateNick;
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const nickname = formData.get('nickname') as string;
		const nothingChanged = initialNick === nickname && areArraysEqualUnordered(keywords, initailKeywords);

		if (nothingChanged) {
			router.push('/mypage');
		}

		const result = await editProfile(nickname, keywords);
		switch (result.status) {
			case 'relogin':
				alert('재로그인 후 시도해주세요!');
				router.push('/');
				break;
			case 'retry':
				alert('다시 시도해 주세요!');
				break;
			case 'success':
				router.push('/mypage');
				break;
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6 desktop:gap-12 w-full mx-auto">
			<Nickname isValidate={isValidateNick} setIsValidate={setIsValidateNick} initialNick={initialNick} />
			<Keywords keywords={keywords} setKeywords={setKeywords} />
			<div className="flex w-full justify-between items-center">
				<Link
					href={CLIENT_NAVI_PATH.withDrawal.path}
					className="flex items-center justify-center w-17 h-8 text-[#FF5141] typo-body1-normal font-bold text-center"
				>
					회원탈퇴
				</Link>
				<div className="flex items-center gap-2">
					<Link
						href={CLIENT_NAVI_PATH.mypage.path}
						className="flex items-center justify-center w-17 h-8 text-label-alternative typo-body1-normal font-bold text-center"
					>
						취소
					</Link>
					<SolidBtn type="submit" disabled={!canSumbit} label="수정" size="small" className="w-17 typo-body2-normal" />
				</div>
			</div>
		</form>
	);
};

export default ProfileForm;
