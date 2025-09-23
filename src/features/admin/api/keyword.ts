'use server';

import { SearchKeyword } from '@/features/search/api/server';
import { tokenFetcher } from '@/shared/api/fetcher';

export interface SearchKeywordResponse {
	totalPages: number;
	totalElements: number;
	size: number;
	content: SearchKeyword[];
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

		return response.result;
	} catch (err) {
		throw err;
	}
};

export const addSearchKeyword = async (text: string, display: boolean = true) => {
	const response = await tokenFetcher<SearchKeyword>(`/api/search-keywords`, {
		method: 'POST',
		body: JSON.stringify({ text, display }),
	});
	return response.result;
};

export const deleteSearchKeyword = async (keyword: SearchKeyword) => {
	try {
		const body = {
			text: keyword.text,
			priority: keyword.priority,
			displayYn: keyword.display,
			delYn: true, // 삭제 표시
		};

		const response = await tokenFetcher<SearchKeyword>(`/api/search-keywords/${keyword.id}`, {
			method: 'PUT',
			body: JSON.stringify(body),
		});

		return response;
	} catch (err) {
		throw err;
	}
};

export const updateSearchKeyword = async (kw: SearchKeyword) => {
	const response = await tokenFetcher<SearchKeyword>(`/api/search-keywords/${kw.id}`, {
		method: 'PUT',
		body: JSON.stringify({
			text: kw.text,
			priority: kw.priority,
			displayYn: kw.display,
			delYn: false, // 수정일 때는 항상 false
		}),
	});
	return response.result;
};
