import { UserCredential } from '../../api/user';
import StatusBadge from '@/shared/components/StatusBadge';

interface UserOAuthCardProps {
	credentials: UserCredential[];
}

const providerNames = {
	KAKAO: '카카오',
	GOOGLE: '구글',
};

const providerColors = {
	KAKAO: '#FEE500',
	GOOGLE: '#4285F4',
};

export default function UserOAuthCard({ credentials }: UserOAuthCardProps) {
	return (
		<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-6">
			<h2 className="typo-heading1 text-label-strong mb-6">OAuth 연동</h2>

			{credentials.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
					{credentials.map((credential, index) => (
						<div key={index} className="flex items-center justify-between p-4 bg-background-normal-alternative rounded-lg">
							<div className="flex items-center gap-4">
								<div
									className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-medium"
									style={{ backgroundColor: providerColors[credential.provider] }}
								>
									{credential.provider === 'KAKAO' ? 'K' : 'G'}
								</div>
								<div>
									<p className="typo-body1-medium text-label-strong">{providerNames[credential.provider]}</p>
									<p className="typo-body2-reading text-label-alternative truncate max-w-32" title={credential.providerUserId}>
										ID: {credential.providerUserId}
									</p>
								</div>
							</div>
							<StatusBadge status={credential.status} size="sm" />
						</div>
					))}
				</div>
			) : (
				<p className="typo-body1-reading text-label-alternative">연동된 OAuth 계정이 없습니다.</p>
			)}
		</div>
	);
}
