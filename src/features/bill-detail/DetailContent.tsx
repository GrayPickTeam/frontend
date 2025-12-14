'use client';

import Image from 'next/image';
import { normalizeTextStructure } from '@/shared/util';
import { useEffect, useRef, useState } from 'react';

const DetailContent = ({ detail }: { detail: string }) => {
	const textRef = useRef<HTMLParagraphElement | null>(null);
	const [isClamped, setIsClamped] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		if (detail && textRef.current) {
			const element = textRef.current;

			if (!isExpanded) {
				const clamped = element.scrollHeight > element.clientHeight;
				setIsClamped(clamped);
			}
		}
	}, [detail, isExpanded]);

	return (
		<section className="flex flex-col w-full gap-3 desktop:px-[20px]">
			<h3 className="typo-heading2 font-bold text-label-normal desktop:typo-heading1">제안 이유 및 주요 내용</h3>
			{detail ? (
				<div className="flex flex-col gap-[24px]">
					<p
						ref={textRef}
						className={`whitespace-pre-wrap typo-body2-normal font-regular text-label-normal desktop:typo-body1-normal ${isExpanded ? '' : 'line-clamp-3'}`}
					>
						{normalizeTextStructure(detail)}
					</p>
					{!isExpanded && isClamped && (
						<button
							className="w-full typo-body2-normal text-label-normal px-[20px] py-[9px] border border-line-normal-neutral rounded-[10px]"
							onClick={() => setIsExpanded(true)}
						>
							더보기
						</button>
					)}
				</div>
			) : (
				<div className="flex flex-col items-center w-full py-9 desktop:py-15 gap-8">
					<Image
						src="/images/loading.png"
						alt="업데이트 예정"
						width={132}
						height={132}
						className="w-[120px] h-[120px] desktop:w-[132px] desktop:h-[132px]"
					/>
					<span className="typo-body1-normal desktop:typo-heading2 font-regular text-label-normal">상세한 법안 내용을 준비중이에요</span>
				</div>
			)}
		</section>
	);
};

export default DetailContent;
