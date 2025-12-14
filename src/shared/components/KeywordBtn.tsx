import React from 'react';
import { Keyword } from '../const/committee';

interface KeywordBtnProps {
	/** 키워드*/
	keyword: Keyword;
	/** 선택된 버튼인지 */
	isSelected: boolean;
	/** 호출되는 함수 */
	onClick: () => void;
}

const KeywordBtn = ({ keyword, isSelected, onClick }: KeywordBtnProps) => {
	return (
		<button
			onClick={onClick}
			type="button"
			className={`px-4 py-[7px] border rounded-[8px] cursor-pointer typo-label2 font-bold ${isSelected ? 'border-primary-main-normal bg-primary-main-normal text-white' : ' border-line-normal-neutral text-black'}`}
		>
			{keyword}
		</button>
	);
};

export default KeywordBtn;
