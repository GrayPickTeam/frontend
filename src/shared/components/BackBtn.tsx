'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '../icon/Back';

const BackBtn = ({ text = '돌아가기' }: { text?: string }) => {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<section className="w-full">
			<button onClick={handleBack} className="flex items-center gap-[4px]">
				<BackIcon />
				<span className="typo-label2 font-bold text-label-alternative">{text}</span>
			</button>
		</section>
	);
};

export default BackBtn;
