import Image from 'next/image';
import { aggroFont } from '@/shared/const/font';

const Banner = () => {
	return (
		<div className="relative w-full flex items-end justify-center  h-[160px] overflow-hidden max-w-maxw mx-auto desktop:rounded-[20px] desktop:my-10 desktop:h-[400px] bg-primary-sub-normal ">
			<div className="flex items-center justify-between desktop:w-[950px] gap-3 desktop:gap-8">
				<div className="relative w-[196px] desktop:w-[492px] aspect-[492/400]">
					<Image
						src="/images/banner-char.png"
						alt="banner-char"
						draggable={false}
						fill
						sizes="(min-width: 960px) 492px, 196px"
						priority
						className="object-contain"
					/>
				</div>
				<div className="flex flex-col items-baseline w-[232px] desktop:w-[469px] pt-3 gap-1.5 desktop:gap-3 desktop:pt-[30px] ">
					<h1 className={`${aggroFont.className} font-bold text-[24px] desktop:text-[56px]`}>
						<span className="text-white text-shadow">당신의 일상에 딱!</span>
						<br />
						<span className="text-primary-main-normal text-shadow">바로, 이 픽!</span>
					</h1>
					<div className="flex items-center gap-1 desktop:gap-2 px-2 desktop:px-4 py-1 desktop:py-2 rounded-[6px] desktop:rounded-[12px] typo-caption2 font-bold desktop:typo-headline1 text-primary-sub-heavy bg-white">
						<span>발의 법안</span>
						<span>40,000 +</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
