import { FormControl } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen, setMenuView } from '../../../../redux/slices/navSlice';
import {
	setPassword,
	resetPasswordWithToken,
	clearUserErrors,
} from '../../../../redux/slices/userSlice';
import LockResetIcon from '@mui/icons-material/LockReset';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TextInput from '../../../../transition/TextInput';
import Button1 from '../../../Button';
import Button from '../../../../transition/Button';

const Reset = () => {
	const { loading, password, success, errors } = useSelector(
		(state) => state.user
	);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const path = location.pathname.split('/')[2];

	const handleFocus = () => {
		dispatch(clearUserErrors());
	};

	const handleChange = (e) => {
		dispatch(setPassword(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			token: path,
			password,
		};

		dispatch(resetPasswordWithToken(data));
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			setTimeout(() => {
				dispatch(setMenuOpen(false));
				dispatch(setMenuView('Login'));
				navigate('/');
			}, 5000);
		}
	}, [success, navigate, dispatch]);

	const handleErrors = useCallback(() => {
		setTimeout(() => {
			dispatch(clearUserErrors());
		}, 7000);
	}, [dispatch]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	useEffect(() => {
		errors?.token && handleErrors();
	}, [errors, handleErrors]);

	return (
		<div className='menu-container'>
			<h2>Reset Password</h2>
			<LockResetIcon className='icon reset' fontSize='large' />
			<form onSubmit={handleSubmit}>
				<h6 className='desc'>Enter your new password.</h6>
				<FormControl fullWidth>
					<TextInput
						type='password'
						placeholder='Password'
						value={password}
						onFocus={handleFocus}
						onChange={handleChange}
						error={errors?.password}
					/>
				</FormControl>
				<FormControl fullWidth>
					<Button type='submit' btnClass='auth-btn' loading={loading}>
						Submit
					</Button>
				</FormControl>
			</form>
			<div className='response-container'>
				{success && (
					<h5 className='success'>
						<span>
							<CheckCircleOutlineIcon fontSize='inherit' />
						</span>
						{success}
					</h5>
				)}
				{errors?.token && (
					<h5 className='error'>
						<span>
							<ErrorOutlineIcon fontSize='inherit' />
						</span>
						{errors?.token}
					</h5>
				)}
			</div>
		</div>
	);
};

export default Reset;
