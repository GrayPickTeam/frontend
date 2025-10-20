import { notFound } from 'next/navigation';
import { getUserDetail } from '@/features/admin/api/user';
import UserDetailContent from './UserDetailContent';

interface Props {
	params: Promise<{
		userId: string;
	}>;
}

export default async function UserDetailPage({ params }: Props) {
	const { userId } = await params;
	const userIdNumber = parseInt(userId);

	if (isNaN(userIdNumber)) {
		return (
			<main className="px-4 md:px-8 py-6">
				<div className="text-center py-16">
					<h1 className="typo-heading1 text-label-strong mb-4">잘못된 사용자 ID</h1>
					<p className="typo-body1-reading text-label-normal">올바른 사용자 ID를 입력해주세요.</p>
				</div>
			</main>
		);
	}

	let user;
	try {
		user = await getUserDetail(userIdNumber);
	} catch {
		notFound();
	}

	if (!user) {
		notFound();
	}

	return (
		<main className="w-full h-full p-6">
			<UserDetailContent user={user} />
		</main>
	);
}
