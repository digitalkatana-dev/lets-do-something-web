import { FormControl } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	userAuth,
	setEmail,
	setPassword,
	clearUserErrors,
} from '../../../../redux/slices/userSlice';
import { setMenuView } from '../../../../redux/slices/navSlice';
import LoginIcon from '@mui/icons-material/Login';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TextInput from '../../../../transition/TextInput';
// import Button1 from '../../../../components/Button';
import Button from '../../../../transition/Button';
import './auth.scss';

const Auth = () => {
	const { loading, email, password, errors } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearUserErrors());
	};

	const handleChange = (input, value) => {
		const actionMap = {
			toggle: setMenuView,
			email: setEmail,
			pass: setPassword,
		};

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email,
			password,
		};

		dispatch(userAuth(data));
	};

	const handleError = useCallback(() => {
		errors?.users &&
			setTimeout(() => {
				dispatch(clearUserErrors());
			}, 7000);
	}, [errors, dispatch]);

	useEffect(() => {
		handleError();
	}, [handleError]);

	return (
		<div className='menu-container'>
			<div>
				<h2>Login</h2>
				<LoginIcon className='icon auth' fontSize='large' />
			</div>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth>
					<TextInput
						type='email'
						placeholder='Email'
						value={email}
						onFocus={handleFocus}
						onChange={(e) => handleChange('email', e.target.value)}
						error={errors?.email}
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextInput
						type='password'
						placeholder='Password'
						value={password}
						onFocus={handleFocus}
						onChange={(e) => handleChange('pass', e.target.value)}
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
				{errors?.users && (
					<h5 className='error'>
						<span>
							<ErrorOutlineIcon fontSize='inherit' />
						</span>
						{errors?.users}
					</h5>
				)}
			</div>
			<h6 className='link' onClick={() => dispatch(setMenuView('Forgot'))}>
				Forgot Password
			</h6>
		</div>
	);
};

export default Auth;
