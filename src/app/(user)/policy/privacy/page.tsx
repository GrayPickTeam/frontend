'use client';

import { PRIVACY_TERM_DATELIST, PRIVACY_TERMS, TERM_WRITTEN_DATE } from '@/features/policy/const';
import DateDropDown from '@/features/policy/DateDropDown';
import { useState } from 'react';

export default function PrivacyPage() {
	const [selectedDate, setSelectedDate] = useState<TERM_WRITTEN_DATE>(PRIVACY_TERM_DATELIST[0]);

	return (
		<div className="flex flex-col w-full max-w-desktop mx-auto px-6 py-8 gap-6 desktop:px-9 desktop:gap-9 desktop:mt-12 desktop:mb-30">
			<div className="flex flex-col desktop:py-5  gap-5">
				<h1 className="typo-title2 font-bold text-label-normal desktop:typo-title1">개인정보 처리방침</h1>

				<DateDropDown label={selectedDate} about="개인정보 처리방침 날짜 선택">
					{(close) => (
						<ul className="flex flex-col gap-2 max-h-60 overflow-auto">
							{PRIVACY_TERM_DATELIST.map((date) => (
								<li
									key={date}
									className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-100`}
									onClick={() => {
										setSelectedDate(date);
										close();
									}}
									role="option"
									aria-selected={date === selectedDate}
								>
									{date}
								</li>
							))}
						</ul>
					)}
				</DateDropDown>
			</div>

			<p className="pt-5 p">
				그레이픽은 고객의 정보를 소중하게 생각하며, ‘정보통신망 이용 촉진 및 정보보호 등에 관한 법률’, ‘개인정보보호법’ 등 개인정보보호법령을 철저히
				준수합니다. 그레이픽은 아래와 같은 [개인정보처리방침]을 제정하고 이를 준수합니다. 또한, 본 개인정보처리방침은 개인정보와 관련한 법령의 변경이
				있는 경우 또는 그레이픽의 정책 변경 등의 이유로 변경될 수 있습니다. 고객 여러분들께서는 그레이픽이 제공하는 사이트 방문 시 개인정보처리방침을
				수시로 확인하여 주시기 바랍니다.
			</p>

			{PRIVACY_TERMS[selectedDate].map(({ title, content }, i) => (
				<section key={i + selectedDate} className="flex flex-col gap-3">
					<h3 className="typo-heading2 font-bold text-label-normal">
						{i + 1}. {title}
					</h3>
					{content}
				</section>
			))}
		</div>
	);
}
