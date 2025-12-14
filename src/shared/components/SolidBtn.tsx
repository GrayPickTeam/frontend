import React from 'react';
import { twMerge } from 'tailwind-merge';

// 기본 SolidBtnProps 타입 정의
export interface BaseSolidBtnProps {
	/** Is this the principal call to action on the page? */
	primary?: boolean;
	/** What background color to use */
	backgroundColor?: string;
	/** How large should the button be? */
	size?: 'small' | 'medium' | 'large';
	/** Button contents */
	label: string;
	/** Optional click handler */
	onClick?: () => void;
	/** Disabled state */
	disabled?: boolean;
	/** Additional class names */
	className?: string;
}

// 버튼의 HTML 속성을 포함한 타입
export type SolidBtnProps<T extends Record<string, unknown> = Record<string, never>> = BaseSolidBtnProps &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseSolidBtnProps> &
	T;

const sizeMap: Record<NonNullable<BaseSolidBtnProps['size']>, string> = {
	small: 'h-[32px] px-[14px] py-[7px] rounded-[8px] typo-label2 font-bold',
	medium: 'h-[40px] px-[20px] py-[9px] rounded-[10px] typo-body2-normal font-medium',
	large: 'h-[48px] px-[28px] py-[12px] rounded-[12px] typo-body2-normal font-medium',
};

export const SolidBtn = <T extends Record<string, unknown> = Record<string, never>>({
	primary = true,
	size = 'medium',
	label,
	onClick,
	disabled = false,
	className = '',
	// 명시적으로 속성을 분리하여 커스텀 속성 필터링
	...rest
}: SolidBtnProps<T>) => {
	const base = 'flex items-center justify-center whitespace-nowrap hover:opacity-90';
	const variant = primary ? 'text-white bg-primary-main-normal' : 'text-label-neutral bg-bg-normal-alternative';
	const sizeClass = sizeMap[size];

	const mergedClassName = twMerge(`${base} ${variant} ${sizeClass} disabled:bg-interaction-disable disabled:text-label-assistive`, className);
	return (
		<button
			type="button"
			className={mergedClassName}
			onClick={onClick}
			disabled={disabled}
			{...rest} // 이미 필터링된 표준 HTML 속성만 전달
		>
			{label}
		</button>
	);
};
