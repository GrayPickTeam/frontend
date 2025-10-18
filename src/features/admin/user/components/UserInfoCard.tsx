'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserDetail } from '../../api/user';
import StatusBadge from '@/shared/components/StatusBadge';
import { SolidBtn } from '@/shared/components/SolidBtn';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import { useBlockUser, useUnblockUser } from '@/features/admin/hooks/useUserQueries';

interface UserInfoCardProps {
	user: UserDetail;
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
	const [showBlockDialog, setShowBlockDialog] = useState(false);
	const [showUnblockDialog, setShowUnblockDialog] = useState(false);

	const blockUserMutation = useBlockUser();
	const unblockUserMutation = useUnblockUser();

	const handleBlock = async () => {
		await blockUserMutation.mutateAsync(user.id);
		setShowBlockDialog(false);
	};

	const handleUnblock = async () => {
		await unblockUserMutation.mutateAsync(user.id);
		setShowUnblockDialog(false);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<>
			<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6">
				<h2 className="typo-heading1 text-label-strong mb-6">기본 정보</h2>

				<div className="flex flex-col md:flex-row gap-6">
					{/* Profile Image */}
					<div className="flex-shrink-0">
						<div className="w-24 h-24 md:w-32 md:h-32 bg-background-normal-alternative rounded-lg flex items-center justify-center">
							{user.profile.profileImage ? (
								<Image
									src={user.profile.profileImage}
									alt={`${user.profile.nickname || '사용자'} 프로필`}
									width={128}
									height={128}
									className="w-full h-full rounded-lg object-cover"
								/>
							) : (
								<span className="text-2xl md:text-3xl text-label-alternative">👤</span>
							)}
						</div>
					</div>

					{/* User Information */}
					<div className="flex-1 space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block typo-body2-medium text-label-alternative mb-1">이메일</label>
								<p className="typo-body1-reading text-label-strong">{user.email}</p>
							</div>

							<div>
								<label className="block typo-body2-medium text-label-alternative mb-1">닉네임</label>
								<p className="typo-body1-reading text-label-strong">{user.profile.nickname || '닉네임 없음'}</p>
							</div>

							<div>
								<label className="block typo-body2-medium text-label-alternative mb-1">역할</label>
								<StatusBadge status={user.role === 'ADMIN' ? 'APPROVED' : 'ACTIVE'} size="sm" />
							</div>

							<div>
								<label className="block typo-body2-medium text-label-alternative mb-1">상태</label>
								<StatusBadge status={user.status} size="sm" />
							</div>

							<div>
								<label className="block typo-body2-medium text-label-alternative mb-1">가입일</label>
								<p className="typo-body1-reading text-label-normal">{formatDate(user.createdAt)}</p>
							</div>

							{user.updatedAt !== user.createdAt && (
								<div>
									<label className="block typo-body2-medium text-label-alternative mb-1">수정일</label>
									<p className="typo-body1-reading text-label-normal">{formatDate(user.updatedAt)}</p>
								</div>
							)}
						</div>

						{/* Action Button */}
						<div className="pt-4">
							{user.status === 'ACTIVE' ? (
								<SolidBtn primary={true} size="medium" label="사용자 차단" onClick={() => setShowBlockDialog(true)} className="bg-status-negative" />
							) : user.status === 'BLOCKED' ? (
								<SolidBtn primary={true} size="medium" label="차단 해제" onClick={() => setShowUnblockDialog(true)} />
							) : null}
						</div>
					</div>
				</div>
			</div>

			<ConfirmDialog
				isOpen={showBlockDialog}
				onClose={() => setShowBlockDialog(false)}
				onConfirm={handleBlock}
				title="사용자 차단"
				message={
					<div>
						<strong>{user.profile.nickname}</strong> ({user.email}) 사용자를 차단하시겠습니까?
						<br />
						차단된 사용자는 서비스를 이용할 수 없습니다.
					</div>
				}
				confirmText="차단"
				variant="danger"
				isLoading={blockUserMutation.isPending}
			/>

			<ConfirmDialog
				isOpen={showUnblockDialog}
				onClose={() => setShowUnblockDialog(false)}
				onConfirm={handleUnblock}
				title="사용자 차단 해제"
				message={
					<div>
						<strong>{user.profile.nickname}</strong> ({user.email}) 사용자의 차단을 해제하시겠습니까?
					</div>
				}
				confirmText="해제"
				isLoading={unblockUserMutation.isPending}
			/>
		</>
	);
}
