import { useState } from 'react';
import { BillReaction, REACTION_ICON_MAP } from '../const';
import { postMyReaction, ReactionCounts } from '../api/server';
import { useRouter } from 'next/navigation';
import { MODAL_PATH } from '@/shared/const/url';

interface ReactionInfoProps extends ReactionCounts {
	id: string;
}

export const useReactionInfo = ({
	id,
	likeReactionCount,
	improvementReactionCount,
	excitedReactionCount,
	disappointedReactionCount,
	userReactionType,
}: ReactionInfoProps) => {
	// 좋아요, 흥미진진, 개선필요,  아쉬워요
	const [reactionCounts, setReactionCounts] = useState<[number, number, number, number]>([
		likeReactionCount,
		excitedReactionCount,
		improvementReactionCount,
		disappointedReactionCount,
	]);
	const [myReaction, setMyReaction] = useState<BillReaction | null>(userReactionType);
	const router = useRouter();

	const updateReaction = async (index: number) => {
		const selectedLabel = REACTION_ICON_MAP[index].label;
		const updated: [number, number, number, number] = [...reactionCounts];

		const { status } = await postMyReaction(id, selectedLabel);

		switch (status) {
			case 'success':
				break;
			case 'relogin':
				return router.push(MODAL_PATH.login, { scroll: false });
			case 'refresh':
				return alert('로그인이 만료되었습니다. 로그인 후 다시 시도해주세요.');
			default:
				return alert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
		}

		if (myReaction === selectedLabel) {
			updated[index] -= 1;
			setReactionCounts(updated);
			setMyReaction(null);
			return;
		}

		updated[index] += 1;

		if (myReaction !== null) {
			const prevIndex = REACTION_ICON_MAP.findIndex((item) => item.label === myReaction);
			if (prevIndex !== -1) {
				updated[prevIndex] -= 1;
			}
		}

		setReactionCounts(updated);
		setMyReaction(selectedLabel);
	};

	return { reactionCounts, myReaction, setMyReaction, setReactionCounts, updateReaction };
};
