'use client';

import BillEdit from './BillEdit';
import useBillInfo from './hooks/useBillInfo';
import useEditedBillList from './hooks/useEditedBillList';

const BillAdminForm = () => {
	const { billId, setBillId, searchBillInfo, isLoading, error, billDetail, removeBillInfo } = useBillInfo();
	const { editedBillList, addEditedBill } = useEditedBillList();

	return (
		<div className="flex flex-col gap-6 w-full max-w-lg mx-auto p-6">
			<h1 className="text-2xl font-semibold text-center">법안 수정</h1>

			<div className="flex gap-3">
				<input
					type="number"
					placeholder="법안 ID를 입력하세요"
					value={billId}
					onChange={(e) => setBillId(e.target.value)}
					className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-1"
				/>
				<button onClick={searchBillInfo} className="px-4 py-2 bg-accent-bg-violet text-white rounded-md hover:bg-accent-fg-violet transition">
					검색
				</button>
			</div>

			{editedBillList.length > 0 && (
				<div className="text-center">
					<p className="typo-headline1 font-medium text-gray-700 mb-1">수정 완료된 법안</p>
					<p className="typo-body1-reading">{editedBillList.join(', ')}</p>
				</div>
			)}
			{isLoading && <p className="typo-body1-reading">불러오는 중...</p>}
			{error && <p className="typo-body1-reading">{error}</p>}

			{billDetail && (
				<div className="border border-bg-gray rounded-lg p-4 bg-gray-50 mt-4">
					<BillEdit {...billDetail} removeBillInfo={removeBillInfo} addEditedBill={addEditedBill} />
				</div>
			)}
		</div>
	);
};

export default BillAdminForm;
