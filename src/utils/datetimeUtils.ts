import moment from 'moment'

export function formatDatetime(
	datetimeString: string,
	format: string = 'YYYY-MM-DDTHH:HH:mm'
) {
	return moment(datetimeString).format(format)
}
