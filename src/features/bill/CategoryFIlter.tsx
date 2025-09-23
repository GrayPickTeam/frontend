'use client';

import Dropdown from '@/shared/components/DropDown';
import { SolidBtn } from '@/shared/components/SolidBtn';
import { Keyword, KEYWORD_LIST } from '@/shared/const/committee';
import useUpdateQueryParam from '@/shared/hooks/useUpdateQueryParam';
import React, { useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import KeywordBtn from '@/shared/components/KeywordBtn';
import Image from 'next/image';

const CategoryFilter = () => {
	const updateQueryParam = useUpdateQueryParam();
	const searchParams = useSearchParams();
	const keywordParam = searchParams.get('keywords');

	const [selected, setSelected] = useState<Keyword[]>([]);
	const [label, setLabel] = useState<string>('전체');

	// URL의 keywords 파라미터 반영
	useLayoutEffect(() => {
		if (keywordParam) {
			const initialKeywords = keywordParam.split(',').filter((kw) => KEYWORD_LIST.includes(kw as Keyword)) as Keyword[];

			setSelected(initialKeywords);
			setLabel(
				initialKeywords.length === 0
					? '전체'
					: initialKeywords.length === 1
						? initialKeywords[0]
						: `${initialKeywords[0]} 외 ${initialKeywords.length - 1}개`,
			);
		} else {
			setSelected([]);
			setLabel('전체');
		}
	}, [keywordParam]);

	const toggleKeyword = (keyword: Keyword) => {
		setSelected((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]));
	};

	const handleApply = (close: () => void) => {
		if (selected.length > 0) {
			updateQueryParam('keywords', selected.join(','));
		} else {
			updateQueryParam('keywords', null);
		}
		close();
	};

	const handleReset = () => {
		setSelected([]);
		setLabel('전체');
	};

	return (
		// 스크롤바 유무에 따라 페딩 영향 받음
		<Dropdown label={label} about="키워드" className="pr-1">
			{(close) => (
				<div className="flex flex-col relative w-full h-[430px] desktop:h-[400px] desktop:w-[320px] desktop:py-3 justify-center desktop:justify-start desktop:items-center">
					<div className="flex flex-wrap gap-3 overflow-y-auto h-full desktop:h-[calc(100%-58px)] w-full content-baseline items-baseline pb-12 desktop:pb-4  custom-scrollbar">
						{KEYWORD_LIST.map((keyword) => (
							<KeywordBtn key={keyword} keyword={keyword} onClick={() => toggleKeyword(keyword)} isSelected={selected.includes(keyword)} />
						))}
					</div>
					<div className="absolute bottom-0 w-full  flex flex-1 justify-center desktop:justify-between gap-4 desktop:gap-0 p-2 desktop:pr-3">
						<button className="flex gap-1 typo-label2 font-bold cursor-pointer text-label-alternative items-center " onClick={handleReset}>
							초기화
							<Image src="/svgs/reset.svg" alt="리셋" draggable={false} width={14} height={14} className="w-3.5 h-3.5" />
						</button>
						<SolidBtn label="적용하기" onClick={() => handleApply(close)} className="flex-1 desktop:flex-0" />
					</div>
				</div>
			)}
		</Dropdown>
	);
};

export default CategoryFilter;
