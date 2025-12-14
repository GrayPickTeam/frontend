'use client';

import { useState, useCallback } from 'react';
import { useUserList } from '@/features/admin/hooks/useUserQueries';
import UserSearchBar from './UserSearchBar';
import UserTable from './UserTable';
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

			{/* Table View */}
			<UserTable users={users} isLoading={isLoading} />

			{/* Pagination */}
			{totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
		</div>
	);
}
