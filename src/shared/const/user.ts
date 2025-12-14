export const WITHDRAWAL_REASON = ['NO_LONGER_NEEDED', 'LACK_OF_FEATURES', 'SWITCHING_SERVICE', 'INCONVENIENT', 'OTHER'] as const;

export const WITHDRAWAL_REASON_LABELS: Record<(typeof WITHDRAWAL_REASON)[number], string> = {
	NO_LONGER_NEEDED: '서비스를 더 이상 사용하지 않아요',
	LACK_OF_FEATURES: '필요한 기능이 부족해요',
	SWITCHING_SERVICE: '다른 서비스를 사용하려고 해요',
	INCONVENIENT: '서비스 이용 중 불편을 느꼈어요',
	OTHER: '기타',
};
