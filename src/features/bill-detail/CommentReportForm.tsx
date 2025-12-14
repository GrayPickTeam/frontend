'use client';

import { SolidBtn } from '@/shared/components/SolidBtn';
import { useState } from 'react';
import { reportBillComment } from './api/server';
import { useRouter } from 'next/navigation';
import { MODAL_PATH } from '@/shared/const/url';

interface ReportFormProps {
	id: string;
	nextStep: () => void;
}

const CommentReportForm = ({ id, nextStep }: ReportFormProps) => {
	const REPORT_REASONS = [
		'스팸 또는 반복적인 게시물',
		'성적인 콘텐츠',
		'잘못된 정보로 혼동을 줄 수 있는 콘텐츠',
		'폭력적이거나 혐오스러운 콘텐츠',
		'모욕적인 내용 또는 악의적인 콘텐츠',
		'괴롭힘 또는 폭력',
		'유해하거나 위험한 행위',
		'자살, 자해 또는 섭식 장애 관련 내용',
		'아동 학대',
		'테러 조장',
		'개인정보 침해',
	];

	const router = useRouter();
	const [selectedReason, setSelectedReason] = useState<string>('');

	const handleReport = async () => {
		try {
			await reportBillComment(id, selectedReason);
			nextStep();
		} catch (err) {
			if (err instanceof Error && err.name === 'WrongRequestError') {
				return alert('이미 신고한 댓글입니다.');
			}

			if (err instanceof Error && err.name === 'NeedLoginError') {
				return router.push(MODAL_PATH.login, { scroll: false });
			}

			alert('알 수 없는 문제가 발생하였습니다. 다시 시도해주세요');
		}
	};

	return (
		<div className="flex flex-col gap-5 px-5 pt-2 pb-5 h-[506px]">
			<h3 className="typo-headline2 font-bold text-label-neutral">어떤 문제인가요?</h3>
			<p className="flex flex-wrap typo-body1-normal text-label-neutral font-regular">
				그래이픽에서는 모든 커뮤니티 가이드를 검토하므로, 완벽히 일치하지 않아도 괜찮습니다.
			</p>
			<div className="flex flex-col py-2 px-5 rounded-[16px] border gap-1 border-line-normal-neutral overflow-y-auto flex-1 scrollbar-hide">
				{REPORT_REASONS.map((reason) => (
					<label key={reason} className="flex items-center gap-2 py-3 cursor-pointer ">
						<input
							type="radio"
							name="reportReason"
							value={reason}
							checked={selectedReason === reason}
							onChange={() => setSelectedReason(reason)}
							className="accent-primary-main-normal"
						/>
						<span className="typo-body1-normal">{reason}</span>
					</label>
				))}
			</div>
			<SolidBtn label="신고하기" size="large" disabled={selectedReason === ''} onClick={handleReport} className="mt-auto" />
		</div>
	);
};

export default CommentReportForm;
