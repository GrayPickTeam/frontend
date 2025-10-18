import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserList, getUserDetail, blockUser, unblockUser, getUserReceivedReports, getUserSentReports } from '../api/user';

// Query Keys
export const userQueryKeys = {
	all: ['admin', 'users'] as const,
	lists: () => [...userQueryKeys.all, 'list'] as const,
	list: (filters: { page?: number; size?: number; keyword?: string }) => [...userQueryKeys.lists(), filters] as const,
	details: () => [...userQueryKeys.all, 'detail'] as const,
	detail: (id: number) => [...userQueryKeys.details(), id] as const,
	reports: (userId: number) => [...userQueryKeys.all, 'reports', userId] as const,
	report: (userId: number, page: number) => [...userQueryKeys.reports(userId), { page }] as const,
	receivedReports: (userId: number) => [...userQueryKeys.all, 'reports', 'received', userId] as const,
	receivedReport: (userId: number, page: number) => [...userQueryKeys.receivedReports(userId), { page }] as const,
	sentReports: (userId: number) => [...userQueryKeys.all, 'reports', 'sent', userId] as const,
	sentReport: (userId: number, page: number) => [...userQueryKeys.sentReports(userId), { page }] as const,
};

// Hooks

/**
 * Hook for fetching user list
 */
export function useUserList({
	page = 0,
	size = 20,
	keyword,
}: {
	page?: number;
	size?: number;
	keyword?: string;
} = {}) {
	return useQuery({
		queryKey: userQueryKeys.list({ page, size, keyword }),
		queryFn: () => getUserList({ page, size, keyword }),
	});
}

/**
 * Hook for fetching user details
 */
export function useUserDetail(userId: number) {
	return useQuery({
		queryKey: userQueryKeys.detail(userId),
		queryFn: () => getUserDetail(userId),
		enabled: !!userId,
	});
}

/**
 * Hook for blocking a user
 */
export function useBlockUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: blockUser,
		onSuccess: (_, userId) => {
			alert('사용자가 차단되었습니다.');
			// Invalidate user list and detail queries
			queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
			queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(userId) });
		},
		onError: (error: Error) => {
			alert(error.message || '사용자 차단에 실패했습니다.');
		},
	});
}

/**
 * Hook for unblocking a user
 */
export function useUnblockUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: unblockUser,
		onSuccess: (_, userId) => {
			alert('사용자 차단이 해제되었습니다.');
			// Invalidate user list and detail queries
			queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
			queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(userId) });
		},
		onError: (error: Error) => {
			alert(error.message || '사용자 차단 해제에 실패했습니다.');
		},
	});
}

/**
 * Hook for fetching user received reports (reports against the user)
 */
export function useUserReceivedReports({ userId, page = 0, size = 20 }: { userId: number; page?: number; size?: number }) {
	return useQuery({
		queryKey: userQueryKeys.receivedReport(userId, page),
		queryFn: () => getUserReceivedReports({ userId, page, size }),
		enabled: !!userId,
	});
}

/**
 * Hook for fetching user sent reports (reports made by the user)
 */
export function useUserSentReports({ userId, page = 0, size = 20 }: { userId: number; page?: number; size?: number }) {
	return useQuery({
		queryKey: userQueryKeys.sentReport(userId, page),
		queryFn: () => getUserSentReports({ userId, page, size }),
		enabled: !!userId,
	});
}

/**
 * @deprecated Use useUserReceivedReports instead
 * Hook for fetching user report history (backward compatibility)
 */
export function useUserReports({ userId, page = 0, size = 20 }: { userId: number; page?: number; size?: number }) {
	return useUserReceivedReports({ userId, page, size });
}
