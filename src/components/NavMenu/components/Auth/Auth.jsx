import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	register,
	userLogin,
	setFirstName,
	setLastName,
	setPhone,
	setEmail,
	setPassword,
	setNotify,
	clearErrors,
} from '../../../../redux/slices/userSlice';
import { setMenuView } from '../../../../redux/slices/navSlice';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TextInput from '../../../../transition/TextInput';
// import Button1 from '../../../../components/Button';
import Button from '../../../../transition/Button';
import TouchableOpacity from '../../../../components/TouchableOpacity';
import './auth.scss';

const Auth = () => {
	const { menuView } = useSelector((state) => state.nav);
	const {
		loading,
		firstName,
		lastName,
		phone,
		email,
		password,
		notify,
		errors,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (input, value) => {
		const actionMap = {
			toggle: setMenuView,
			first: setFirstName,
			last: setLastName,
			phone: setPhone,
			email: setEmail,
			pass: setPassword,
			notify: setNotify,
		};

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let data;

		switch (menuView) {
			case 'Login':
				data = {
					email,
					password,
				};
				dispatch(userLogin(data));
				break;

			case 'Register':
				data = {
					firstName,
					lastName,
					phone,
					email,
					password,
					notify,
				};
				dispatch(register(data));
				break;

			default:
				break;
		}
	};

	const handleError = useCallback(() => {
		errors?.users &&
			setTimeout(() => {
				dispatch(clearErrors());
			}, 7000);
	}, [errors, dispatch]);

	useEffect(() => {
		handleError();
	}, [handleError]);

	return (
		<div className='menu-container'>
			<TouchableOpacity
				onClick={() =>
					handleChange('toggle', menuView === 'Login' ? 'Register' : 'Login')
				}
			>
				<h2>{menuView}</h2>
				{menuView === 'Register' ? (
					<>
						<PersonAddIcon className='icon auth' fontSize='large' />
						<p className='auth-message'>
							Already have an account? Click <span className='link'>here</span>!
						</p>
					</>
				) : (
					<>
						<LoginIcon className='icon auth' fontSize='large' />
						<p className='auth-message'>
							Don't have an account? Click <span className='link'>here</span>!
						</p>
					</>
				)}
			</TouchableOpacity>
			<form onSubmit={handleSubmit}>
				{menuView === 'Register' && (
					<>
						<FormControl fullWidth>
							<TextInput
								type='text'
								placeholder='Frist Name'
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
					</>
				)}
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
				{menuView === 'Register' && (
					<FormControl className='notify' fullWidth>
						<FormLabel className='notify-label'>
							How do want to be notified?
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
										sx={{
											'&.Mui-checked': { color: 'rgb(156, 39, 176)' },
										}}
									/>
								}
								label='Text'
							/>
							<FormControlLabel
								className='notify-label'
								value='email'
								control={
									<Radio
										sx={{
											'&.Mui-checked': { color: 'rgb(156, 39, 176)' },
										}}
									/>
								}
								label='Email'
							/>
						</RadioGroup>
					</FormControl>
				)}
				{errors?.notify && <h6 className='error'>{errors?.notify}</h6>}
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
			{menuView === 'Login' && (
				<h6 className='link' onClick={() => dispatch(setMenuView('Forgot'))}>
					Forgot Password
				</h6>
			)}
		</div>
	);
};

export default Auth;
