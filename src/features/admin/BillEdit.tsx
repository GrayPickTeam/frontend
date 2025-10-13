'use client';

import { useState } from 'react';
import { BillDetalProps } from '../bill-detail/api/server';
import { updateBill } from './api/bill';

type EditableBillFields = Pick<BillDetalProps, 'id' | 'billSummary' | 'billAiTitle' | 'billAiSummary' | 'committeeName' | 'billStatus'>;

interface BillEditProps extends EditableBillFields {
	removeBillInfo: () => void;
	addEditedBill: (billId: string) => void;
}

const BillEdit = ({ id, billSummary, billAiTitle, billAiSummary, committeeName, billStatus, removeBillInfo, addEditedBill }: BillEditProps) => {
	const [summary, setSummary] = useState(billSummary);
	const [aiTitle, setAiTitle] = useState(billAiTitle);
	const [aiSummary, setAiSummary] = useState(billAiSummary);
	const [committee, setCommittee] = useState<string>(committeeName);
	const [status, setStatus] = useState(billStatus);

	// 수정 완료 (더미)
	const handleSubmit = async () => {
		try {
			await updateBill(id, {
				summary,
				aiTitle,
				aiSummary,
				committeeName,
				billStatus,
			});

			alert('법안 수정이 완료되었습니다.');
			removeBillInfo();
			addEditedBill(id);
		} catch (err) {
			alert(`법안 수정 중 오류가 발생했습니다: ${err}`);
			console.error(err);
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
			className="flex flex-col gap-5"
		>
			<h2 className="text-lg font-semibold mb-2">법안 정보 수정</h2>

			{/* AI 생성 제목 */}
			<label className="flex flex-col gap-1">
				<span className="typo-body1-normal font-medium">
					AI 생성 제목
					{aiTitle !== billAiTitle && <span className="text-sm text-accent-fg-violet ml-1">(수정됨)</span>}
				</span>
				<input
					type="text"
					value={aiTitle}
					onChange={(e) => setAiTitle(e.target.value)}
					className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1"
				/>
			</label>

			{/* AI 생성 요약 */}
			<label className="flex flex-col gap-1">
				<span className="typo-body1-normal font-medium">
					AI 생성 요약
					{aiSummary !== billAiSummary && <span className="text-sm text-accent-fg-violet ml-1">(수정됨)</span>}
				</span>
				<textarea
					value={aiSummary}
					onChange={(e) => setAiSummary(e.target.value)}
					rows={3}
					className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 resize-none"
				/>
			</label>

			{/* 법안 요약 */}
			<label className="flex flex-col gap-1">
				<span className="typo-body1-normal font-medium">
					법안 요약
					{summary !== billSummary && <span className="text-sm text-accent-fg-violet ml-1">(수정됨)</span>}
				</span>
				<textarea
					value={summary}
					onChange={(e) => setSummary(e.target.value)}
					rows={3}
					className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 resize-none"
				/>
			</label>

			{/* 소속 위원회 */}
			<label className="flex flex-col gap-1">
				<span className="typo-body1-normal font-medium">
					소속 위원회
					{committee !== committeeName && <span className="text-sm text-accent-fg-violet ml-1">(수정됨)</span>}
				</span>
				<input
					type="text"
					value={committee}
					onChange={(e) => setCommittee(e.target.value)}
					className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1"
				/>
			</label>

			{/* 현재 상태 */}
			<label className="flex flex-col gap-1">
				<span className="typo-body1-normal font-medium">
					현재 상태
					{status !== billStatus && <span className="text-sm text-accent-fg-violet ml-1">(수정됨)</span>}
				</span>
				<input
					type="text"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1"
				/>
			</label>

			<div className="flex justify-end gap-3 mt-4">
				<button type="button" onClick={removeBillInfo} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
					수정 취소
				</button>
				<button type="submit" className="px-4 py-2 bg-accent-bg-violet text-white rounded-md hover:bg-accent-fg-violet transition">
					수정 완료
				</button>
			</div>
		</form>
	);
};

export default BillEdit;
