'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SolidBtn } from './SolidBtn';

interface ConfirmDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string | ReactNode;
	confirmText?: string;
	cancelText?: string;
	variant?: 'danger' | 'warning' | 'default';
	isLoading?: boolean;
}

export default function ConfirmDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = '확인',
	cancelText = '취소',
	variant = 'default',
	isLoading = false,
}: ConfirmDialogProps) {
	if (!isOpen) return null;

	const modalContent = (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/52" onClick={onClose}>
			<div className="w-full max-w-md mx-auto bg-white rounded-lg p-6 m-4" onClick={(e) => e.stopPropagation()}>
				<h2 className="typo-heading1 text-label-strong mb-4">{title}</h2>

				<div className="typo-body1-reading text-label-normal mb-6">{message}</div>

				<div className="flex gap-3 justify-end">
					<SolidBtn primary={false} size="medium" label={cancelText} onClick={onClose} disabled={isLoading} />
					<SolidBtn
						primary={true}
						size="medium"
						label={isLoading ? '처리중...' : confirmText}
						onClick={onConfirm}
						disabled={isLoading}
						className={variant === 'danger' ? '!bg-status-destructive' : ''}
					/>
				</div>
			</div>
		</div>
	);

	// Portal을 사용하여 document.body에 렌더링
	return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
