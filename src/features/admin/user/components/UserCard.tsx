'use client';

import { useState } from 'react';
import { User } from '../../api/user';
import StatusBadge from '@/shared/components/StatusBadge';
import { SolidBtn } from '@/shared/components/SolidBtn';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import { useBlockUser, useUnblockUser } from '@/features/admin/hooks/useUserQueries';
import { useRouter } from 'next/navigation';

interface UserCardProps {
	user: User;
}

export default function UserCard({ user }: UserCardProps) {
	const router = useRouter();
	const [showBlockDialog, setShowBlockDialog] = useState(false);
	const [showUnblockDialog, setShowUnblockDialog] = useState(false);

	const blockUserMutation = useBlockUser();
	const unblockUserMutation = useUnblockUser();

	const handleViewDetails = () => {
		router.push(`/admin/user/${user.id}`);
	};

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
		});
	};

	return (
		<>
			<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4">
				<div className="flex justify-between items-start mb-3">
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<span className="typo-body2-medium text-label-alternative">#{user.id}</span>
							<StatusBadge status={user.role === 'ADMIN' ? 'APPROVED' : 'ACTIVE'} size="sm" />
							<StatusBadge status={user.status} size="sm" />
						</div>
						<h3 className="typo-body1-medium text-label-strong mb-1">{user.nickname || '닉네임 없음'}</h3>
						<p className="typo-body2-reading text-label-normal mb-2">{user.email}</p>
						<p className="typo-caption text-label-alternative">가입일: {formatDate(user.createdAt)}</p>
					</div>
				</div>

				<div className="flex gap-2">
					<SolidBtn size="small" primary={false} label="상세보기" onClick={handleViewDetails} className="flex-1" />
					{user.status === 'ACTIVE' ? (
						<SolidBtn size="small" primary={true} label="차단" onClick={() => setShowBlockDialog(true)} className="!bg-status-destructive" />
					) : user.status === 'BLOCKED' ? (
						<SolidBtn size="small" primary={true} label="해제" onClick={() => setShowUnblockDialog(true)} />
					) : null}
				</div>
			</div>

			<ConfirmDialog
				isOpen={showBlockDialog}
				onClose={() => setShowBlockDialog(false)}
				onConfirm={handleBlock}
				title="사용자 차단"
				message={
					<div>
						<strong>{user.nickname}</strong> ({user.email}) 사용자를 차단하시겠습니까?
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
						<strong>{user.nickname}</strong> ({user.email}) 사용자의 차단을 해제하시겠습니까?
					</div>
				}
				confirmText="해제"
				isLoading={unblockUserMutation.isPending}
			/>
		</>
	);
}
