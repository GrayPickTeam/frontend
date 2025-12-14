'use server';

import { tokenFetcher } from '@/shared/api/fetcher';

export interface UpdateBillBody {
	summary: string;
	aiTitle: string;
	aiSummary: string;
	committeeName: string;
	billStatus: string;
}

export const updateBill = async (billId: string, body: UpdateBillBody) => {
	try {
		await tokenFetcher(`/api/admin/bills/${billId}`, {
			method: 'PUT',
			body: JSON.stringify(body),
		});
	} catch (err) {
		throw err;
	}
};
