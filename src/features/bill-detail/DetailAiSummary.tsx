import MagicWandIcon from '@/shared/icon/MagicWand';
import { BillDetalProps } from './api/server';

const DetailAiSummary = ({ billAiSummary }: Pick<BillDetalProps, 'billAiSummary'>) => {
	return (
		<section className="flex flex-col w-full typo-body1-medium text-label-neutral font-medium px-[20px] py-[16px] gap-1 rounded-[12px] bg-[var(--color-violet-99)] desktop:px-[24px]">
			<div className="flex items-center typo-caption1 font-bold text-accent-bg-violet gap-1">
				<MagicWandIcon />
				{'AI 한줄 요약'}
			</div>
			{billAiSummary}
		</section>
	);
};

export default DetailAiSummary;
