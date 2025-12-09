'use client';

import { useRef } from 'react';
import { BillDetalProps, ReactionCounts } from './api/server';
import DetailBottomActionBar from './DetailBottomActionBar';
import DetailCommentList from './DetailCommentList';
import DetailOpinion from './DetailOpinion';

interface DetailClientFeaturesProps {
	id: string;
	nickname: string | undefined;
	profileImg: string | undefined;
	billDetail: BillDetalProps;
	billReactions: ReactionCounts;
}

function DetailClientFeatures({ id, nickname, profileImg, billDetail, billReactions }: DetailClientFeaturesProps) {
	const opinionRef = useRef(null);
	const commentRef = useRef(null);

	return (
		<>
			<DetailBottomActionBar {...billDetail} opinionRef={opinionRef} commentRef={commentRef} />
			<DetailOpinion ref={opinionRef} id={id} profileImg={profileImg} billReactions={billReactions} />
			<div className="border border-line-neutral w-full" />
			<DetailCommentList ref={commentRef} billId={id} nickname={nickname || ''} />
		</>
	);
}

export default DetailClientFeatures;
