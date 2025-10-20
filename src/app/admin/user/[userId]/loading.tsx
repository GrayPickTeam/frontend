export default function Loading() {
	return (
		<div className="space-y-6">
			{/* Back Button */}
			<div className="flex items-center gap-2 px-4 py-2">
				<div className="w-4 h-4 bg-background-normal-alternative rounded animate-pulse" />
				<div className="w-24 h-4 bg-background-normal-alternative rounded animate-pulse" />
			</div>

			{/* Title */}
			<div className="flex items-center justify-between">
				<div className="h-8 w-48 bg-background-normal-alternative rounded animate-pulse" />
			</div>

			{/* Loading Skeletons */}
			<div className="space-y-6">
				<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6 animate-pulse">
					<div className="h-6 w-24 bg-background-normal-alternative rounded mb-6"></div>
					<div className="flex gap-6">
						<div className="w-24 h-24 md:w-32 md:h-32 bg-background-normal-alternative rounded-lg"></div>
						<div className="flex-1 space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{Array.from({ length: 6 }).map((_, i) => (
									<div key={i} className="space-y-2">
										<div className="h-4 w-16 bg-background-normal-alternative rounded"></div>
										<div className="h-5 w-32 bg-background-normal-alternative rounded"></div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6 animate-pulse">
					<div className="h-6 w-24 bg-background-normal-alternative rounded mb-4"></div>
					<div className="flex gap-2">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="h-8 w-16 bg-background-normal-alternative rounded-full"></div>
						))}
					</div>
				</div>

				<div className="bg-background-normal-normal border border-line-normal-normal rounded-lg p-4 md:p-6 animate-pulse">
					<div className="h-6 w-24 bg-background-normal-alternative rounded mb-4"></div>
					<div className="space-y-2">
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i} className="h-16 bg-background-normal-alternative rounded"></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
