export default class RouterPath {
	static readonly BASE_URL = '/'

	static readonly AUTH = `auth`

	static readonly LOGIN_URL = `/${this.AUTH}/login`

	static readonly SINGUP_URL = `/${this.AUTH}/signup`

	static readonly MEETING_URL = `meeting/:friendlyId`

	static readonly getPreMeetingPath = (friendlyId: string) =>
		`meeting/${friendlyId}`
}
