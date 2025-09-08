import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

export const dynamicWelcomeImage = () => {
	const dateArray = [
		{ date: '1/1', url: 'new-year.jpg' },
		{ date: '2/14', url: 'valentines-day.jpg' },
		{ date: '3/17', url: 'st-patricks-day.jpg' },
		{ date: '4/5', url: 'easter.jpg' },
		{ date: '5/25', url: 'memorial-day.jpg' },
		{ date: '7/4', url: 'july-fourth.jpg' },
		{ date: '9/1', url: 'labor-day.jpg' },
		{ date: '10/31', url: 'halloween.jpg' },
		{ date: '10/27', url: 'thanksgiving.jpg' },
		{ date: '12/23', url: 'happy-holidays.jpg' },
	];

	// Get today's date in m/dd format
	const today = new Date();
	const todayMonth = today.getMonth() + 1; // getMonth() is zero-based
	const todayDay = today.getDate();

	// Convert date strings to comparable numeric values (MMDD -> e.g., "9/07" -> 907)
	const todayNumeric = todayMonth * 100 + todayDay;

	// Convert and sort array by date
	const sortedArray = dateArray
		.map((item) => {
			const [month, day] = item.date.split('/').map(Number);
			return { ...item, numericDate: month * 100 + day };
		})
		.sort((a, b) => a.numericDate - b.numericDate);

	let closestMatch = null;

	for (const item of sortedArray) {
		const diff = todayNumeric - item.numericDate;

		// Exact match
		if (diff === 0) {
			return item.url;
		}

		// Within 4 days AFTER a date
		if (diff > 0 && diff <= 4) {
			return item.url;
		}

		// Track closest prior for fallback
		if (diff > 0) {
			closestMatch = item;
		}
	}

	// If no match or within 4 days, fallback
	return closestMatch ? closestMatch.url : 'san-diego.jpg';
};

export const dynamicWelcomeMessage = () => {
	const dateArray = [
		{ date: '1/1', message: 'Happy New Year!' },
		{ date: '2/14', message: "Happy Valentine's Day!" },
		{ date: '3/17', message: "Happy St. Patrick's Day!" },
		{ date: '4/5', message: 'Happy Easter!' },
		{ date: '5/25', message: 'Happy Memorial Day!' },
		{ date: '7/4', message: 'Happy 4th of July!' },
		{ date: '9/1', message: 'Happy Labor Day!' },
		{ date: '10/31', message: 'Happy Halloween!' },
		{ date: '10/27', message: 'Happy Thanksgiving!' },
		{ date: '12/23', message: 'Happy Holidays!' },
	];

	// Get today's date in m/dd format
	const today = new Date();
	const todayMonth = today.getMonth() + 1; // getMonth() is zero-based
	const todayDay = today.getDate();

	// Convert date strings to comparable numeric values (MMDD -> e.g., "9/07" -> 907)
	const todayNumeric = todayMonth * 100 + todayDay;

	// Convert and sort array by date
	const sortedArray = dateArray
		.map((item) => {
			const [month, day] = item.date.split('/').map(Number);
			return { ...item, numericDate: month * 100 + day };
		})
		.sort((a, b) => a.numericDate - b.numericDate);

	let closestMatch = null;

	for (const item of sortedArray) {
		const diff = todayNumeric - item.numericDate;

		// Exact match
		if (diff === 0) {
			return item.message;
		}

		// Within 4 days AFTER a date
		if (diff > 0 && diff <= 4) {
			return item.message;
		}

		// Track closest prior for fallback
		if (diff > 0) {
			closestMatch = item;
		}
	}

	// If no match or within 4 days, fallback
	return closestMatch
		? closestMatch.message
		: 'Get out there and have some fun!';
};

export const isTokenExpired = (token) => {
	if (!token) return true;

	try {
		const { exp } = jwtDecode(token);
		return Date.now() >= exp * 1000;
	} catch (e) {}
};

export const getMonth = (month = dayjs().month()) => {
	const year = dayjs().year();
	const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
	const totalDaysInMonth = dayjs(new Date(year, month + 1, 0)).date();
	let currentMonthCount = 0 - firstDayOfTheMonth;
	const numRows = Math.ceil((totalDaysInMonth + firstDayOfTheMonth) / 7); // Calculate the number of rows needed
	const daysMatrix = new Array(numRows).fill([]).map(() => {
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
		monthEvents?.forEach((event) => {
			formattedEvents.push({
				_id: event._id,
				details: `${event.type} @ ${event.location} on ${event.date}`,
				confirmedGuests: event.attendees,
			});
		});
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

export const getBackgroundColor = (colorName, opacity) => {
	const tempElement = document.createElement('div');
	tempElement.style.color = colorName;
	document.body.appendChild(tempElement);

	const computedColor = window.getComputedStyle(tempElement).color;
	const rgbaValues = computedColor.match(/\d+/g).map(Number);

	document.body.removeChild(tempElement);

	let background;
	if (opacity) {
		background = `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${opacity})`;
	} else {
		background = `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, 0.2)`;
	}

	return background;
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

export const handleDateSort = (array) => {
	let newArray = [];

	array?.forEach((item) => {
		newArray.push({
			...item,
			date: new Date(item.date),
		});
	});

	let sorted = newArray.sort((a, b) => b.date - a.date);

	sorted.forEach((item) => {
		item.date = dayjs(item.date).format('MM/DD/YYYY');
		return item;
	});

	return sorted;
};
