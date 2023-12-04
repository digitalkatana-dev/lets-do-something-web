import { FormControl, TextField } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen, setMenuView } from '../../../../redux/slices/navSlice';
import {
	setEmail,
	generatePasswordToken,
	clearErrors,
} from '../../../../redux/slices/userSlice';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '../../../Button';

const Forgot = () => {
	const { loading, email, success, errors } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (e) => {
		dispatch(setEmail(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email.toLowerCase(),
		};

		dispatch(generatePasswordToken(data));
	};

	const handleSuccess = useCallback(() => {
		success &&
			setTimeout(() => {
				dispatch(setMenuOpen(false));
				dispatch(setMenuView('Login'));
			}, 5000);
	}, [success, dispatch]);

	const handleError = useCallback(() => {
		errors?.message &&
			setTimeout(() => {
				dispatch(clearErrors());
			}, 7000);
	}, [errors, dispatch]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	useEffect(() => {
		handleError();
	}, [handleError]);

	return (
		<div className='menu-container'>
			<h2>Forgot Password</h2>
			<HelpOutlineIcon className='icon forgot' fontSize='large' />
			<form onSubmit={handleSubmit}>
				<h6 className='desc'>
					A link to reset your password will be sent to the email address
					associated with your account.
				</h6>
				<FormControl variant='standard'>
					<TextField
						type='email'
						label='Email'
						size='small'
						margin='dense'
						value={email}
						onFocus={handleFocus}
						onChange={handleChange}
					/>
					{errors?.email && <h6 className='error'>{errors?.email}</h6>}
					<Button
						type='submit'
						label='SUBMIT'
						btnStyle={{ width: '150px', alignSelf: 'center' }}
						loading={loading}
					/>
				</FormControl>
			</form>
			<div className='response-container'>
				{success?.message && (
					<h5 className='success'>
						<span>
							<CheckCircleOutlineIcon fontSize='inherit' />
						</span>
						{success?.message}
					</h5>
				)}
				{errors?.message && (
					<h5 className='error'>
						<span>
							<ErrorOutlineIcon fontSize='inherit' />
						</span>
						{errors?.message}
					</h5>
				)}
			</div>
		</div>
	);
};

export default Forgot;
