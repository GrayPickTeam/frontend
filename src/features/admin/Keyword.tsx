'use client';

import { useEffect, useState } from 'react';
import { addSearchKeyword, getSearchKeywords, KeywordType } from './api/keyword';

const Keyword = () => {
	const [keywords, setKeywords] = useState<KeywordType[]>([]);
	const [newKeyword, setNewKeyword] = useState('');

	const handleAddKeyword = async () => {
		if (!newKeyword.trim()) return; // 빈 값 무시

		try {
			const added = await addSearchKeyword(newKeyword);
			setKeywords((prev) => [...prev, added]); // 새 키워드 목록에 추가
			setNewKeyword(''); // 입력 초기화
		} catch (err) {
			console.error('키워드 추가 실패', err);
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
		<div>
			<h2>Keyword 관리</h2>

			{/* 추가하기 영역 */}
			<div style={{ marginBottom: '20px' }}>
				<input type="text" placeholder="검색어 입력" value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} />
				<button onClick={handleAddKeyword} style={{ marginLeft: '8px' }}>
					추가
				</button>
			</div>
			<ul>
				{keywords.map((kw, idx) => (
					<li key={idx} style={{ marginBottom: '10px' }}>
						<span>
							{kw.text} | 우선순위: {kw.priority} | 표시: {kw.display ? 'Y' : 'N'} | 삭제:
						</span>
						<button style={{ marginLeft: '8px' }}>수정</button>
						<button style={{ marginLeft: '4px', color: 'red' }}>삭제</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Keyword;
