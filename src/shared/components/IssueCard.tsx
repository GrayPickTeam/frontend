'use client';

import Image from 'next/image';
import { CommitteeName, COMMITTEES } from '../const/committee';
import TagLabel from './TagLabel';
import Link from 'next/link';
import { CLIENT_NAVI_PATH, MODAL_PATH } from '../const/url';
import { MouseEvent, useState, memo } from 'react';
import BookmarkIcon from '../icon/Bookmark';
import { toggleScrapped } from '../api/bill';
import { useRouter } from 'next/navigation';

export interface IssueCardProps {
	/**이슈 아이디 */
	billId: string;
	/** 카드 제목 */
	aiTitle: string;
	/** 소속 위원회 */
	committeeName: CommitteeName;
	/** 발의자 이름 */
	representativeName: string;
	/** 발의 날짜 (YYYY.MM.DD 형태) */
	proposeDate: string;
	/** 현재 상태 */
	billHistoryStatus: string;
	/** 조회수 */
	viewCount: number;
	/** 반응 수 */
	reactionCount: number;
	/** 댓글 수 */
	commentCount: number;
	/** 북마크 여부 */
	scraped: boolean;
}

const IssueCard = ({
	billId,
	aiTitle,
	committeeName,
	representativeName,
	proposeDate,
	billHistoryStatus,
	viewCount,
	reactionCount,
	commentCount,
	scraped,
}: IssueCardProps) => {
	const [isBookmarked, setIsBookmarked] = useState(scraped);
	const router = useRouter();
	const IconList = [
		{
			src: '/svgs/eye.svg',
			alt: '조회수',
			nums: viewCount,
		},
		{
			src: '/svgs/fire.svg',
			alt: '의견수',
			nums: reactionCount,
		},
		{
			src: '/svgs/comment.svg',
			alt: '댓글수',
			nums: commentCount,
		},
	] as const;

	const toggleBookmark = async (e: MouseEvent) => {
		e.stopPropagation();
		const res = await toggleScrapped(billId);
		switch (res.status) {
			case 'success':
				setIsBookmarked((prev) => !prev);
				break;
			case 'relogin':
				router.push(MODAL_PATH.login, { scroll: false });
				break;
			default:
				alert('서버 에러가 발생했습니다.');
		}
	};

	const getValidCommitteeName = (name: CommitteeName | null): CommitteeName => {
		return name && name in COMMITTEES ? name : '기타';
	};

	const modifyRepresentativeName = (name: string) => {
		if (name.length < 1) {
			return '미등록';
		}

		const idx = name.indexOf('의원');
		if (idx !== -1 && name.length > 4) {
			return name.slice(0, idx); // "의원" 이라는 글자 있고 길이가 길면(4보다 큼) 앞까지만 반환
		}
		return name;
	};

	return (
		<article className="flex flex-col rounded-[12px] px-5 pt-5 pb-3 gap-2.5 bg-bg-white desktop:gap-3 desktop:pl-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ">
			<Link href={CLIENT_NAVI_PATH.billDetail.getPath(billId)}>
				<header className="flex justify-between gap-2 h-21">
					<div className="flex flex-1 flex-col gap-1.5">
						<h3 className="typo-heading1 font-bold text-ellipsis line-clamp-2" title={aiTitle}>
							{aiTitle}
						</h3>
						<div className="flex gap-2.5 typo-label2 desktop:typo-label1-normal text-label-alternative font-regular">
							<div>{modifyRepresentativeName(representativeName)}</div>
							<div>{proposeDate}</div>
						</div>
					</div>
					<div className="flex items-center justify-center w-[52px] h-[52px] rounded-full bg-bg-gray text-2xl desktop:text-[32px]">
						{COMMITTEES[getValidCommitteeName(committeeName)].emoji}
					</div>
				</header>
			</Link>
			<section className="flex gap-2">
				<TagLabel type="status" text={billHistoryStatus}></TagLabel>
				<TagLabel type="committee" text={getValidCommitteeName(committeeName)}></TagLabel>
			</section>
			<footer className="flex justify-between">
				<div className="flex gap-2">
					{IconList.map((icon) => (
						<IconWithCount key={icon.src} src={icon.src} alt={icon.alt} nums={icon.nums} />
					))}
				</div>
				<button className="py-0.5 my-1" onClick={(e: MouseEvent) => toggleBookmark(e)}>
					<BookmarkIcon isChecked={isBookmarked} />
				</button>
			</footer>
		</article>
	);
};

export default IssueCard;

export const MemoizedIssueCard = memo(IssueCard);

export const IconWithCount = ({ src, alt, nums }: { src: string; alt: string; nums: number }) => {
	return (
		<div className="flex items-center gap-1">
			<Image src={src} alt={alt} width={14} height={14} draggable={false} />
			<span className="typo-label2 font-regular text-label-alternative opacity-[61%]" aria-label={alt}>
				{nums}
			</span>
		</div>
	);
};
