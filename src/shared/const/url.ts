export const CLIENT_NAVI_PATH = {
	home: { name: '홈', path: '/' },
	guide: { name: '정치 입문서', path: '/guide' },
	bill: { name: '법안 피드', path: '/bill' },
	billDetail: {
		name: '법안 상세',
		getPath: (id: string | number) => `/bill/${id}`,
	},
	person: { name: '정치인 피드', path: '/person' },
	mypage: { name: '마이페이지', path: '/mypage' },
	myprofile: { name: '프로필 수정', path: '/mypage/profile' },
	search: { name: '검색페이지', path: '/search' },
	policyService: { name: '서비스 이용약관', path: '/policy/service' },
	policyPrivacy: { name: '개인정보 처리방침', path: '/policy/privacy' },
} as const;

export const ADMIN_NAVI_PATH = {
	keywords: { name: '검색 키워드 관리', path: '/admin/keywords' },
} as const;

export const MODAL_PATH = {
	link: '/mobile-link',
	login: '/modal-login',
	reportComment: '/modal-report-comment',
};

const NAVIBAR_VALUES = ['home', 'bill'] as const;
export const DEPLOY_URL = 'https://graypick.co.kr';

export const NAVIBAR_PATH = NAVIBAR_VALUES.map((key) => CLIENT_NAVI_PATH[key]);
export const ADMIN_NAVIBAR_PATH = Object.values(ADMIN_NAVI_PATH);

export const SERVER_URL = {
	oauth: 'api/auth/oauth',
	logout: 'api/auth/logout',
};
