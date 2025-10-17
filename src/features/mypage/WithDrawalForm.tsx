'use client';

import { SolidBtn } from '@/shared/components/SolidBtn';
import { CLIENT_NAVI_PATH } from '@/shared/const/url';
import { WITHDRAWAL_REASON, WITHDRAWAL_REASON_LABELS } from '@/shared/const/user';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { clearAuth } from '../auth/utils/cookie';
import { withDrawalService } from './api/server';
import { useRouter } from 'next/navigation';

const WithDrawalForm = ({ nickname }: { nickname: string }) => {
	const [selectedReason, setSelectedReason] = useState<string | null>(null);
	const [otherReason, setOtherReason] = useState('');
	const queryClient = useQueryClient();
	const router = useRouter();
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const handleConfirmWithdraw = async () => {
		const result = await withDrawalService(selectedReason!, otherReason);

		if (result === 'success') {
			setShowConfirmModal(false);
			await clearAuth();
			queryClient.clear();
			router.push('/');
		} else {
			alert('서버 상태가 불안정합니다. 잠시 후 다시 시도해주세요.');
		}
	};
	return (
		<>
			<div className="flex flex-col gap-1">
				<p className="typo-headline1 font-bold text-label-normal">{nickname} 님이 떠나시는 이유는 무엇인가요?</p>
				<div className="flex py-2">
					<div className="flex flex-col rounded-[16px] border-1 border-[#EAEBEC] py-2 px-5 gap-1 w-full max-h-[400px]">
						{WITHDRAWAL_REASON.map((reason) => (
							<label key={reason} className="flex items-center gap-2 py-3">
								<input
									type="radio"
									name="withdrawalReason"
									checked={selectedReason === reason}
									onChange={() => setSelectedReason(reason)}
									className="accent-[#6541F2] rounded-full w-6 h-6"
								/>
								<span className="typo-body1-normal font-regular text-label-normal">{WITHDRAWAL_REASON_LABELS[reason]}</span>
							</label>
						))}
					</div>
				</div>

				<textarea
					value={otherReason}
					onChange={(e) => setOtherReason(e.target.value)}
					placeholder="서비스 개선을 위해 자세한 의견을 들려주세요."
					className="flex flex-col w-full rounded-[12px] border-1 border-[#EAEBEC] p-4 h-[120px] resize-none"
				/>
			</div>

			<div className="flex justify-end gap-2 items-center">
				<Link
					href={CLIENT_NAVI_PATH.myprofile.path}
					className="flex items-center justify-center w-17 h-8 text-label-alternative typo-body1-normal font-bold text-center"
				>
					취소
				</Link>
				<SolidBtn
					disabled={selectedReason === null || (selectedReason === 'OTHER' && otherReason.trim() === '')}
					label="탈퇴하기"
					onClick={() => setShowConfirmModal(true)}
					size="medium"
					className="typo-body2-normal bg-accent-bg-red"
				/>
			</div>

			{/* 탈퇴 팝업창 */}
			{showConfirmModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-5">
					<div className="bg-white rounded-[12px] max-w-[400px] flex flex-col items-center">
						<p className="flex px-4 pl-6 py-5 typo-headline2 text-label-normal w-full font-medium">다시 한번 확인해주세요</p>
						<p className="flex p-5 typo-body1-normal font-regular text-label-normal">
							탈퇴 시 고객님의 모든 정보는 삭제되며, 30일 이내 재가입이 불가합니다. 탈퇴하시겠습니까?
						</p>
						<div className="flex flex-col p-5 w-full gap-2">
							<SolidBtn label="탈퇴하기" size="medium" className="typo-body2-normal bg-accent-bg-red" onClick={handleConfirmWithdraw} />
							<button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 rounded-md border border-[#70737C]/16">
								취소
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default WithDrawalForm;
