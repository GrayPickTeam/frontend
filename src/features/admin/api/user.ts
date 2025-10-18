import { tokenFetcher } from '@/shared/api/fetcher';

// Types
export interface User {
	id: number;
	username: string;
	email: string;
	nickname: string | null;
	role: 'USER' | 'ADMIN';
	status: 'ACTIVE' | 'BLOCKED' | 'INACTIVE';
	createdAt: string;
}

export interface UserProfile {
	profileImage: string | null;
	nickname: string | null;
	keyword1: string | null;
	keyword2: string | null;
	keyword3: string | null;
	keyword4: string | null;
	keyword5: string | null;
	status: 'ACTIVE' | 'INACTIVE';
}

export interface UserCredential {
	provider: 'KAKAO' | 'GOOGLE';
	providerUserId: string;
	status: 'ACTIVE' | 'INACTIVE';
}

export interface UserDetail {
	id: number;
	username: string;
	email: string;
	role: 'USER' | 'ADMIN';
	status: 'ACTIVE' | 'BLOCKED' | 'INACTIVE';
	profile: UserProfile;
	credentials: UserCredential[];
	createdAt: string;
	updatedAt: string;
}

export interface UserReport {
	reportId: number;
	reportReason: string;
	reportStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
	reportedAt: string;
	commentId: number;
	commentContent: string;
	commenterId: number;
	commenterEmail: string;
	commenterNickname: string;
	billId: number;
	billTitle: string;
	billProposeDate: string;
}

export interface PageableResponse<T> {
	content: T[];
	pageable: {
		pageNumber: number;
		pageSize: number;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
		offset: number;
		paged: boolean;
		unpaged: boolean;
	};
	totalElements: number;
	totalPages: number;
	last: boolean;
	first: boolean;
	size: number;
	number: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	numberOfElements: number;
	empty: boolean;
}

export interface SliceResponse<T> {
	content: T[];
	pageNumber: number;
	isLast: boolean;
}

// API Functions

/**
 * Get paginated list of users with optional search
 */
export async function getUserList({ page = 0, size = 20, keyword }: { page?: number; size?: number; keyword?: string }) {
	const params = new URLSearchParams({
		page: page.toString(),
		size: size.toString(),
	});

	if (keyword) {
		params.append('keyword', keyword);
	}

	const data = await tokenFetcher<PageableResponse<User>>(`/api/admin/users?${params}`);

	if (!data.isSuccess) {
		throw new Error(data.responseMessage);
	}

	return data.result;
}

/**
 * Get user details by ID
 */
export async function getUserDetail(userId: number) {
	const data = await tokenFetcher<UserDetail>(`/api/admin/users/${userId}`);

	if (!data.isSuccess) {
		throw new Error(data.responseMessage);
	}

	return data.result;
}

/**
 * Block a user
 */
export async function blockUser(userId: number) {
	const data = await tokenFetcher<null>(`/api/admin/users/${userId}/block`, {
		method: 'PUT',
	});

	if (!data.isSuccess) {
		throw new Error(data.responseMessage);
	}

	return data;
}

/**
 * Unblock a user
 */
export async function unblockUser(userId: number) {
	const data = await tokenFetcher<null>(`/api/admin/users/${userId}/unblock`, {
		method: 'PUT',
	});

	if (!data.isSuccess) {
		throw new Error(data.responseMessage);
	}

	return data;
}

/**
 * Get user report history
 */
export async function getUserReports({ userId, page = 0, size = 20 }: { userId: number; page?: number; size?: number }) {
	const params = new URLSearchParams({
		page: page.toString(),
		size: size.toString(),
	});

	const data = await tokenFetcher<SliceResponse<UserReport>>(`/api/admin/users/${userId}/reports?${params}`);

	if (!data.isSuccess) {
		throw new Error(data.responseMessage);
	}

	return data.result;
}
