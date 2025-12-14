import { Fragment } from 'react';

const MyOpinionSkeleton = () => {
	return (
		<div className="flex flex-col w-full gap-5">
			<div className="w-20 h-5 bg-[#70737C14] rounded-[4px]" />
			{Array.from({ length: 6 }).map((_, idx) => (
				<Fragment key={idx}>
					<OpinionSlice />
					{idx !== 5 && <div className="self-end h-px bg-line-normal-normal w-[calc(100%-56px)]" />}
				</Fragment>
			))}
		</div>
	);
};

export default MyOpinionSkeleton;

const OpinionSlice = () => {
	return <div className="bg-[#70737C14] rounded-[4px] w-full h-[80px] desktop:h-[56px]" />;
};
