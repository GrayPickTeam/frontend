import Image from 'next/image';
import { ReactNode } from 'react';
import { useDropdown } from '../hooks/useDropDown';

export interface DropdownProps {
	/**드롭다운 버튼에 적용된 text */
	label: string;
	/**모바일에서 표시될 드롭다운 주제 */
	about: string;
	/**children 에 매개변수를 전달하여 닫기 기능 사용할 수 있도록 구성*/
	children: (close: () => void) => ReactNode;
	/** 부가적인 스타일을 위해 추가*/
	className?: string;
}

/**
 * 드롭다운을 유연하게 사용하기 위해 내부 컴퍼넌트를 외부에서 props로 전달 받습니다. <br/>
 * 웹에서는 드롭다운 형태, 모바일에서는 하단에 붙은 모달 형태로 렌더링 됩니다. <br/>
 * 예시) 최신순 조회순으로 정렬하는 필터
 */

export const Dropdown = ({ label, about, children, className }: DropdownProps) => {
	const { open, toggle, close, desktopRef, mobileRef } = useDropdown<HTMLDivElement, HTMLDivElement>();

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
				<>
					{/* 데스크탑 */}
					<aside
						role="dialog"
						aria-label={about}
						className={`hidden desktop:block absolute left-0 mt-2 px-5 py-2  z-10 bg-white border border-line-normal-neutral shadow-md rounded-[16px] ${className}`}
						ref={desktopRef}
					>
						{children(close)}
					</aside>

					{/* 모바일 */}
					<div className="desktop:hidden fixed inset-0 z-40 bg-black/80">
						<aside
							role="dialog"
							aria-label={about}
							className={`absolute bottom-0 left-0 w-full bg-white rounded-t-[10px] p-4 ${className}`}
							ref={mobileRef}
						>
							<div className="w-10 h-1.5 bg-[rgba(112,115,124,0.16)] rounded-full mx-auto" />
							<div className="flex justify-between items-center mb-4 h-16">
								{/* 좌측 빈 영역(디자인 용) */}
								<div className="w-6 h-6" />
								<div className="typo-headline2 font-bold text-label-normal">{about}</div>
								<button className="cursor-pointer desktop:hidden" onClick={close} aria-label="닫기">
									<Image src="/svgs/close.svg" alt="닫기" width={24} height={24} />
								</button>
							</div>
							{children(close)}
						</aside>
					</div>
				</>
			)}
		</div>
	);
};

export default Dropdown;
