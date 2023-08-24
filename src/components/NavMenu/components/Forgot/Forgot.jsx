/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen, setMenuView } from '../../../../redux/slices/navSlice';
import {
	setEmail,
	setErrors,
	generatePasswordToken,
	clearSuccess,
	clearErrors,
} from '../../../../redux/slices/userSlice';
import { validateForgotPassword } from '../../../../util/validators';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '../../../Button';
import TextInput from '../../../TextInput';

const Forgot = () => {
	const { loading, email, success, errors } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email.toLowerCase(),
		};

		const { valid, errors } = validateForgotPassword(data);

		if (!valid) {
			dispatch(setErrors(errors));
		} else {
			dispatch(generatePasswordToken(data));
		}
	};

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				dispatch(setEmail(''));
				dispatch(clearSuccess());
				dispatch(setMenuOpen(false));
				dispatch(setMenuView('Login'));
			}, 5000);
		}
	}, [success]);

	return (
		<>
			<h2>Forgot Password</h2>
			<HelpOutlineIcon className='title-icon blue' fontSize='large' />
			<form id='forgot-form' onSubmit={handleSubmit}>
				<FormControl variant='standard'>
					{success ? (
						<div className='response-container success'>
							<CheckCircleOutlineIcon
								className='response-icon'
								fontSize='inherit'
							/>
							<b>{success.message}</b>
						</div>
					) : errors && errors.auth ? (
						<div className='response-container fail'>
							<HighlightOffIcon className='response-icon' fontSize='inherit' />
							<b>{errors.auth}</b>
						</div>
					) : (
						<h6 className='forgot-txt'>
							A link to reset your password will be sent to the email address
							associated with your account.
						</h6>
					)}
					<TextInput
						type='email'
						label='Email'
						margin='dense'
						size='small'
						value={email}
						onFocus={handleFocus}
						onChange={(e) => dispatch(setEmail(e.target.value))}
					/>
					{errors && errors.email && <h6 className='error'>{errors.email}</h6>}
					<Button type='submit' loading={loading} label='SEND EMAIL' />
				</FormControl>
			</form>
		</>
	);
};

export default Forgot;
