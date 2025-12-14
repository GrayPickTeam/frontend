'use client';

import { useState } from 'react';
import EditIcon from '@/shared/icon/Edit';
import { uploadProfileImg } from './api/server';

interface ProfileImgProps {
	img: string;
	nickname: string;
}

const ProfileImg = ({ img, nickname }: ProfileImgProps) => {
	const [preview, setPreview] = useState<string>(img);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		let tempPreview: string | null = null;

		const reader = new FileReader();
		const readPromise = new Promise<void>((resolve) => {
			reader.onloadend = () => {
				tempPreview = reader.result as string;
				resolve();
			};
		});
		reader.readAsDataURL(file);
		await readPromise;

		// 업로드 요청
		const formData = new FormData();
		formData.append('profileImage', file);

		const result = await uploadProfileImg(formData);

		switch (result.status) {
			case 'success':
				if (tempPreview) {
					setPreview(tempPreview);
				}
				break;
			case 'relogin':
				alert('로그인이 필요합니다.');
				break;
			default:
				alert('업로드 실패. 다시 시도해주세요.');
				break;
		}
	};

	return (
		<figure className="relative w-[100px] h-[100px]">
			<label htmlFor="file-upload" className="w-full h-full block cursor-pointer">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={preview}
					alt="프로필 이미지"
					className="w-[100px] h-[100px] rounded-full object-cover object-center border-1 border-line-normal-normal"
					draggable={false}
					sizes="100vw"
					loading="eager"
				/>

				<div className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full border border-line-normal-normal flex items-center justify-center shadow-sm">
					<EditIcon />
				</div>
			</label>

			<input id="file-upload" type="file" accept="image/jpeg, image/png" onChange={handleChange} className="hidden" />

			<figcaption className="sr-only">{nickname}님의 프로필 사진</figcaption>
		</figure>
	);
};

export default ProfileImg;
