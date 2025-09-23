'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Image from 'next/image';
import { SolidBtn } from '@/shared/components/SolidBtn';
import Footer from '@/features/layout/Footer';
import './globals.css';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html>
			<body className="min-h-screen">
				<main className="relaitve flex flex-col items-center w-full">
					<div className="mx-auto flex flex-col items-center px-6 py-8 gap-6 desktop:py-12 h-[calc(100vh-120px)] desktop:h-[calc(100vh-96px)]">
						<div className="w-[185px] desktop:w-[300px]">
							<Image
								src="/images/error.png"
								alt="error-found"
								width={300}
								height={415}
								draggable={false}
								style={{
									width: '100%',
									height: 'auto',
								}}
							/>
						</div>

						<div className="flex flex-col items-center gap-3">
							<h2 className="typo-title2 text-label-normal font-bold desktop:typo-display1">Something Went Wrong</h2>
							<p className="text-center flex-wrap break-words typo-body1-normal font-regular desktop:typo-heading1">
								요청을 처리하는 중 문제가 발생했습니다.
								<br className="desktop:hidden" /> 잠시 후 다시 시도해 주시거나, 지속될 경우 이메일로 문의해 주세요.
							</p>
						</div>
						<SolidBtn label={'재시도'} onClick={() => reset()} />
					</div>
					<Footer />
				</main>
			</body>
		</html>
	);
}
