import React from 'react';
import { CommitteeName } from '../const/committee';

/**
 * status 또는 committee 타입에 따라 태그를 렌더링하는 컴포넌트입니다.
 * status 타입은 BillStatus를 사용하고, committee 타입은 CommitteeName을 사용합니다.
 */
export type TagLabelProps = { type: 'status'; text: string } | { type: 'committee'; text: CommitteeName };

type ColorGroup = 'blue' | 'deepBlue' | 'emerald' | 'green' | 'forest' | 'orange' | 'brown' | 'deepViolet' | 'violet';

const colorClassMap: Record<ColorGroup, { bg: string; text: string }> = {
	blue: { bg: 'bg-[#0066FF14]', text: 'text-[#0066FF]' },
	deepBlue: { bg: 'bg-[#0041A314]', text: 'text-[#0041A3]' },
	emerald: { bg: 'bg-[#17BF8914]', text: 'text-[#17BF89]' },
	green: { bg: 'bg-[#00BF4014]', text: 'text-[#00BF40]' },
	forest: { bg: 'bg-[#00782814]', text: 'text-[#007828]' },
	orange: { bg: 'bg-[#FF920014]', text: 'text-[#FF9200]' },
	brown: { bg: 'bg-[#A35D0014]', text: 'text-[#A35D00]' },
	deepViolet: { bg: 'bg-[#4F29E514]', text: 'text-[#4F29E5]' },
	violet: { bg: 'bg-[#6541F214]', text: 'text-[#6541F2]' },
};

const committeeColorGroupMap: Record<CommitteeName, ColorGroup> = {
	외교통일위원회: 'blue',
	문화체육관광위원회: 'emerald',
	보건복지위원회: 'violet',
	환경노동위원회: 'green',
	국토교통위원회: 'brown',
	교육위원회: 'blue',
	과학기술정보방송통신위원회: 'blue',
	농림축산식품해양수산위원회: 'green',
	기획재정위원회: 'brown',
	정무위원회: 'deepViolet',
	행정안전위원회: 'deepBlue',
	산업통상자원중소벤처기업위원회: 'orange',
	국방위원회: 'forest',
	법제사법위원회: 'deepBlue',
	국회운영위원회: 'brown',
	정보위원회: 'forest',
	예산결산특별위원회: 'emerald',
	여성가족위원회: 'violet',
	기타: 'orange',
};

/**
 * `TagLabel` 컴포넌트는 `status` 또는 `committee` 타입에 맞는 스타일의 태그를 렌더링합니다. <br/>
 *  status 타입은 `BillStatus`를 사용하고, committee 타입은 `CommitteeName`을 사용합니다. <br />
 * storybook에서는 type은 고정값 committee로 설정하였고, text만 변경할 수 있게 하였습니다.
 */
const TagLabel = ({ type, text }: TagLabelProps) => {
	// TODO: status 타입 정의시 색깔 부여
	const group = type === 'status' ? 'blue' : committeeColorGroupMap[text] || 'blue';
	const { bg, text: textColor } = colorClassMap[group];
	const colorClassName = `${bg} ${textColor}`;

	return (
		<div className={`flex items-center justify-center text-center h-6 rounded-[6px] px-1.5 gap-1 typo-caption1 font-medium  ${colorClassName}`}>
			{text}
		</div>
	);
};

export default TagLabel;
