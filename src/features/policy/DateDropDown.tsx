import Image from 'next/image';
import { ReactNode } from 'react';
import { useDropdown } from '@/shared/hooks/useDropDown';

export interface DropdownProps {
	/**드롭다운 버튼에 적용된 text */
	label: string;
	/**드롭다운 메뉴의 aria-label 용 설명 */
	about: string;
	/**children 에 매개변수를 전달하여 닫기 기능 사용할 수 있도록 구성*/
	children: (close: () => void) => ReactNode;
	/** 부가적인 스타일을 위해 추가*/
	className?: string;
}

/**
 * 데스크탑 전용 드롭다운 컴포넌트입니다.
 */
export const DateDropDown = ({ label, about, children, className }: DropdownProps) => {
	// 데스크탑 전용이므로 mobileRef는 필요없음
	const { open, toggle, close, desktopRef } = useDropdown<HTMLDivElement, HTMLDivElement>(true);

	return (
		<div role="listbox" className="relative inline-block">
			<button
				className="flex items-center h-10 px-[11px] gap-1 border border-line-normal-neutral rounded-[10px] typo-body2-normal cursor-pointer"
				onClick={(e) => {
					e.stopPropagation();
					toggle();
				}}
			>
				{label}
				<Image src="/svgs/down.svg" alt="드롭다운열기" width={16} height={16} draggable={false} />
			</button>

			{open && (
				<aside
					role="dialog"
					aria-label={about}
					className={`absolute left-0 mt-2 px-5 py-2 z-10 bg-white border border-line-normal-neutral shadow-md rounded-[16px] ${className}`}
					ref={desktopRef}
				>
					{children(close)}
				</aside>
			)}
		</div>
	);
};

export default DateDropDown;
