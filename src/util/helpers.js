import dayjs from 'dayjs';

export const getMonth = (month = dayjs().month()) => {
	const year = dayjs().year();
	const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
	let currentMonthCount = 0 - firstDayOfTheMonth;
	const daysMatrix = new Array(5).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;
			return dayjs(new Date(year, month, currentMonthCount)).toString();
		});
	});
	return daysMatrix;
};

export const thirdSunday = (year, month) => {
	const date = new Date(year, month, 1, 12);
	let weekday = date.getDay();
	let dayDiff = weekday === 0 ? 14 : weekday + 7;
	return date.setDate(date.getDate() - dayDiff);
};

export const guestListEvents = (savedEvents, errorHandler) => {
	let errors = {};
	let formattedEvents = [];

	try {
		const monthEvents = savedEvents?.filter(
			(item) =>
				dayjs(item.date).month() === dayjs().month() &&
				dayjs(item.date).year() === dayjs().year()
		);
		// console.log('Current Events', monthEvents);
		monthEvents?.forEach((event) => {
			formattedEvents.push({
				_id: event._id,
				details: `${event.type} @ ${event.location} on ${event.date}`,
				confirmedGuests: event.attendees,
			});
		});
		// console.log('Formatted', formattedEvents);
		return formattedEvents;
	} catch (err) {
		errors.event = 'Error getting events';
		errorHandler(errors);
	}
};

export const alreadyAttending = (eventsAttending, selectedEvent) => {
	const res = eventsAttending?.find((item) => item._id === selectedEvent?._id);
	return res;
};

export const tagStyle = (item) => {
	const data = {
		width: 20,
		height: 20,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: `${item}`,
		borderRadius: '100%',
		color: 'whitesmoke',
	};

	return data;
};

export const getCurrentDayClass = (day) => {
	return dayjs(day).format('MM-DD-YY') === dayjs().format('MM-DD-YY')
		? 'today'
		: '';
};

export const base64Encode = (file, callback) => {
	const reader = new FileReader();
	if (file) {
		reader.readAsDataURL(file);
		reader.onload = () => {
			callback(reader.result);
		};
		reader.onerror = (err) => {
			console.log('Error:', err);
		};
	}
};

export const defaultTime = (date) => {
	const rawDate = new Date(date).toISOString();
	const formattedDate = dayjs(rawDate).format('YYYY-MM-D');
	const dt = `${formattedDate}T12:00`;

	return dt;
};

export const formattedTime = (data) => {
	let formattedTime;
	let displayHours;
	const rawDate = new Date(data).toISOString();
	const formattedDateTime = dayjs(rawDate).format('YYYY-MM-DDTh:mm A');
	const date = formattedDateTime.split('T')[0];
	const fullTime = formattedDateTime.split('T')[1];
	const time = fullTime.split(' ')[0];
	const check = fullTime.split(' ')[1];
	const hours = time.split(':')[0];
	const milHours = parseInt(hours) + 12;
	const mins = time.split(':')[1];

	if (check === 'PM') {
		milHours < 24 && milHours > 12
			? (displayHours = milHours)
			: (displayHours = hours);
	} else if (check === 'AM') {
		milHours === 24 ? (displayHours = 0) : (displayHours = hours);
	}

	formattedTime = `${date}T${displayHours}:${mins}`;

	return formattedTime;
};
