import moment from 'moment'

export function formatDatetime(
	datetimeString: Date,
	format: string = 'YYYY-MM-DDTHH:mm'
) {
	return moment(datetimeString).format(format)
}
