export const normalizeTextStructure = (text: string): string => {
	// 첫 번째 소제목 제거
	const firstSectionSplit = text.indexOf('\r\n\r\n');
	let content = firstSectionSplit !== -1 ? text.slice(firstSectionSplit + 4) : text;

	// 중간 소제목 제거: \r\n\r\n + 짧은 줄 + \r\n\r\n => \r\n\r\n
	const SECTION_HEADER_PATTERN = /\r\n\r\n[^\r\n]{1,17}?\r\n\r\n/g;
	content = content.replace(SECTION_HEADER_PATTERN, '\r\n\r\n');
	// 문단 줄바꿈 제거
	content = content.replace(/\r\n\s+/g, ' ');
	return content.trim();
};

export const getCookieValue = (name: string): string | undefined => {
	const cookie = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
	return cookie?.split('=')[1];
};

export const areArraysEqualUnordered = <T>(a: T[], b: T[]): boolean => {
	if (a.length !== b.length) return false;
	const aSorted = [...a].sort();
	const bSorted = [...b].sort();
	return aSorted.every((val, idx) => val === bSorted[idx]);
};
export const formatDateToKorean = (dateStr: string) => {
	const [year, month, day] = dateStr.split('.').map(Number);
	return `${year}년 ${month}월 ${day}일`;
};

import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | boolean)[]): string {
	return twMerge(inputs.filter(Boolean).join(' '));
}
