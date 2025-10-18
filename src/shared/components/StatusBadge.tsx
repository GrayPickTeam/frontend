import { cn } from '@/shared/util';

interface StatusBadgeProps {
	status: 'ACTIVE' | 'BLOCKED' | 'INACTIVE' | 'PENDING' | 'APPROVED' | 'REJECTED';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

const statusConfig = {
	ACTIVE: {
		label: '활성',
		className: 'bg-status-positive text-white',
	},
	BLOCKED: {
		label: '차단',
		className: 'bg-status-negative text-white',
	},
	INACTIVE: {
		label: '비활성',
		className: 'bg-label-alternative text-label-normal',
	},
	PENDING: {
		label: '대기중',
		className: 'bg-status-warning text-white',
	},
	APPROVED: {
		label: '승인',
		className: 'bg-status-positive text-white',
	},
	REJECTED: {
		label: '거부',
		className: 'bg-status-negative text-white',
	},
};

const sizeConfig = {
	sm: 'px-2 py-1 text-xs',
	md: 'px-3 py-1.5 text-sm',
	lg: 'px-4 py-2 text-base',
};

export default function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
	const config = statusConfig[status];

	return (
		<span className={cn('inline-flex items-center rounded-full font-medium', config.className, sizeConfig[size], className)}>{config.label}</span>
	);
}
