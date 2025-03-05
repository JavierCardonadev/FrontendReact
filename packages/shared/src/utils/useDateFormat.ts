import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export default function useDateFormat(date: any, format?: string) {
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(dayjsRelativeTime);
	dayjs.extend(advancedFormat);

	let tzLocal = dayjs.tz.guess();
	tzLocal = 'America/Bogota';
	dayjs.tz.setDefault(tzLocal);

	return dayjs.utc(date).format(format ?? 'MM-DD-YYYY');
}
