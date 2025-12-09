import { Metadata } from 'next';
import { getBillDetail, getBillReactions } from '@/features/bill-detail/api/server';
import DetailContent from '@/features/bill-detail/DetailContent';
import DetailAiSummary from '@/features/bill-detail/DetailAiSummary';
import DetailTitle from '@/features/bill-detail/DetailTitle';
import ScrollUpBtn from '@/shared/components/ScrollUpBtn';
import DetailProcess from '@/features/bill-detail/DetailProcess';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/shared/const/cookie';
import BackBtn from '@/shared/components/BackBtn';
import DetailClientFeatures from '@/features/bill-detail/DetailClientFeatures';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	title: '법안 상세페이지',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const [billDetail, billReactions] = await Promise.all([getBillDetail(id), getBillReactions(id)]);
	const cookieStore = await cookies();
	const nickname = cookieStore.get(COOKIE_NAME.auth.nickname)?.value;
	const profileImg = cookieStore.get(COOKIE_NAME.auth.img)?.value;

	return (
		<div className="flex flex-col items-center p-5 pb-[100px]  desktop:pt-12 desktop:pb-[160px] w-full">
			<article className="flex flex-col items-center w-full max-w-desktop gap-6 desktop:gap-9">
				<BackBtn />
				<DetailTitle {...billDetail} />
				<div className="border border-line-neutral	w-full" />
				<DetailAiSummary {...billDetail} />
				<DetailContent detail={billDetail.billSummary || ''} />
				<DetailProcess history={billDetail.history} />
				<DetailClientFeatures id={id} nickname={nickname} profileImg={profileImg} billDetail={billDetail} billReactions={billReactions.result} />
				<Toaster />
			</article>
			<ScrollUpBtn />
		</div>
	);
}
