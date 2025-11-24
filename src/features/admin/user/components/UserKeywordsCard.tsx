import { UserProfile } from '../../api/user';

interface UserKeywordsCardProps {
	profile: UserProfile;
}

export default function UserKeywordsCard({ profile }: UserKeywordsCardProps) {
	const keywords = [profile.keyword1, profile.keyword2, profile.keyword3, profile.keyword4, profile.keyword5].filter(Boolean);

	return (
		<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-6">
			<h2 className="typo-heading1 text-label-strong mb-6">관심 키워드</h2>

			{keywords.length > 0 ? (
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3">
					{keywords.map((keyword, index) => (
						<div
							key={index}
							className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-primary-main-normal text-white"
						>
							{keyword}
						</div>
					))}
				</div>
			) : (
				<p className="typo-body1-reading text-label-alternative">설정된 관심 키워드가 없습니다.</p>
			)}
		</div>
	);
}
