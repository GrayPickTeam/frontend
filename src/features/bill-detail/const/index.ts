export type BillReaction = '좋아요' | '흥미진진' | '개선필요' | '아쉬워요';

export const REACTION_EMOJI: Record<BillReaction, string> = {
	좋아요: '👍',
	흥미진진: '🤩',
	개선필요: '😮‍💨',
	아쉬워요: '😡',
} as const;

export const REACTION_ICON_MAP: readonly { label: BillReaction; emoji: string; text: string }[] = [
	{ label: '좋아요', emoji: '👍', text: '좋아요!' },
	{ label: '흥미진진', emoji: '🤩', text: '흥미진진해요' },
	{ label: '개선필요', emoji: '😮‍💨', text: '한숨만 나와요' },
	{ label: '아쉬워요', emoji: '😡', text: '이건 좀 ;;;;' },
] as const;
