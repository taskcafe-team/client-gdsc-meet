const isProduction = process.env.NODE_ENV === 'production'

export default {
	prefix: 'api',
	data: {
		access_token_header: 'x-api-token',
		key_store_access_token: 'access_token',

		base_url: isProduction
			? 'https://www.gdscmeet.live:5000'
			: 'http://localhost:5000',
		login_google_url: isProduction
			? 'https://www.gdscmeet.live:5000/auth/google/login'
			: 'http://localhost:5000/auth/google/login',
		webrtc_socket_url: isProduction
			? 'https://www.gdscmeet.live:7880'
			: 'http://localhost:7880',
	},
}
