import AdminBar from '@/features/layout/AdminBar';

export default function Layout({
	children,
	overlay,
}: Readonly<{
	children: React.ReactNode;
	overlay: React.ReactNode;
}>) {
	return (
		<>
			<AdminBar />
			<main className="flex flex-col flex-1 items-center w-full">{children}</main>
			{overlay}
		</>
	);
}
