export type BillStatus = '발의' | '위원회 회부' | '본회의 심의' | '정부 이송' | '공포';

export const BILL_STATUS_STEP: Record<BillStatus, { step: number; label: string }> = {
	발의: {
		step: 1,
		label: '제안된 법안을 담당 상임위원회에 보냈어요.',
	},
	'위원회 회부': {
		step: 2,
		label: '제안된 법안을 담당 상임위원회에 보냈어요.',
	},

	'본회의 심의': {
		step: 3,
		label: '국회의원이 모여 법안에 대한 심의를 하고 있어요.',
	},
	'정부 이송': {
		step: 4,
		label: '국회를 통과한 법안을 정부로 보냈어요.',
	},
	공포: {
		step: 5,
		label: '공포되어 시행을 앞두고 있어요',
	},
};
