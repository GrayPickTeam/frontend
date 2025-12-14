'use client';

import { Suspense } from 'react';
import UserList from '@/features/admin/user/components/UserList';

function UserListContent() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="typo-display1 text-label-strong">사용자 관리</h1>
			</div>

			<UserList />
		</div>
	);
}

export default function UserListPage() {
	return (
		<main className="px-4 md:px-8 py-6">
			<Suspense
				fallback={
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h1 className="typo-display1 text-label-strong">사용자 관리</h1>
						</div>

						<div className="space-y-6">
							{/* Search Bar Skeleton */}
							<div className="flex gap-3">
								<div className="flex-1 h-12 bg-background-normal-alternative rounded-lg animate-pulse"></div>
								<div className="w-20 h-12 bg-background-normal-alternative rounded-lg animate-pulse"></div>
							</div>

							{/* Total Count Skeleton */}
							<div className="h-6 w-32 bg-background-normal-alternative rounded animate-pulse"></div>

							{/* Table Skeleton */}
							<div className="bg-background-normal-normal rounded-lg border border-line-normal-normal overflow-hidden">
								<div className="animate-pulse">
									<div className="h-12 bg-background-normal-alternative"></div>
									{Array.from({ length: 5 }).map((_, i) => (
										<div key={i} className="h-16 border-t border-line-normal-normal bg-background-normal-normal"></div>
									))}
								</div>
							</div>
						</div>
					</div>
				}
			>
				<UserListContent />
			</Suspense>
		</main>
	);
}
