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

export const guestListEvents = (allEvents, errorHandler) => {
	let errors = {};
	let formattedEvents = [];

	try {
		const monthEvents = allEvents?.filter(
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
	return dayjs(day).format('MM-DD-YY') === dayjs(new Date()).format('MM-DD-YY')
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
	const formattedDateTime = dayjs(rawDate).format('YYYY-MM-DDThh:mm A');
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

export const getBackgroundColor = (colorName) => {
	const tempElement = document.createElement('div');
	tempElement.style.color = colorName;
	document.body.appendChild(tempElement);

	const computedColor = window.getComputedStyle(tempElement).color;
	const rgbaValues = computedColor.match(/\d+/g).map(Number);

	document.body.removeChild(tempElement);

	return `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, 0.2)`;
};

export const arrayMatch = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}

	return true;
};

export const objectMatch = (obj1, obj2) => {
	const sortedKeys1 = Object.keys(obj1).sort();
	const sortedKeys2 = Object.keys(obj2).sort();

	if (sortedKeys1.length !== sortedKeys2.length) {
		return false;
	}

	for (let i = 0; i < sortedKeys1.length; i++) {
		const key1 = sortedKeys1[i];
		const key2 = sortedKeys2[i];

		if (key1 !== key2) {
			return false;
		}

		const val1 = obj1[key1];
		const val2 = obj2[key2];

		if (val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object') {
			if (!objectMatch(val1, val2)) {
				return false;
			}
		} else if (val1 !== val2) {
			return false;
		}
	}

	return true;
};

export const reFormatTime = (time, day) => {
	const desiredDate = new Date(day);

	const timeComponents = time?.match(/(\d+):(\d+)(\w+)/);

	if (desiredDate && timeComponents) {
		let hours = parseInt(timeComponents[1]);
		const minutes = parseInt(timeComponents[2]);
		const period = timeComponents[3];

		if (period.toLowerCase() === 'pm' && hours < 12) {
			hours += 12;
		}

		desiredDate.setHours(hours);
		desiredDate.setMinutes(minutes);

		const formattedDateTime =
			desiredDate.toISOString().split('T')[0] +
			'T' +
			('0' + desiredDate.getHours()).slice(-2) +
			':' +
			('0' + desiredDate.getMinutes()).slice(-2);

		return formattedDateTime;
	}
};
