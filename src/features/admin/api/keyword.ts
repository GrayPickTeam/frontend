'use server';

import { tokenFetcher } from '@/shared/api/fetcher';

export interface KeywordType {
	id: number;
	text: string;
	priority: number;
	display: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface SearchKeywordResponse {
	totalPages: number;
	totalElements: number;
	size: number;
	content: {
		id: number;
		text: string;
		priority: number;
		display: boolean;
		createdAt: string;
		updatedAt: string;
	}[];
	number: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	numberOfElements: number;
	pageable: {
		offset: number;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		unpaged: boolean;
	};
	first: boolean;
	last: boolean;
	empty: boolean;
}

export interface AddKeywordResponse {
	id: number;
	text: string;
	priority: number;
	display: boolean;
	createdAt: string;
	updatedAt: string;
}

export const getSearchKeywords = async ({
	keywords,
	displayYN,
	page = 0,
	size = 40,
}: {
	keywords?: string;
	displayYN?: 'Y' | 'N';
	page?: number;
	size?: number;
}) => {
	try {
		const params = new URLSearchParams();

		// 기본적으로 page, size는 항상 보냄
		params.append('page', String(page));
		params.append('size', String(size));

		// 값이 있을 때만 추가
		if (keywords) params.append('keywords', keywords);
		if (displayYN) params.append('displayYN', displayYN);

		const response = await tokenFetcher<SearchKeywordResponse>(`/api/search-keywords?${params.toString()}`);

		console.log(response.result.content);
		return response.result;
	} catch (err) {
		throw err;
	}
};

export const addSearchKeyword = async (text: string, display: boolean = true) => {
	const response = await tokenFetcher<AddKeywordResponse>(`/api/search-keywords`, {
		method: 'POST',
		body: JSON.stringify({ text, display }),
	});
	return response.result;
};
