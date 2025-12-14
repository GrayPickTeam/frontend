'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyReactions } from './api/server';
import { Fragment } from 'react';
import { groupReactionByDate } from './util';
import { BillReaction, REACTION_EMOJI } from '../bill-detail/const';
import TagIcon from '@/shared/icon/Tag';
import Link from 'next/link';
import { CLIENT_NAVI_PATH } from '@/shared/const/url';
import EmptyData from './EmptyData';
import { QUERY_KEYS } from '@/shared/const/reactQuery';
import InfinityScrollSpinner from '@/shared/components/InfinityScrollSpinner';
import ErrorIndicator from '@/shared/components/ErrorIndicator';
import MyOpinionSkeleton from './skeletons/MyOpinion.Skeleton';

const MyOpinion = () => {
	const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError } = useInfiniteQuery({
		queryKey: [QUERY_KEYS.myOpinions],
		queryFn: ({ pageParam }) => getMyReactions({ page: pageParam }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (!lastPage.result.last) {
				return lastPage.result.pageNumber + 1;
			}
			return undefined;
		},
		gcTime: 60 * 1000,
	});

	const COMMENT_BY_REACTION: Record<BillReaction, string> = {
		좋아요: '좋아요를 눌렀어요! 이 법안에 힘을 보탰습니다.',
		흥미진진: '흥미롭게 보셨군요! 이슈의 핵심을 짚으셨네요.',
		개선필요: '개선이 필요하다고 느끼셨군요. 소중한 의견입니다.',
		아쉬워요: '아쉬우셨군요. 이런 목소리도 꼭 필요합니다.',
	} as const;

	if (data?.pages?.length === 1 && data.pages[0].result.content.length === 0) {
		return <EmptyData category="의견" />;
	}

	const dataGroupedByDate = groupReactionByDate(data);

	return (
		<div className="flex flex-col w-full gap-5 px-6 py-5 bg-white desktop:rounded-[12px] ">
			{isLoading && <MyOpinionSkeleton />}

			{dataGroupedByDate.map(({ date, items }) => (
				<div key={date} className="flex flex-col w-full gap-5 ">
					<span className="font-regular typo-label2 desktop:typo-body2-normal text-[#AEB0B6]">{date}</span>
					{items.map((item, index) => (
						<Fragment key={item.billId}>
							<Link href={CLIENT_NAVI_PATH.billDetail.getPath(item.billId)} className="flex w-full gap-3">
								<div className="flex items-center justify-center w-10 h-10  bg-bg-gray rounded-full text-[27px] desktop:text-[35px] desktop:w-13 desktop:h-13">
									{REACTION_EMOJI[item.reactionType]}
								</div>
								<div className="flex flex-col w-full gap-2">
									<span className="typo-body1-normal font-bold text-label-normal desktop:typo-headline2">
										{COMMENT_BY_REACTION[item.reactionType]}
									</span>
									<span className="flex pl-3 gap-3 typo-body1-normal font-regular desktop:typo-headline2 text-label-alternative">
										<TagIcon className="shrink-0 text-label-alternative w-5 h-5" />
										{item.aiTitle}
									</span>
								</div>
							</Link>
							{index !== items.length - 1 && <div className="self-end h-px bg-line-normal-normal w-[calc(100%-56px)]" />}
						</Fragment>
					))}
				</div>
			))}

			<div className="flex items-center justify-center w-full">
				{isError && <ErrorIndicator retiralFn={fetchNextPage} />}
				{!isError && hasNextPage && <InfinityScrollSpinner isFetching={isFetching} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />}
			</div>
		</div>
	);
};

export default MyOpinion;
