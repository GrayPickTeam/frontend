'use client';

import { useState } from 'react';
import Input from '@/shared/components/Input';
import Search from '@/shared/icon/Search';
import useDebounce from '@/shared/hooks/useDebounce';
import { useEffect } from 'react';

interface UserSearchBarProps {
	onSearch: (keyword: string) => void;
	placeholder?: string;
	className?: string;
}

export default function UserSearchBar({ onSearch, placeholder = '사용자 검색 (이메일, 닉네임)', className }: UserSearchBarProps) {
	const [keyword, setKeyword] = useState('');
	const debouncedKeyword = useDebounce(keyword, 500);

	useEffect(() => {
		onSearch(debouncedKeyword);
	}, [debouncedKeyword, onSearch]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(keyword);
	};

	const handleClear = () => {
		setKeyword('');
	};

	return (
		<form onSubmit={handleSubmit} className={className}>
			<div className="flex gap-3">
				<div className="flex-1 relative">
					<Input id="user-search" type="text" value={keyword} onChange={setKeyword} placeholder={placeholder} className="w-full" />
					{keyword && (
						<button
							type="button"
							onClick={handleClear}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-label-alternative hover:text-label-normal"
						>
							✕
						</button>
					)}
				</div>
				<button type="submit" className="flex items-center gap-2 px-4 py-2 bg-primary-main-normal text-white rounded-lg hover:opacity-90">
					<Search className="w-4 h-4" />
					검색
				</button>
			</div>
		</form>
	);
}
