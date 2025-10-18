'use client';

import { useState } from 'react';
import { useUserReports } from '@/features/admin/hooks/useUserQueries';
import StatusBadge from '@/shared/components/StatusBadge';
import Pagination from '@/shared/components/Pagination';
import EmptyState from '@/shared/components/EmptyState';

interface UserReportHistoryProps {
	userId: number;
}

const PAGE_SIZE = 10;

export default function UserReportHistory({ userId }: UserReportHistoryProps) {
	const [currentPage, setCurrentPage] = useState(0);

	const { data, isLoading, error } = useUserReports({
		userId,
		page: currentPage,
		size: PAGE_SIZE,
	});

	if (error) {
		return (
			<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6">
				<h2 className="typo-heading1 text-label-strong mb-4">신고 이력</h2>
				<p className="typo-body1-reading text-status-negative">신고 이력을 불러오는데 실패했습니다.</p>
			</div>
		);
	}

	const reports = data?.content || [];
	const isLast = data?.isLast || true;

	return (
		<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6">
			<h2 className="typo-heading1 text-label-strong mb-4">신고 이력</h2>

			{isLoading ? (
				<div className="space-y-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="animate-pulse">
							<div className="h-4 bg-background-normal-alternative rounded w-3/4 mb-2"></div>
							<div className="h-3 bg-background-normal-alternative rounded w-1/2"></div>
						</div>
					))}
				</div>
			) : reports.length === 0 ? (
				<EmptyState title="신고 이력이 없습니다" description="이 사용자에 대한 신고가 없습니다." className="py-8" />
			) : (
				<>
					{/* Desktop Table View */}
					<div className="hidden md:block overflow-x-auto">
						<table className="w-full">
							<thead className="bg-background-normal-alternative">
								<tr>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">신고일</th>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">신고 사유</th>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">관련 법안</th>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">상태</th>
								</tr>
							</thead>
							<tbody>
								{reports.map((report) => (
									<tr key={report.reportId} className="border-b border-line-normal-normal">
										<td className="px-4 py-4 typo-body2-reading text-label-normal">{report.reportedAt}</td>
										<td className="px-4 py-4">
											<div>
												<p className="typo-body2-reading text-label-strong mb-1">{report.reportReason}</p>
												<p className="typo-caption text-label-alternative line-clamp-2">{report.commentContent}</p>
											</div>
										</td>
										<td className="px-4 py-4">
											<div>
												<p className="typo-body2-reading text-label-strong">{report.billTitle}</p>
												<p className="typo-caption text-label-alternative">발의일: {report.billProposeDate}</p>
											</div>
										</td>
										<td className="px-4 py-4">
											<StatusBadge status={report.reportStatus} size="sm" />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Mobile Card View */}
					<div className="md:hidden space-y-4">
						{reports.map((report) => (
							<div key={report.reportId} className="bg-background-normal-alternative rounded-lg p-4">
								<div className="flex justify-between items-start mb-2">
									<span className="typo-caption text-label-alternative">{report.reportedAt}</span>
									<StatusBadge status={report.reportStatus} size="sm" />
								</div>

								<div className="space-y-2">
									<p className="typo-body2-medium text-label-strong">{report.reportReason}</p>
									<p className="typo-body2-reading text-label-normal line-clamp-2">{report.commentContent}</p>
									<div>
										<p className="typo-body2-reading text-label-strong">{report.billTitle}</p>
										<p className="typo-caption text-label-alternative">발의일: {report.billProposeDate}</p>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					{!isLast && (
						<div className="mt-6">
							<Pagination currentPage={currentPage} totalPages={currentPage + 2} onPageChange={setCurrentPage} />
						</div>
					)}
				</>
			)}
		</div>
	);
}
