/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class RouterPath {
	static readonly BASE_URL = ''

	static readonly AUTH = `/auth`
	static readonly LOGIN_URL = `${this.AUTH}/login`
	static readonly SINGUP_URL = `${this.AUTH}/signup`
	static readonly FORGOT_PASSWORD_URL = `${this.AUTH}/forgot-password`
	static readonly RESET_PASSWORD_URL = `${this.AUTH}/reset-password`

	static readonly USER = `user`
	static readonly PROFILE_URL = `${this.USER}/profile`
	static readonly CONFIRM_URL = `${this.USER}/confirm`

	static readonly MEETING = `meeting`
	static readonly MEETING_URL = `${this.MEETING}/:meetingId`
	static readonly DOCUMENT_URL = `${this.USER}/document/:document`

	static readonly FORGOTPASSWORD_URL = `forgotpassword`

	static readonly getPreMeetingPath = (meetingId: string) =>
		`meeting/${meetingId}`

	static readonly getDocumentPath = (documentId: string) => {
		return `${this.USER}/document/${documentId}`
	}
}
