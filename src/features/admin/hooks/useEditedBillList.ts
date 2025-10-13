import { useState } from 'react';

const useEditedBillList = () => {
	const [editedBillList, setEditedBillList] = useState<string[]>([]);

	const addEditedBill = (billId: string) => {
		setEditedBillList((prev) => (prev.includes(billId) ? prev : [...prev, billId]));
	};

	return { editedBillList, addEditedBill };
};

export default useEditedBillList;
