import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { getMyComments } from './api/server';
import HeartIcon from '@/shared/icon/Heart';
import TagIcon from '@/shared/icon/Tag';
import EmptyData from './EmptyData';
import { QUERY_KEYS } from '@/shared/const/reactQuery';
import InfinityScrollSpinner from '@/shared/components/InfinityScrollSpinner';
import ErrorIndicator from '@/shared/components/ErrorIndicator';
import MyCommentSkeleton from './skeletons/MyComment.Skeleton';
import Link from 'next/link';
import { CLIENT_NAVI_PATH } from '@/shared/const/url';

const MyComment = () => {
	const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError } = useInfiniteQuery({
		queryKey: [QUERY_KEYS.myComments],
		queryFn: ({ pageParam }) => getMyComments({ page: pageParam }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (!lastPage.result.last) {
				return lastPage.result.pageNumber + 1;
			}
			return undefined;
		},
		gcTime: 60 * 1000,
	});

	if (data?.pages?.length === 1 && data.pages[0].result.content.length === 0) {
		return <EmptyData category="댓글" />;
	}

	const flatComments = data?.pages.flatMap((page) => page.result.content) ?? [];

	return (
		<div className="flex flex-col w-full gap-5 px-6 py-5 bg-white desktop:rounded-[12px]">
			{isLoading && <MyCommentSkeleton />}
			{flatComments.map((comment, index) => (
				<Fragment key={comment.commentId}>
					<div className="w-full flex flex-col flex-wrap break-words gap-2 ">
						<span className="typo-label2 font-regular desktop:typo-body2-normal text-label-alternative">{comment.createdDate}</span>
						<span className="typo-body2-normal desktop:typo-body1-normal">{comment.content}</span>
						<div className="flex gap-1 items-center">
							<HeartIcon className="w-4 h-4 desktop:w-5 desktop:h-5" />
							<span className="typo-label1-normal desktop:typo-body1-normal text-[#AEB0B6]">{comment.likeCount}</span>
						</div>
						<Link href={CLIENT_NAVI_PATH.billDetail.getPath(comment.billId)} className="flex pl-3 gap-3 items-center">
							<TagIcon />
							<span className="typo-body1-normal font-bold">{comment.title}</span>
						</Link>
					</div>
					{index !== flatComments.length - 1 && <div className="h-px bg-line-normal w-full" />}
				</Fragment>
			))}

			<div className="flex items-center justify-center w-full">
				{isError && <ErrorIndicator retiralFn={fetchNextPage} />}
				{!isError && hasNextPage && <InfinityScrollSpinner isFetching={isFetching} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />}
			</div>
		</div>
	);
};

export default MyComment;
