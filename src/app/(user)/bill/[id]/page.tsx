import { Metadata } from 'next';
import { getBillDetail, getBillReactions } from '@/features/bill-detail/api/server';
import DetailCommentList from '@/features/bill-detail/DetailCommentList';
import DetailContent from '@/features/bill-detail/DetailContent';
import DetailInfo from '@/features/bill-detail/DetailInfo';
import DetailOpinion from '@/features/bill-detail/DetailOpinion';
import DetailTitle from '@/features/bill-detail/DetailTitle';
import ScrollUpBtn from '@/shared/components/ScrollUpBtn';
import DetailProcess from '@/features/bill-detail/DetailProcess';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/shared/const/cookie';
import BackBtn from '@/shared/components/BackBtn';

export const metadata: Metadata = {
	title: '법안 상세페이지',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const [billDetail, billReactions] = await Promise.all([getBillDetail(id), getBillReactions(id)]);
	const nickname = (await cookies()).get(COOKIE_NAME.auth.nickname)?.value;

	return (
		<div className="flex flex-col items-center p-5 pb-[100px]  desktop:pt-12 desktop:pb-[160px] w-full">
			<article className="flex flex-col items-center w-full max-w-desktop gap-6 desktop:gap-9">
				<BackBtn />
				<DetailTitle {...billDetail} />
				<div className="border border-line-neutral	w-full" />
				<DetailInfo {...billDetail} />
				<DetailContent detail={billDetail.billSummary || ''} />
				<DetailProcess history={billDetail.history} />
				<DetailOpinion id={id} isScrapped={billDetail.scrapped} {...billReactions.result} />
				<DetailCommentList billId={id} nickname={nickname || ''} />
			</article>
			<ScrollUpBtn />
		</div>
	);
}
