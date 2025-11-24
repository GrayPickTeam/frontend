'use client';

import { useState } from 'react';
import { useUserReceivedReports, useUserSentReports } from '@/features/admin/hooks/useUserQueries';
import { UserReportReceived, UserReportSent } from '@/features/admin/api/user';
import StatusBadge from '@/shared/components/StatusBadge';
import Pagination from '@/shared/components/Pagination';
import EmptyState from '@/shared/components/EmptyState';

interface UserReportHistoryProps {
	userId: number;
}

type ReportTab = 'received' | 'sent';

const PAGE_SIZE = 10;

// Helper function to get user info based on report type
function getUserInfo(report: UserReportReceived | UserReportSent, isReceived: boolean) {
	if (isReceived) {
		const receivedReport = report as UserReportReceived;
		return {
			id: receivedReport.reporterId,
			email: receivedReport.reporterEmail,
			nickname: receivedReport.reporterNickname,
		};
	} else {
		const sentReport = report as UserReportSent;
		return {
			id: sentReport.commenterId,
			email: sentReport.commenterEmail,
			nickname: sentReport.commenterNickname,
		};
	}
}

export default function UserReportHistory({ userId }: UserReportHistoryProps) {
	const [activeTab, setActiveTab] = useState<ReportTab>('received');
	const [currentPage, setCurrentPage] = useState(0);

	const receivedReportsQuery = useUserReceivedReports({
		userId,
		page: currentPage,
		size: PAGE_SIZE,
	});

	const sentReportsQuery = useUserSentReports({
		userId,
		page: currentPage,
		size: PAGE_SIZE,
	});

	const activeQuery = activeTab === 'received' ? receivedReportsQuery : sentReportsQuery;
	const { data, isLoading, error } = activeQuery;

	// Reset page when switching tabs
	const handleTabChange = (tab: ReportTab) => {
		setActiveTab(tab);
		setCurrentPage(0);
	};

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

			{/* Tab Navigation */}
			<div className="flex border-b border-line-normal-normal mb-6">
				<button
					onClick={() => handleTabChange('received')}
					className={`px-4 py-2 typo-body2-medium border-b-2 transition-colors ${
						activeTab === 'received'
							? 'border-primary-normal text-primary-normal'
							: 'border-transparent text-label-alternative hover:text-label-normal'
					}`}
				>
					신고당한 내역
				</button>
				<button
					onClick={() => handleTabChange('sent')}
					className={`px-4 py-2 typo-body2-medium border-b-2 transition-colors ${
						activeTab === 'sent' ? 'border-primary-normal text-primary-normal' : 'border-transparent text-label-alternative hover:text-label-normal'
					}`}
				>
					신고한 내역
				</button>
			</div>

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
				<EmptyState
					title="신고 이력이 없습니다"
					description={activeTab === 'received' ? '이 사용자에 대한 신고가 없습니다.' : '이 사용자가 신고한 내역이 없습니다.'}
					className="py-8"
				/>
			) : (
				<>
					{/* Desktop Table View */}
					<div className="hidden md:block overflow-x-auto">
						<table className="w-full">
							<thead className="bg-background-normal-alternative">
								<tr>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">신고일</th>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">신고 사유</th>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">{activeTab === 'received' ? '신고자' : '댓글 작성자'}</th>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">관련 법안</th>
									<th className="px-4 py-3 text-left typo-body2-medium text-label-strong">상태</th>
								</tr>
							</thead>
							<tbody>
								{reports.map((report) => {
									const isReceived = activeTab === 'received';
									const userInfo = getUserInfo(report, isReceived);

									return (
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
													<p className="typo-body2-reading text-label-strong">{userInfo.nickname || userInfo.email}</p>
													<p className="typo-caption text-label-alternative">ID: {userInfo.id}</p>
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
									);
								})}
							</tbody>
						</table>
					</div>

					{/* Mobile Card View */}
					<div className="md:hidden space-y-4">
						{reports.map((report) => {
							const isReceived = activeTab === 'received';
							const userInfo = getUserInfo(report, isReceived);

							return (
								<div key={report.reportId} className="bg-background-normal-alternative rounded-lg p-4">
									<div className="flex justify-between items-start mb-2">
										<span className="typo-caption text-label-alternative">{report.reportedAt}</span>
										<StatusBadge status={report.reportStatus} size="sm" />
									</div>

									<div className="space-y-2">
										<p className="typo-body2-medium text-label-strong">{report.reportReason}</p>
										<p className="typo-body2-reading text-label-normal line-clamp-2">{report.commentContent}</p>
										<div className="bg-background-normal-normal rounded p-2">
											<p className="typo-caption text-label-alternative mb-1">{isReceived ? '신고자' : '댓글 작성자'}</p>
											<p className="typo-body2-reading text-label-strong">{userInfo.nickname || userInfo.email}</p>
											<p className="typo-caption text-label-alternative">ID: {userInfo.id}</p>
										</div>
										<div>
											<p className="typo-body2-reading text-label-strong">{report.billTitle}</p>
											<p className="typo-caption text-label-alternative">발의일: {report.billProposeDate}</p>
										</div>
									</div>
								</div>
							);
						})}
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
