import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '관리자 페이지',
};

export default function Admin() {
	return <div className="flex items-center justify-center min-h-screen flex-col gap-0.5">관리자 페이지입니다.</div>;
}
