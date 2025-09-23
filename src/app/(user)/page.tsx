import AlertLogout from '@/features/home/AlertLogout';
import { getPopularBills } from '@/features/home/api';
import Banner from '@/features/home/Banner';
import Content from '@/features/home/Content';
import ContentHeader from '@/features/home/ContentHeader';
import RecommendBills from '@/features/home/RecommendBills';
import Survey from '@/features/home/Survey';

export default async function Home() {
	const poppularBills = await getPopularBills();

	const link = '/bill?order=조회순';
	return (
		<>
			<Survey />
			<Banner />
			<div className="w-full flex flex-col flex-1 gap-16 desktop:gap-12 items-center px-9 py-12 bg-bg-gray ">
				<AlertLogout />
				<RecommendBills />
				<Content data={poppularBills} link={link}>
					<ContentHeader title="지금 핫이슈는?" link={link} />
				</Content>
			</div>
		</>
	);
}
