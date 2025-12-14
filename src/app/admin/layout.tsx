import AdminBar from '@/features/layout/AdminBar';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<AdminBar />
			<main className="flex flex-col flex-1 items-center w-full">{children}</main>
		</>
	);
}
