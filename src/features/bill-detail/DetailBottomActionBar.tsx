import Image from 'next/image';
import BookmarkBtn from '@/features/bill-detail/BookmarkBtn';
import ShareButton from '@/shared/components/ShareBtn';
import { BillDetalProps } from './api/server';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisible } from './hooks/useVisible';
import { RefObject } from 'react';

interface DetailBottomActionBarProps extends BillDetalProps {
	opinionRef: RefObject<HTMLElement | null>;
	commentRef: RefObject<HTMLElement | null>;
}

const DetailBottomActionBar = ({ id, reactionCount, commentCount, scrapped, opinionRef, commentRef }: DetailBottomActionBarProps) => {
	const { targetRef, visible } = useVisible();

	const contentProps = {
		id,
		reactionCount,
		commentCount,
		scrapped,
		opinionRef,
		commentRef,
	};

	return (
		<>
			<div ref={targetRef} className="flex flex-col w-full gap-[16px]">
				<ActionBarContent {...contentProps} />
				<div className="border border-line-neutral w-full" />
			</div>

			<AnimatePresence>
				{visible && (
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 30 }}
						transition={{ duration: 0.3 }}
						className="flex flex-col items-center fixed bottom-0 w-full gap-[16px] bg-bg-normal-normal px-[20px] py-[16px] border border-line-neutral z-50"
					>
						<ActionBarContent {...contentProps} />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

type ActionBarContentProps = Pick<BillDetalProps, 'id' | 'reactionCount' | 'commentCount' | 'scrapped'> & {
	opinionRef: RefObject<HTMLElement | null>;
	commentRef: RefObject<HTMLElement | null>;
};

const ActionBarContent = ({ id, reactionCount, commentCount, scrapped, opinionRef, commentRef }: ActionBarContentProps) => {
	const scrollToTarget = (ref: RefObject<HTMLElement | null>) => {
		if (ref && ref.current) {
			ref.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	const IconList = [
		{
			src: '/svgs/fire-line.svg',
			alt: '반응수',
			nums: reactionCount,
			onClick: () => scrollToTarget(opinionRef),
		},
		{
			src: '/svgs/comment-line.svg',
			alt: '댓글수',
			nums: commentCount,
			onClick: () => scrollToTarget(commentRef),
		},
	] as const;

	return (
		<div className="flex items-center justify-between w-full h-[30px] px-[4px]">
			<div className="flex items-center gap-4">
				{IconList.map((icon) => (
					<button key={icon.alt} className="flex items-center gap-1" onClick={icon.onClick}>
						<Image src={icon.src} alt={icon.alt} width={18} height={18} draggable={false} />
						<span className="typo-body1-normal font-regular text-label-alternative" aria-label={icon.alt}>
							{icon.nums}
						</span>
					</button>
				))}
			</div>
			<div className="flex gap-5">
				<BookmarkBtn id={id} isScrapped={scrapped} />
				<ShareButton />
			</div>
		</div>
	);
};

export default DetailBottomActionBar;
