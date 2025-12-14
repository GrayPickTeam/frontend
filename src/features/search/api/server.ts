'use server';

import { tokenFetcher } from '@/shared/api/fetcher';
import { IssueCardProps } from '@/shared/components/IssueCard';

export interface SearchResponse {
	totalCount: number;
	bills: {
		pageNumber: number;
		last: boolean;
		content: IssueCardProps[];
	};
}

export interface SearchKeyword {
	id: number;
	text: string;
	priority: number;
	display: boolean;
	createdAt: string;
	updatedAt: string;
}

export const getSearchData = async ({ keyword, page = 0, size = 24 }: { keyword: string; page: number; size?: number }) => {
	const response = await tokenFetcher<SearchResponse>(`/api/bills/search?keyword=${keyword}&page=${page}&size=${size}`);
	return { result: response.result };
};

export const getDisplaySearchKeywords = async () => {
	const response = await tokenFetcher<SearchKeyword[]>('/api/search-keywords/display');
	return { result: response.result };
};
