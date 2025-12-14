import Link from 'next/link';
import { Keyword } from '@/shared/const/committee';
import RightIcon from '@/shared/icon/Right';

interface ContentHeaderProps {
	title: string;
	link: string;
	keywordList?: Keyword[] | null;
	isLoginRequired?: boolean;
}

const ContentHeader = ({ title, link, keywordList, isLoginRequired }: ContentHeaderProps) => {
	return (
		<div className="flex justify-center  desktop:justify-between items-center w-full desktop:gap-[10px] p-0">
			<h2 className="flex flex-col items-center desktop:flex-row typo-heading1 desktop:typo-title2 font-bold gap-2 text-center desktop:flex-wrap desktop:flex-1">
				{title}
				{keywordList && (
					<span className="flex gap-2 text-primary-main-normal flex-wrap max-desktop:justify-center">
						{keywordList && keywordList.map((keyword) => <span key={keyword}>#{keyword}</span>)}
					</span>
				)}

				{isLoginRequired && (
					<span className="typo-body1-normal font-regular desktop:typo-title2 desktop:font-bold text-label-alternative opacity-[50%]">
						#로그인하고 관심 키워드를 골라보세요
					</span>
				)}
			</h2>
			<Link
				href={link}
				className="hidden  desktop:flex cursor-pointer typo-body1-normal text-label-alternative opacity-[61%] hover:opacity-100 font-bold items-center"
			>
				더보기 &nbsp; <RightIcon width={8} height={14} />
			</Link>
		</div>
	);
};

export default ContentHeader;
