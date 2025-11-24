'use client';

import { cn } from '@/shared/util';
import { SolidBtn } from './SolidBtn';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	maxVisiblePages?: number;
	className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, maxVisiblePages = 5, className }: PaginationProps) {
	if (totalPages <= 1) return null;

	const startPage = Math.max(0, Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages));
	const endPage = Math.min(startPage + maxVisiblePages, totalPages);

	const pages = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

	return (
		<div className={cn('flex items-center justify-center gap-2', className)}>
			<SolidBtn primary={false} size="small" label="이전" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0} />

			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={cn(
						'px-3 py-2 rounded-md text-sm font-medium transition-colors',
						page === currentPage ? 'bg-primary-main-normal text-white' : 'text-label-normal hover:bg-background-normal-alternative',
					)}
				>
					{page + 1}
				</button>
			))}

			<SolidBtn primary={false} size="small" label="다음" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
		</div>
	);
}
