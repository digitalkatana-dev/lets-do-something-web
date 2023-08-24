const isEmail = (email) => {
	const regEx =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email?.match(regEx)) return true;
	else return false;
};

const isPhone = (data) => {
	const regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	if (data?.match(regEx)) return true;
	else return false;
};

const isEmpty = (string) => {
	if (string?.trim() === '') return true;
	else return false;
};

export const validateForgotPassword = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty!';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be a valid email address!';
	}

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

export const validateInvitedGuest = (data) => {
	let errors = {};

	if (isEmpty(data)) {
		errors.guest = 'Must not be empty!';
	} else if (!isEmail(data)) {
		if (!isPhone(data)) {
			errors.guest = 'Must be valid email or phone number';
		}
	}

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};
