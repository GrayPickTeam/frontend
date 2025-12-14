import { Fragment } from 'react';

const MyCommentSkeleton = () => {
	return (
		<div className="flex flex-col w-full gap-5 px-6 py-5">
			{Array.from({ length: 6 }).map((_, idx) => (
				<Fragment key={idx}>
					<CommentSlice />
					{idx !== 5 && <div className="h-px bg-line-normal-normal w-full" />}
				</Fragment>
			))}
		</div>
	);
};

export default MyCommentSkeleton;

const CommentSlice = () => {
	return (
		<div className="flex flex-col gap-2 w-full ">
			<div className="w-20 h-4.5 bg-[#F4F4F5] rounded-[4px]" />
			<div className="w-full h-26 bg-[#F4F4F5] rounded-[4px]" />
			<div className="w-[272px] h-6 bg-[#F4F4F5] rounded-[4px]" />
		</div>
	);
};
