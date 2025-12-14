import { Keyword } from '@/shared/const/committee';

const MyKeyword = ({ label }: { label: Keyword }) => {
	return <li className="inline-block px-3 py-1.5 border border-line-normal-normal rounded-[20px] typo-caption1 text-label-neutral bg">{label}</li>;
};

export default MyKeyword;
