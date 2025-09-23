'use client';

import { useState } from 'react';
import { aggroFont } from '@/shared/const/font';
import CloseIcon from '@/shared/icon/Close';

const Survey = () => {
	const [visible, setVisible] = useState(true);

	if (!visible) return null;

	return (
		<>
			<div className="flex justify-center sticky top-16 z-10 w-full bg-primary-main-normal h-12 max-desktop:hidden">
				<div className="relative flex w-full items-center max-w-[1200px] px-5">
					<a
						href="https://forms.gle/JvX2oYHuzyNMAebT9"
						className={`${aggroFont.className} text-[20px] font-medium text-primary-sub-normal mx-auto cursor-pointer`}
						target="_blank"
						rel="noopener noreferrer"
					>
						짧은 설문 후 커피 쿠폰 받아가세요 &gt;&gt;&gt;
					</a>

					<button className="absolute right-5" onClick={() => setVisible(false)}>
						<CloseIcon className="text-white" />
					</button>
				</div>
			</div>
			<div className="fixed top-18 z-10 p-[2px] rounded-[28px] bg-gradient-to-r from-[#43E5B2] to-[#6541F2] desktop:hidden">
				<div className="bg-white rounded-[26px] flex items-center gap-2 pt-[14px] pl-6 pr-4 pb-3">
					<a
						href="https://forms.gle/JvX2oYHuzyNMAebT9"
						className={`${aggroFont.className} text-[16px] font-medium mx-auto cursor-pointer`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="text-[#006545]">짧은 설문</span> 후 <span className="text-[#006545]">커피 쿠폰</span> 받아가세요!
					</a>

					<button onClick={() => setVisible(false)}>
						<CloseIcon className="text-label-neutral" size={20} />
					</button>
				</div>
			</div>
		</>
	);
};

export default Survey;
