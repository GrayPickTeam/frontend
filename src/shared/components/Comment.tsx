'use client';

import Image from 'next/image';
import HeartIcon from '../icon/Heart';
import { useEffect, useRef, useState } from 'react';

export interface CommentResponse {
	/** 댓글 고유 ID (map의 key 등으로 사용) */
	commentId: number;
	/** 작성자 프로필 이미지 URL */
	profileImage: string;
	/** 작성자 닉네임 */
	nickname: string;
	/** 작성일자  */
	daysAgo: string; // 오늘 ,~~일전
	/** 댓글이 수정되었는지 여부 */
	isEdited: boolean;
	/** 댓글 본문 내용 */
	content: string;
	/** 좋아요 수 */
	likeCount: number;
	/** 현재 사용자가 좋아요를 눌렀는지 여부 */
	isLiked: boolean;
	/** 본인이 작성자인지*/
}

export interface CommentType extends CommentResponse {
	/** 본인이 작성자인지*/
	isWriter: boolean;
	/** 댓글 수정 함수 */
	editFn: (newContent: string) => void;
	/** 댓글 삭제 함수 */
	deleteFn: () => void;
	/** 댓글 신고 함수 */
	reportFn: () => void;
	/** 댓글 좋아요 함수 */
	likeFn: () => void;
}

/**
 * 개별 댓글 컴퍼넌트
 *  시맨틱한 태그 사용을 위해 li태그 사용. 배열 래퍼 하위에서 map 돌려야 합니다.
 */
const Comment = ({
	profileImage,
	nickname,
	daysAgo,
	isEdited,
	content,
	likeCount,
	isLiked,
	isWriter,
	deleteFn,
	editFn,
	likeFn,
	reportFn,
}: CommentType) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [editedContent, setEditedContent] = useState(content);

	const handleDelete = () => {
		const confirmed = window.confirm('정말 댓글을 삭제하시겠습니까?');
		if (confirmed) {
			deleteFn();
		}
	};

	const handleEdit = () => {
		editFn(editedContent);
		setIsEditMode(false);
	};

	return (
		<li className="flex w-full pr-1 pb-2 gap-3 desktop:pr-0 desktop:gap-4.5">
			<Image
				src={profileImage}
				alt="프로필 이미지"
				width={48}
				height={48}
				className="w-[32px] h-[32px] desktop:w-[48px] desktop:h-[48px] rounded-full object-cover object-center border-1 border-line-normal"
				draggable={false}
				sizes="100vw"
				priority
			/>
			<div className="flex flex-col flex-1 gap-2">
				<div>
					<div className="typo-body2-normal font-bold text-label-normal desktop:typo-body1-normal">{nickname}</div>
					{!isEditMode && (
						<div className="typo-label2 font-regular text-[#aeb0b6] desktop:typo-body2-normal">
							{daysAgo} {isEdited && '(수정됨)'}
						</div>
					)}
				</div>
				{isEditMode ? (
					<textarea
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
						placeholder="이 법안에 대한 의견을 공유해주세요."
						className={`w-full h-35 px-4 py-3 rounded-[12px] typo-body1-reading font-regular text-label-normal placeholder:text-label-assistive border border-line-normal focus:outline-none focus:border-black disabled:bg-interaction-disable resize-none`}
						style={{
							scrollbarWidth: 'none',
							msOverflowStyle: 'none',
						}}
					/>
				) : (
					<CommentContent content={content} />
				)}

				<div className="flex w-full justify-between">
					<button
						onClick={likeFn}
						className={`flex items-center typo-label1-normal font-regular ${isLiked ? 'text-[var(--color-red-60)]' : 'text-[#aeb0b6]'} gap-1`}
					>
						<HeartIcon isLiked={isLiked} className="h-4 w-4 desktop:w-5 desktop:h-5" /> {likeCount}
					</button>
					<div className="flex typo-caption1 font-regular text-[#aeb0b6] gap-2 desktop:typo-body2-normal">
						{isWriter ? (
							isEditMode ? (
								<>
									<button onClick={() => setIsEditMode(false)} className="hover:opacity-80">
										취소
									</button>
									<button
										onClick={handleEdit}
										disabled={editedContent === ''}
										className="text-primary-main-heavy hover:opacity-80 disabled:text-label-disable"
									>
										수정완료
									</button>
								</>
							) : (
								<>
									<button onClick={() => setIsEditMode(true)} className="hover:opacity-80">
										수정하기
									</button>
									<button onClick={handleDelete} className="hover:opacity-80">
										삭제하기
									</button>
								</>
							)
						) : (
							<button onClick={reportFn} className="hover:opacity-80">
								신고하기
							</button>
						)}
					</div>
				</div>
			</div>
		</li>
	);
};

export default Comment;

const CommentContent = ({ content }: { content: string }) => {
	const [showAll, setShowAll] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			// scrollHeight > clientHeight → 줄 넘침
			setIsOverflowing(contentRef.current.scrollHeight > contentRef.current.clientHeight);
		}
	}, [content]);

	return (
		<div className="typo-body2-normal desktop:typo-body1-normal font-regular">
			<div
				ref={contentRef}
				className={`break-words whitespace-pre-wrap overflow-hidden   text-label-normal transition-all`}
				style={{
					display: '-webkit-box',
					WebkitBoxOrient: 'vertical',
					WebkitLineClamp: showAll ? 'unset' : 4,
				}}
			>
				{content}
			</div>
			{isOverflowing && (
				<button
					onClick={() => setShowAll((prev) => !prev)}
					className="text-label-assistive hover:text-label-alternative focus:outline-none focus:text-label-alternative"
				>
					{showAll ? '간단히 보기' : '더보기'}
				</button>
			)}
		</div>
	);
};
