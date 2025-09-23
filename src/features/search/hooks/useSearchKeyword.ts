import { useEffect, useState } from 'react';
import { getDisplaySearchKeywords, SearchKeyword } from '../api/server';

const useSearchKeyword = () => {
	const [keywords, setKeywords] = useState<SearchKeyword[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchKeywords = async () => {
			try {
				const { result } = await getDisplaySearchKeywords();
				setKeywords(result || []);
			} catch (error) {
				console.error('Failed to fetch keywords:', error);
				setKeywords([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchKeywords();
	}, []);

	return { keywords, isLoading };
};

export default useSearchKeyword;
