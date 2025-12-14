import { ReactNode } from 'react';
import { cn } from '@/shared/util';

interface EmptyStateProps {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
	className?: string;
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
	return (
		<div className={cn('flex flex-col items-center justify-center py-12 px-4', className)}>
			{icon && <div className="mb-4 text-label-alternative">{icon}</div>}

			<h3 className="typo-heading2 text-label-strong mb-2 text-center">{title}</h3>

			{description && <p className="typo-body1-reading text-label-normal text-center mb-6 max-w-md">{description}</p>}

			{action && action}
		</div>
	);
}
