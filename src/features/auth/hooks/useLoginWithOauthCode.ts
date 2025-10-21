import { SocialType } from '@/shared/components/SocialBtn';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loginUser } from '../api/oauth';
import { useQueryClient } from '@tanstack/react-query';

// 인가받은 코드로 BE를 통해 로그인을 하는 훅
export const useLoginWithOauthCode = (code: string | null) => {
	const [isFail, setIsFail] = useState(false);
	const [socialType, setSocialType] = useState<SocialType | null>(null);
	const router = useRouter();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!code || !socialType) return;

		const doLogin = async () => {
			try {
				const user = await loginUser(code, socialType);
				if (!user.nickname) {
					router.push('/onboarding');
				} else {
					queryClient.clear();
					router.back();
				}
			} catch (e) {
				alert('에러');
				console.error(e);
				setIsFail(true);
			}
		};

		doLogin();
	}, [code, socialType, router, queryClient]);
	return { isFail, setSocialType };
};
