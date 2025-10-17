interface BackIconProps {
	className?: string;
	width?: number | string;
	height?: number | string;
}

const BackIcon = ({ className = 'text-[#37383C]/61', width = 14, height = 14 }: BackIconProps) => {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.67135 6.62883C1.46632 6.83386 1.46632 7.16627 1.67135 7.3713L5.75466 11.4546C5.95969 11.6597 6.2921 11.6597 6.49712 11.4546C6.70215 11.2496 6.70215 10.9172 6.49712 10.7122L3.31003 7.52506L11.9592 7.52506C12.2492 7.52506 12.4842 7.29001 12.4842 7.00006C12.4842 6.71012 12.2492 6.47506 11.9592 6.47506L3.31003 6.47506L6.49712 3.28796C6.70215 3.08294 6.70215 2.75052 6.49712 2.5455C6.2921 2.34047 5.95969 2.34048 5.75466 2.5455L1.67135 6.62883Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default BackIcon;
