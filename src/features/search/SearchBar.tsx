'use client';

import SearchIcon from '@/shared/icon/Search';
import useSearch from './hooks/useSearch';
import CancelCircleIcon from '@/shared/icon/CancelCircle';

/**
 * `SearchBar` 컴포넌트는 검색어를 입력하는 입력 필드와 검색 아이콘을 포함하는 컴포넌트입니다.
 * 검색어 입력 후 URL 쿼리 파라미터에 반영하며, 입력값에 디바운스를 적용하여 빠른 검색어 입력을 처리합니다.
 */

const SearchBar = () => {
	const { searchTerm, setSearchTerm } = useSearch();

	return (
		<div className="w-full flex justify-center px-5 py-16 ">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="flex p-3 gap-2 border-2 w-full items-center max-w-[660px] border-line-normal-normal focus-within:border-primary-main-normal rounded-[12px]"
			>
				<SearchIcon width={20} height={20} className="text-label-assistive" />

				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="검색어를 입력해주세요"
					className="flex-1 outline-none typo-body2-normal text-black"
				/>
				{searchTerm.length === 0 ? (
					<div />
				) : (
					<button type="button" onClick={() => setSearchTerm('')}>
						<CancelCircleIcon width={22} height={22} />
					</button>
				)}
			</form>
		</div>
	);
};

export default SearchBar;
