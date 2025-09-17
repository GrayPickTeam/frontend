import { tokenFetcher } from '@/shared/api/fetcher';

export interface SearchKeywordResponse {
	isSuccess: boolean;
	responseCode: number;
	responseMessage: string;
	result: {
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
	};
}

export const getSearchKeywords = async (keywords: string = '', displayYN: 'Y' | 'N' = 'Y'): Promise<SearchKeywordResponse> => {
	try {
		const query = new URLSearchParams({
			keywords,
			displayYN,
		}).toString();

		const response = await tokenFetcher<SearchKeywordResponse>(`/api/search-keywords?${query}`);
		const data = response.result;
		return data;
	} catch (err) {
		throw err;
	}
};
