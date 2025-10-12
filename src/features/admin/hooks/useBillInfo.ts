import { BillDetalProps, getBillDetail } from '@/features/bill-detail/api/server';
import { useState } from 'react';

const useBillInfo = () => {
	const [billId, setBillId] = useState('');
	const [billDetail, setBillDetail] = useState<BillDetalProps | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const searchBillInfo = async () => {
		if (!billId.trim()) return alert('법안 ID를 입력해주세요.');

		if (!/^\d+$/.test(billId.trim())) {
			return alert('올바른 법안 ID를 입력해주세요.');
		}

		try {
			setIsLoading(true);
			setError(null);
			const data = await getBillDetail(billId);
			setBillDetail(data);
		} catch {
			setError('법안 정보를 불러오지 못했습니다.');
			setBillDetail(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { billId, setBillId, billDetail, isLoading, error, searchBillInfo };
};

export default useBillInfo;
