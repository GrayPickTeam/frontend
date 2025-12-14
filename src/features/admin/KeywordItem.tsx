import { useState } from 'react';
import { SearchKeyword } from '../search/api/server';

interface KeywordItemProps {
	keyword: SearchKeyword;
	onUpdate: (kw: SearchKeyword) => Promise<void>;
	onDelete: (kw: SearchKeyword) => Promise<void>;
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

	const formatDate = (dateStr: string) => dateStr.split('T')[0];

	return (
		<div className="grid grid-cols-6 gap-2 items-center p-2 border-b text-center">
			{/* 각 컬럼 */}
			{isEditing ? (
				<>
					<input
						type="text"
						className="border rounded px-2 py-1 col-span-2"
						value={editData.text}
						onChange={(e) => setEditData({ ...editData, text: e.target.value })}
					/>
					<span>{formatDate(keyword.updatedAt)}</span>

					<input
						type="number"
						className="border rounded px-2 py-1 w-15 mx-auto"
						value={editData.priority}
						onChange={(e) => setEditData({ ...editData, priority: Number(e.target.value) })}
					/>
					<label className="flex items-center gap-1 justify-center">
						<input
							type="checkbox"
							checked={editData.display}
							onChange={() => setEditData({ ...editData, display: !editData.display })}
							className="w-5 h-5 bg-accent-bg-green"
						/>
					</label>
					<div className="flex gap-1">
						<button className="px-2 py-1 bg-accent-bg-blue text-white rounded" onClick={handleSave}>
							완료
						</button>
						<button className="px-2 py-1 bg-accent-bg-red text-white rounded" onClick={() => setIsEditing(false)}>
							취소
						</button>
					</div>
				</>
			) : (
				<>
					<span className="col-span-2">{keyword.text}</span>
					<span>{formatDate(keyword.updatedAt)}</span>
					<span>{keyword.priority}</span>
					<span>{keyword.display ? 'Y' : 'N'}</span>
					<div className="flex gap-1 ">
						<button className="px-2 py-1 bg-accent-bg-blue text-white rounded" onClick={() => setIsEditing(true)}>
							수정
						</button>
						<button className="px-2 py-1 bg-accent-bg-red text-white rounded" onClick={() => onDelete(keyword)}>
							삭제
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default KeywordItem;
