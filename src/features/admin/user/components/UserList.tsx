'use client';

import { useState, useCallback } from 'react';
import { useUserList } from '@/features/admin/hooks/useUserQueries';
import UserSearchBar from './UserSearchBar';
import UserTable from './UserTable';
import UserCard from './UserCard';
import Pagination from '@/shared/components/Pagination';
import { useSearchParams } from 'next/navigation';

const PAGE_SIZE = 20;

export default function UserList() {
	const searchParams = useSearchParams();

	const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '0'));
	const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

	const { data, isLoading, error } = useUserList({
		page: currentPage,
		size: PAGE_SIZE,
		keyword: keyword || undefined,
	});

	const handleSearch = useCallback((newKeyword: string) => {
		setKeyword(newKeyword);
		setCurrentPage(0);
		// URL 업데이트는 간단하게 처리
		const url = new URL(window.location.href);
		if (newKeyword) {
			url.searchParams.set('keyword', newKeyword);
			url.searchParams.delete('page');
		} else {
			url.searchParams.delete('keyword');
			url.searchParams.delete('page');
		}
		window.history.replaceState({}, '', url.toString());
	}, []);

	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page);
		const url = new URL(window.location.href);
		if (page > 0) {
			url.searchParams.set('page', page.toString());
		} else {
			url.searchParams.delete('page');
		}
		window.history.replaceState({}, '', url.toString());
	}, []);

	if (error) {
		return (
			<div className="text-center py-8">
				<p className="typo-body1-reading text-status-negative">사용자 목록을 불러오는데 실패했습니다.</p>
			</div>
		);
	}

	const users = data?.content || [];
	const totalPages = data?.totalPages || 0;
	const totalElements = data?.totalElements || 0;

	return (
		<div className="space-y-6">
			{/* Search Bar */}
			<UserSearchBar onSearch={handleSearch} />

			{/* Total Count */}
			<div className="flex justify-between items-center">
				<p className="typo-body1-reading text-label-normal">총 {totalElements.toLocaleString()}명의 사용자</p>
			</div>

			{/* Desktop Table View */}
			<div className="hidden md:block">
				<UserTable users={users} isLoading={isLoading} />
			</div>

			{/* Mobile Card View */}
			<div className="md:hidden space-y-4">
				{isLoading ? (
					Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 animate-pulse">
							<div className="space-y-3">
								<div className="flex gap-2">
									<div className="h-4 bg-background-normal-alternative rounded w-12"></div>
									<div className="h-4 bg-background-normal-alternative rounded w-16"></div>
								</div>
								<div className="h-5 bg-background-normal-alternative rounded w-32"></div>
								<div className="h-4 bg-background-normal-alternative rounded w-48"></div>
								<div className="h-4 bg-background-normal-alternative rounded w-24"></div>
							</div>
						</div>
					))
				) : users.length === 0 ? (
					<div className="bg-background-normal-normal rounded-lg border border-line-normal-normal">
						<div className="text-center py-16">
							<p className="typo-heading2 text-label-strong mb-2">사용자가 없습니다</p>
							<p className="typo-body1-reading text-label-normal">검색 조건을 변경하여 다시 시도해주세요.</p>
						</div>
					</div>
				) : (
					users.map((user) => <UserCard key={user.id} user={user} />)
				)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
		</div>
	);
}
