import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import { Paper } from '@mui/material';
import {
	setFirstName,
	setLastName,
	setNotify,
	setPhone,
	updateUser,
	clearUserErrors,
	clearUserSuccess,
} from '../../redux/slices/userSlice';
import TextInput from '../../transition/TextInput';
import Button from '../../transition/Button';
import './create.scss';

const CreateProfile = () => {
	const {
		loading,
		activeUser,
		firstName,
		lastName,
		phone,
		notify,
		success,
		errors,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFocus = () => {
		dispatch(clearUserErrors());
	};

	const handleChange = (input, value) => {
		const actionMap = {
			first: setFirstName,
			last: setLastName,
			phone: setPhone,
			notify: setNotify,
		};

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			_id: activeUser._id,
			firstName,
			lastName,
			phone,
			notify,
			firstLogin: false,
		};

		dispatch(updateUser(data));
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			navigate('/');
			setTimeout(() => {
				dispatch(clearUserSuccess());
			}, 7000);
		}
	}, [success, dispatch, navigate]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	return (
		<div id='create-profile'>
			<Paper id='create-profile-container' elevation={10}>
				<section className='greeting-wrapper'>
					<h2>Hi there, {activeUser?.email}, looks like you're new here! 👋</h2>
					<h3>Let's create your profile!</h3>
				</section>
				<section className='user-form'>
					<form onSubmit={handleSubmit}>
						<FormControl fullWidth>
							<TextInput
								type='text'
								placeholder='First Name'
								value={firstName}
								onFocus={handleFocus}
								onChange={(e) => handleChange('first', e.target.value)}
								error={errors?.firstName}
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextInput
								type='text'
								placeholder='Last Name'
								value={lastName}
								onFocus={handleFocus}
								onChange={(e) => handleChange('last', e.target.value)}
								error={errors?.lastName}
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextInput
								type='number'
								placeholder='Mobile Number'
								value={phone}
								onFocus={handleFocus}
								onChange={(e) => handleChange('phone', e.target.value)}
								error={errors?.phone}
							/>
						</FormControl>
						<FormControl className='notify' fullWidth>
							<FormLabel className='notify-label'>
								How do you want to be notified?
							</FormLabel>
							<RadioGroup
								row
								value={notify}
								onChange={(e) => handleChange('notify', e.target.value)}
							>
								<FormControlLabel
									className='notify-label'
									value='sms'
									control={
										<Radio
											sx={{ '&.Mui-checked': { color: 'rgb(156, 39, 176' } }}
										/>
									}
									label='Text'
								/>
								<FormControlLabel
									className='notify-label'
									value='email'
									control={
										<Radio
											sx={{ '&.Mui-checked': { color: 'rgb(156, 39, 176' } }}
										/>
									}
									label='Email'
								/>
							</RadioGroup>
						</FormControl>
						{errors?.notify && <h6 className='error'>{errors?.notify}</h6>}
						<FormControl fullWidth>
							<Button type='submit' btnClass='auth-btn' loading={loading}>
								Submit
							</Button>
						</FormControl>
					</form>
				</section>
			</Paper>
		</div>
	);
};

export default CreateProfile;
