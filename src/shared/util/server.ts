export function parseJwt(token: string) {
	try {
		const base64Payload = token.split('.')[1];
		const jsonPayload = Buffer.from(base64Payload, 'base64').toString('utf-8');
		return JSON.parse(jsonPayload);
	} catch {
		return null;
	}
}
