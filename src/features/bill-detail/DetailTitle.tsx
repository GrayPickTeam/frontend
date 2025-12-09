import { COMMITTEES } from '@/shared/const/committee';
import { BillDetalProps } from './api/server';
import BookmarkBtn from './BookmarkBtn';

const DetailTitle = ({
	id,
	billAiTitle,
	representativeName,
	proposeDate,
	committeeName,
	scrapped,
}: Pick<BillDetalProps, 'id' | 'billAiTitle' | 'representativeName' | 'proposeDate' | 'committeeName' | 'scrapped'>) => {
	return (
		<div className="flex flex-col w-full gap-5">
			<header className="flex flex-col w-full gap-6">
				<h1 className="typo-title2 font-bold text-label-normal desktop:typo-title1">{billAiTitle}</h1>
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-bg-gray text-[24px] desktop:w-[52px] desktop:h-[52px] desktop:text-[32px]">
						{COMMITTEES[committeeName]?.emoji ?? COMMITTEES['기타'].emoji}
					</div>
					<div className="flex flex-col flex-1 font-regular text-label-alternative">
						<div className="flex typo-label1-normal gap-1">
							<span className="text-label-normal font-medium">{representativeName}</span>
							<span>•</span>
							<span>{proposeDate.replace(/-/g, '.')}</span>
						</div>
						<span className="typo-caption1">{committeeName}</span>
					</div>
					<BookmarkBtn id={id} isScrapped={scrapped} />
				</div>
			</header>
			<div className="border border-line-neutral w-full" />
		</div>
	);
};

export default DetailTitle;
