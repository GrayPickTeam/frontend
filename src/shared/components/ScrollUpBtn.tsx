'use client';

/**
 *  데스크탑 사이즈 이상에서만 보임<br/>
 *  클릭 시 `window.scrollTo`로 최상단으로 이동함
 */

const ScrollUpBtn = () => {
	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	return (
		<button
			onClick={handleScrollToTop}
			className="hidden desktop:flex flex-col items-center justify-center h-10 w-10 fixed right-10 bottom-20 bg-bg-normal-normal cursor-pointer border border-line-normal-alternative rounded-full shadow-normal"
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2 1.33301L14 1.33301" stroke="#171719" strokeLinecap="square" strokeLinejoin="round" />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M8.42431 4.24214C8.18999 4.00783 7.8101 4.00783 7.57578 4.24214L2.90913 8.90881C2.67482 9.14312 2.67482 9.52302 2.90913 9.75733C3.14345 9.99165 3.52334 9.99165 3.75766 9.75733L7.40005 6.11493L7.49294 14.4164C7.49294 14.7477 7.76157 15.0164 8.09294 15.0164C8.42431 15.0164 8.69294 14.7477 8.69294 14.4164L8.60004 6.11493L12.2424 9.75733C12.4767 9.99165 12.8566 9.99165 13.091 9.75733C13.3253 9.52302 13.3253 9.14312 13.091 8.90881L8.42431 4.24214Z"
					fill="#171719"
				/>
			</svg>
		</button>
	);
};

export default ScrollUpBtn;
