'use client';

import { useRouter } from 'next/navigation';
import { SolidBtn } from '@/shared/components/SolidBtn';
import Back from '@/shared/icon/Back';

export default function NotFound() {
	const router = useRouter();

	const handleBackToList = () => {
		router.push('/admin/user');
	};

	return (
		<div className="space-y-6">
			<button
				onClick={handleBackToList}
				className="flex items-center gap-2 px-4 py-2"
				style={{ color: 'var(--color-label-normal)' }}
				onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-label-strong)')}
				onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-label-normal)')}
			>
				<Back className="w-4 h-4" />
				사용자 목록으로
			</button>

			<div className="text-center py-16">
				<h1 className="typo-heading1 mb-4" style={{ color: 'var(--color-label-strong)' }}>
					사용자를 찾을 수 없습니다
				</h1>
				<p className="typo-body1-reading mb-6" style={{ color: 'var(--color-label-normal)' }}>
					요청하신 사용자 정보를 불러올 수 없습니다.
				</p>
				<SolidBtn primary={true} size="medium" label="사용자 목록으로 돌아가기" onClick={handleBackToList} />
			</div>
		</div>
	);
}
