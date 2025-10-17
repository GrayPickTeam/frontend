import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '프로필 수정',
};

export default async function MyProfile() {
	return <div className="flex w-full justify-center px-5 py-12 desktop:py-15"></div>;
}
