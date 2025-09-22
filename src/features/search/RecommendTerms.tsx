'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getDisplaySearchKeywords, SearchKeyword } from './api/server';

const RecommendTerms = () => {
	const [keywords, setKeywords] = useState<SearchKeyword[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchKeywords = async () => {
			try {
				const { result } = await getDisplaySearchKeywords();
				setKeywords(result || []);
			} catch (error) {
				console.error('Failed to fetch keywords:', error);
				setKeywords([]);
			} finally {
				setLoading(false);
			}
		};

		fetchKeywords();
	}, []);

	if (loading) {
		return (
			<section className="flex flex-col w-full px-5 gap-5 items-baseline desktop:items-center">
				<h2 className="typo-headline1 font-bold">추천 검색어</h2>
				<div className="flex flex-wrap gap-2 max-w-[660px] desktop:justify-center">
					<div>로딩 중...</div>
				</div>
			</section>
		);
	}

	return (
		<section className="flex flex-col w-full px-5 gap-5 items-baseline desktop:items-center">
			<h2 className="typo-headline1 font-bold">추천 검색어</h2>
			<div className="flex flex-wrap gap-2 max-w-[660px] desktop:justify-center">
				{keywords.map((keyword) => (
					<Link
						key={keyword.id}
						href={`/search?search=${keyword.text}`}
						className="flex justify-center items-center border rounded-[10px] typo-body2-normal px-5 py-[9px] text-label-normal"
					>
						{keyword.text}
					</Link>
				))}
			</div>
		</section>
	);
};

export default RecommendTerms;
