import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import GoogleAnalytics from '@/shared/script/GoogleAnalytics';
import MicrosoftClarity from '@/shared/script/MicrosoftClarity';
import Providers from './Providers';
import JsonLD from '@/shared/script/JsonLD';
import { ReactScan } from '@/shared/script/ReactScan';

export const metadata: Metadata = {
	title: {
		template: '%s | 그레이픽',
		default: '그레이픽',
	},
	description: '3초면 끝. 당신의 일상에 딱, 바로 이 픽!',
	openGraph: {
		title: '그레이픽',
		description: '3초면 끝. 당신의 일상에 딱, 바로 이 픽!',
		images: 'https://cdn.jsdelivr.net/gh/ZeroTeamTwo/frontend/public/images/og-image.png',
		locale: 'ko_KR',
		url: 'https://graypick.co.kr/',
		type: 'website',
		siteName: '그레이픽',
	},
};

const pretendard = localFont({
	src: [
		{
			path: '../../public/fonts/Pretendard-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Pretendard-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Pretendard-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<head>
				<GoogleAnalytics gaId="G-64MDTYBYT3" />
				<MicrosoftClarity clId="rslbkldy5n" />
				<JsonLD />
			</head>
			<ReactScan />

			<body className={`${pretendard.className} antialiased flex flex-col items-center w-full  min-h-screen mx-auto`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
