'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUserDetail } from '@/features/admin/hooks/useUserQueries';
import UserInfoCard from '@/features/admin/user/components/UserInfoCard';
import UserKeywordsCard from '@/features/admin/user/components/UserKeywordsCard';
import UserOAuthCard from '@/features/admin/user/components/UserOAuthCard';
import UserReportHistory from '@/features/admin/user/components/UserReportHistory';
import { SolidBtn } from '@/shared/components/SolidBtn';
import Back from '@/shared/icon/Back';

function UserDetailContent({ userId }: { userId: number }) {
	const router = useRouter();
	const { data: user, isLoading, error } = useUserDetail(userId);

	const handleBackToList = () => {
		router.push('/admin/user');
	};

	if (isLoading) {
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

				{/* Loading Skeletons */}
				<div className="space-y-6">
					<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6 animate-pulse">
						<div className="h-6 w-24 bg-background-normal-alternative rounded mb-6"></div>
						<div className="flex gap-6">
							<div className="w-24 h-24 md:w-32 md:h-32 bg-background-normal-alternative rounded-lg"></div>
							<div className="flex-1 space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{Array.from({ length: 6 }).map((_, i) => (
										<div key={i} className="space-y-2">
											<div className="h-4 w-16 bg-background-normal-alternative rounded"></div>
											<div className="h-5 w-32 bg-background-normal-alternative rounded"></div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6 animate-pulse">
						<div className="h-6 w-24 bg-background-normal-alternative rounded mb-4"></div>
						<div className="flex gap-2">
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="h-8 w-16 bg-background-normal-alternative rounded-full"></div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="space-y-6">
				<button onClick={handleBackToList} className="flex items-center gap-2 px-4 py-2 text-label-normal hover:text-label-strong">
					<Back className="w-4 h-4" />
					사용자 목록으로
				</button>

				<div className="text-center py-16">
					<h1 className="typo-heading1 text-label-strong mb-4">사용자를 찾을 수 없습니다</h1>
					<p className="typo-body1-reading text-label-normal mb-6">요청하신 사용자 정보를 불러올 수 없습니다.</p>
					<SolidBtn primary={true} size="medium" label="사용자 목록으로 돌아가기" onClick={handleBackToList} />
				</div>
			</div>
		);
	}

	if (!user) {
		return null;
	}

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

export default function UserDetailPage() {
	const params = useParams();
	const userId = parseInt(params.userId as string);

	if (isNaN(userId)) {
		return (
			<main className="px-4 md:px-8 py-6">
				<div className="text-center py-16">
					<h1 className="typo-heading1 text-label-strong mb-4">잘못된 사용자 ID</h1>
					<p className="typo-body1-reading text-label-normal">올바른 사용자 ID를 입력해주세요.</p>
				</div>
			</main>
		);
	}

	return (
		<main className="px-4 md:px-8 py-6">
			<Suspense
				fallback={
					<div className="space-y-6">
						<div className="w-32 h-10 bg-background-normal-alternative rounded-lg animate-pulse"></div>
						<div className="h-8 w-48 bg-background-normal-alternative rounded animate-pulse"></div>
						<div className="space-y-6">
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6 animate-pulse">
									<div className="h-6 w-24 bg-background-normal-alternative rounded mb-4"></div>
									<div className="h-32 bg-background-normal-alternative rounded"></div>
								</div>
							))}
						</div>
					</div>
				}
			>
				<UserDetailContent userId={userId} />
			</Suspense>
		</main>
	);
}
