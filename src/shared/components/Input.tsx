import React from 'react';
import InfoCircle from '../icon/InfoCircle';

// 기본 InputProps 타입 정의
export type BaseInputProps = {
	/** input의 고유 ID (웹접근성) */
	id: string;
	/** input name */
	name?: string;
	/** 입력 값 */
	value: string;
	/** 입력 값 변경 시 호출되는 콜백 */
	onChange: (value: string) => void;
	/** 플레이스홀더 텍스트 */
	placeholder?: string;
	/** 직접 입력하는 에러 메시지 (에러 없을 시에는 null 또는 undefined) */
	errMsg?: string | null;
	/** 최대 글자 수 */
	maxLength?: number;
	/** 사용자 정의 클래스 */
	className?: string;
	/** 비활성화 여부 */
	isDisabled?: boolean;
};

// 확장 속성을 명시적으로 정의
export interface InputExtensionProps {
	/** 성공 메시지 (성공 없을 시에는 null 또는 undefined) */
	successMsg?: string | null;
}

// 모든 HTML input 속성을 포함하는 타입
export type InputProps<T extends Record<string, unknown> = Record<string, unknown>> = BaseInputProps &
	InputExtensionProps &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof (BaseInputProps & InputExtensionProps)> &
	T;

export default function Input<T extends Record<string, unknown> = Record<string, unknown>>({
	id,
	name,
	value,
	onChange,
	placeholder = '',
	errMsg,
	successMsg, // 명시적으로 분리
	maxLength,
	className = '',
	isDisabled = false,
	...rest // 나머지 표준 HTML 속성만 포함
}: InputProps<T>) {
	const errorId = id ? `${id}-error` : undefined;
	const successId = id && successMsg ? `${id}-success` : undefined;

	const getBorderClass = () => {
		if (errMsg) return 'border-status-destructive focus:border-status-destructive';
		if (successMsg) return 'border-status-success focus:border-status-success';
		return 'border-line-normal-normal focus:border-black';
	};

	return (
		<div className="w-full">
			<input
				id={id}
				name={name}
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				maxLength={maxLength}
				aria-invalid={!!errMsg}
				aria-describedby={errMsg ? errorId : successMsg ? successId : undefined}
				disabled={isDisabled}
				className={`w-full h-10 px-4 py-3 rounded-[12px] typo-body1-normal font-regular text-label-normal placeholder:text-label-assistive border ${getBorderClass()} 
                focus:outline-none disabled:bg-interaction-disable ${className}`}
				{...rest} // 커스텀 속성이 제거된 표준 HTML 속성만 전달
			/>

			{errMsg && (
				<span id={errorId} className="flex p-1 gap-1 items-center text-status-destructive">
					<InfoCircle className="text-status-destructive" />
					{errMsg}
				</span>
			)}
			{!errMsg && successMsg && (
				<span id={successId} className="flex p-1 gap-1 items-center text-status-success">
					{successMsg}
				</span>
			)}
		</div>
	);
}
