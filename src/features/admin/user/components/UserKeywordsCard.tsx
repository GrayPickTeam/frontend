import { UserProfile } from '../../api/user';

interface UserKeywordsCardProps {
	profile: UserProfile;
}

export default function UserKeywordsCard({ profile }: UserKeywordsCardProps) {
	const keywords = [profile.keyword1, profile.keyword2, profile.keyword3, profile.keyword4, profile.keyword5].filter(Boolean);

	return (
		<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6">
			<h2 className="typo-heading1 text-label-strong mb-4">관심 키워드</h2>

			{keywords.length > 0 ? (
				<div className="flex flex-wrap gap-2">
					{keywords.map((keyword, index) => (
						<span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-main-normal text-white">
							{keyword}
						</span>
					))}
				</div>
			) : (
				<p className="typo-body1-reading text-label-alternative">설정된 관심 키워드가 없습니다.</p>
			)}
		</div>
	);
}
