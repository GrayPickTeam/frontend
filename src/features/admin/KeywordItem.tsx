import { useState } from 'react';
import { KeywordType } from './api/keyword';

interface KeywordItemProps {
	keyword: KeywordType;
	onUpdate: (kw: KeywordType) => Promise<void>;
	onDelete: (kw: KeywordType) => Promise<void>;
}
const KeywordItem: React.FC<KeywordItemProps> = ({ keyword, onUpdate, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({
		text: keyword.text,
		priority: keyword.priority,
		display: keyword.display,
	});

	const handleSave = () => {
		onUpdate({ ...keyword, ...editData, updatedAt: new Date().toISOString() });
		setIsEditing(false);
	};

	return (
		<li className="mb-2 flex items-center gap-2">
			{isEditing ? (
				<>
					<input
						type="text"
						className="border rounded px-2 py-1"
						value={editData.text}
						onChange={(e) => setEditData({ ...editData, text: e.target.value })}
					/>
					<input
						type="number"
						className="border rounded px-2 py-1 w-20"
						value={editData.priority}
						onChange={(e) => setEditData({ ...editData, priority: Number(e.target.value) })}
					/>
					<button
						className={`px-2 py-1 rounded ${editData.display ? 'bg-accent-bg-green text-white' : 'bg-accent-fg-green'}`}
						onClick={() => setEditData({ ...editData, display: !editData.display })}
					>
						{editData.display ? 'ON' : 'OFF'}
					</button>
					<button className="px-2 py-1 bg-accent-bg-blue text-white rounded" onClick={handleSave}>
						수정완료
					</button>
					<button className="px-2 py-1 bg-accent-bg-green text-white rounded" onClick={() => setIsEditing(false)}>
						취소
					</button>
				</>
			) : (
				<>
					<span>
						{keyword.text} | 우선순위: {keyword.priority} | 표시: {keyword.display ? 'Y' : 'N'} | 수정일: {keyword.updatedAt}
					</span>
					<button className="px-2 py-1 bg-accent-bg-orange text-white rounded" onClick={() => setIsEditing(true)}>
						수정
					</button>
					<button className="px-2 py-1 bg-accent-bg-red text-white rounded" onClick={() => onDelete(keyword)}>
						삭제
					</button>
				</>
			)}
		</li>
	);
};

export default KeywordItem;
