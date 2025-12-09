'use client';

import { Fragment, RefObject } from 'react';
import { ReactionCounts } from './api/server';
import { BillReaction, REACTION_ICON_MAP } from './const';
import { useReactionInfo } from './hooks/useReactionInfo';
import Image from 'next/image';

interface DetailOpinionProps {
	ref: RefObject<HTMLElement | null>;
	id: string;
	profileImg: string;
	billReactions: ReactionCounts;
}

const DetailOpinion = ({ ref, id, profileImg, billReactions }: DetailOpinionProps) => {
	const { reactionCounts, myReaction, updateReaction } = useReactionInfo({ id, ...billReactions });

	const totalCount = reactionCounts.reduce((acc, cur) => {
		return acc + cur;
	}, 0);

	return (
		<section ref={ref} className="relative w-full flex flex-col px-[4px] gap-[8px]">
			<img src="/svgs/eyes.svg" alt="" className="absolute top-[-14px] right-[16px]" />
			<div className="w-full border-2 border-label-neutral rounded-[20px] overflow-hidden whitespace-nowrap select-none">
				<h3 className="typo-heading2 font-bold text-label-normal bg-primary-sub-normal px-[24px] pt-[16px] pb-[12px]">
					이 법안, 어떻게 평가하시나요?
				</h3>
				<div className="flex flex-col bg-bg-normal-alternative p-[24px] gap-[20px]">
					{reactionCounts.map((count, i) => {
						const { label, emoji, text } = REACTION_ICON_MAP[i];
						return (
							<Fragment key={label}>
								<EmojiBtn
									label={label}
									emoji={emoji}
									text={text}
									count={count}
									total={totalCount}
									profileImg={profileImg}
									userReaction={myReaction}
									clickFn={() => updateReaction(i)}
								/>
							</Fragment>
						);
					})}
				</div>
			</div>
			<span className="w-full text-right typo-label2 text-label-assistive">{totalCount} responses</span>
		</section>
	);
};

export default DetailOpinion;

interface EmojiBtnProps {
	label: BillReaction;
	emoji: string;
	text: string;
	count: number;
	total: number;
	profileImg: string;
	userReaction: BillReaction;
	clickFn: () => void;
}

const EmojiBtn = ({ label, emoji, text, count, total, profileImg, userReaction, clickFn }: EmojiBtnProps) => {
	const percent = Math.round(total > 0 ? (count / total) * 100 : 0);
	const isSelected = userReaction === label;

	return (
		<div
			key={label}
			onClick={clickFn}
			className={'relative h-[48px] flex overflow-hidden items-center typo-body1 font-bold text-label-normal rounded-[12px] cursor-pointer'}
		>
			{userReaction && (
				<>
					<div className="h-full bg-primary-main-normal" style={{ width: `${percent}%` }}></div>
					<div
						className={`absolute w-full z-10 text-static-white pointer-events-none`}
						style={{
							clipPath: `inset(0 ${100 - percent}% 0 0)`,
						}}
					>
						<div className="w-full flex items-center justify-between px-[20px]">
							<div className="flex items-center gap-1">
								<span>{emoji}</span>
								<span>{text}</span>
							</div>
							<div>
								<span>{`${percent}%`}</span>
							</div>
						</div>
					</div>
				</>
			)}
			<div className="absolute w-full flex items-center justify-between px-[20px]">
				<div className="flex items-center gap-1">
					<span>{emoji}</span>
					<span>{text}</span>
				</div>
				<div className="flex items-center gap-[8px]">
					{isSelected && (
						<Image
							src={profileImg}
							alt="프로필 이미지"
							width={24}
							height={24}
							draggable={false}
							sizes="100vw"
							className="rounded-full w-6 h-6 object-cover object-center"
						/>
					)}
					<span className={userReaction ? '' : 'hidden'}>{`${percent}%`}</span>
				</div>
			</div>
		</div>
	);
};
