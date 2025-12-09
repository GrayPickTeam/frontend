import { toast } from 'react-hot-toast';
import CautionIcon from '../icon/Caution';
import NegativeIcon from '../icon/Negative';
import PositiveIcon from '../icon/Positive';

const TOAST_ID = 'single_custom_toast';

interface ToastHook {
	showSuccess: (message: string) => string;
	showError: (message: string) => string;
	showInfo: (message: string) => string;
}

const useToast = (): ToastHook => {
	const showCustomToast = (message: string, type: 'success' | 'error' | 'info') => {
		return toast.custom(() => <CustomToast message={message} type={type} />, {
			id: TOAST_ID,
			position: 'bottom-center',
			duration: 1500,
			removeDelay: 500,
		});
	};

	return {
		showSuccess: (message) => showCustomToast(message, 'success'),
		showError: (message) => showCustomToast(message, 'error'),
		showInfo: (message) => showCustomToast(message, 'info'),
	};
};

interface CustomToastProps {
	message: string;
	type: 'success' | 'error' | 'info';
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
	const icon = type === 'success' ? <PositiveIcon /> : type === 'error' ? <NegativeIcon /> : <CautionIcon />;
	return (
		<div className="flex items-center gap-[12px] w-[335px] px-[16px] py-[11px] mb-[60px] bg-[#818790] typo-body2-normal text-[var(--color-white)] rounded-xl select-none">
			{icon}
			<span className="px-[2px] py-[5px]">{message}</span>
		</div>
	);
};

export default useToast;
