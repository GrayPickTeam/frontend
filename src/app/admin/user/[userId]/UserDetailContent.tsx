'use client';

import { useRouter } from 'next/navigation';
import { UserDetail } from '@/features/admin/api/user';
import UserInfoCard from '@/features/admin/user/components/UserInfoCard';
import UserKeywordsCard from '@/features/admin/user/components/UserKeywordsCard';
import UserOAuthCard from '@/features/admin/user/components/UserOAuthCard';
import UserReportHistory from '@/features/admin/user/components/UserReportHistory';
import Back from '@/shared/icon/Back';

interface UserDetailContentProps {
	user: UserDetail;
}

export default function UserDetailContent({ user }: UserDetailContentProps) {
	const router = useRouter();

	const handleBackToList = () => {
		router.push('/admin/user');
	};

	return (
		<div className="space-y-6">
			{/* Back Button */}
			<button onClick={handleBackToList} className="flex items-center gap-2 px-4 py-2 text-label-normal hover:text-label-strong">
				<Back className="w-4 h-4" />
				사용자 목록으로
			</button>

			{/* Title */}
			<div className="flex items-center justify-between">
				<h1 className="typo-display1 text-label-strong">사용자 상세정보</h1>
			</div>

			{/* User Information Cards */}
			<div className="space-y-6">
				<UserInfoCard user={user} />
				<UserKeywordsCard profile={user.profile} />
				<UserOAuthCard credentials={user.credentials} />
				<UserReportHistory userId={user.id} />
			</div>
		</div>
	);
}
