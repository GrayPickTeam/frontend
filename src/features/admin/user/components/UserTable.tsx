'use client';

import { User } from '../../api/user';
import UserTableRow from './UserTableRow';
import EmptyState from '@/shared/components/EmptyState';

interface UserTableProps {
	users: User[];
	isLoading?: boolean;
}

export default function UserTable({ users, isLoading }: UserTableProps) {
	if (isLoading) {
		return (
			<div className="bg-background-normal-normal rounded-lg border border-line-normal-normal overflow-hidden">
				<div className="animate-pulse">
					<div className="h-12 bg-background-normal-alternative"></div>
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="h-16 border-t border-line-normal-normal bg-background-normal-normal"></div>
					))}
				</div>
			</div>
		);
	}

	if (users.length === 0) {
		return (
			<div className="bg-background-normal-normal rounded-lg border border-line-normal-normal">
				<EmptyState title="사용자가 없습니다" description="검색 조건을 변경하여 다시 시도해주세요." className="py-16" />
			</div>
		);
	}

	return (
		<div className="bg-background-normal-normal rounded-lg border border-line-normal-normal overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full min-w-[1200px]">
					<thead className="bg-background-normal-alternative">
						<tr>
							<th className="px-3 py-3 text-left typo-body2-medium text-label-strong w-16">ID</th>
							<th className="px-3 py-3 text-left typo-body2-medium text-label-strong w-64">이메일</th>
							<th className="px-3 py-3 text-left typo-body2-medium text-label-strong w-32">닉네임</th>
							<th className="px-3 py-3 text-left typo-body2-medium text-label-strong w-20">역할</th>
							<th className="px-3 py-3 text-left typo-body2-medium text-label-strong w-20">상태</th>
							<th className="px-3 py-3 text-left typo-body2-medium text-label-strong w-32">가입일</th>
							<th className="px-3 py-3 text-left typo-body2-medium text-label-strong w-48">작업</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<UserTableRow key={user.id} user={user} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
