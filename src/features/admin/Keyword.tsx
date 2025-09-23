'use client';

import { useEffect, useState } from 'react';
import { addSearchKeyword, deleteSearchKeyword, getSearchKeywords, updateSearchKeyword, KeywordType } from './api/keyword';
import KeywordItem from './KeywordItem';

const Keyword = () => {
	const [keywords, setKeywords] = useState<KeywordType[]>([]);
	const [newKeyword, setNewKeyword] = useState('');

	const handleAddKeyword = async () => {
		if (!newKeyword.trim()) return;

		try {
			const added = await addSearchKeyword(newKeyword);
			const withUpdatedAt = { ...added, updatedAt: new Date().toISOString() };
			setKeywords((prev) => [...prev, withUpdatedAt]);
			setNewKeyword('');
		} catch (err) {
			console.error('키워드 추가 실패', err);
		}
	};

	const handleUpdateKeyword = async (kw: KeywordType) => {
		try {
			const updated = await updateSearchKeyword(kw);
			setKeywords((prev) => prev.map((k) => (k.id === updated.id ? updated : k)));
		} catch (err) {
			console.error('키워드 수정 실패', err);
		}
	};

	const handleDeleteKeyword = async (kw: KeywordType) => {
		const ok = window.confirm(`"${kw.text}" 키워드를 삭제하시겠습니까?`);
		if (!ok) return;

		try {
			await deleteSearchKeyword(kw);
			setKeywords((prev) => prev.filter((item) => item.id !== kw.id));
		} catch (err) {
			console.error('키워드 삭제 실패', err);
		}
	};

	useEffect(() => {
		const fetchKeywords = async () => {
			try {
				const data = await getSearchKeywords({});
				setKeywords(data.content);
			} catch (err) {
				console.error(err);
			}
		};
		fetchKeywords();
	}, []);

	return (
		<div className="p-4">
			<h2 className="text-lg font-bold mb-4">Keyword 관리</h2>

			{/* 추가 영역 */}
			<div className="mb-5 flex gap-2">
				<input
					type="text"
					placeholder="검색어 입력"
					className="border rounded px-2 py-1 flex-1"
					value={newKeyword}
					onChange={(e) => setNewKeyword(e.target.value)}
				/>
				<button className="px-3 py-1 bg-accent-bg-blue text-white rounded" onClick={handleAddKeyword}>
					추가
				</button>
			</div>

			{/* 키워드 목록 */}
			<ul className="space-y-2 min-w-[800px]">
				<div className="grid grid-cols-6 gap-2 items-center p-2 border-b typo-headline1 text-center">
					<span className="col-span-2">키워드</span>
					<span>수정일</span>
					<span>중요도</span>
					<span>표시여부</span>
					<span></span>
				</div>
				{keywords.map((kw) => (
					<KeywordItem key={kw.id} keyword={kw} onUpdate={handleUpdateKeyword} onDelete={handleDeleteKeyword} />
				))}
			</ul>
		</div>
	);
};

export default Keyword;
