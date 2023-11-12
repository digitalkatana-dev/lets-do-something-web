import {
	FormControl,
	FormControlLabel,
	FormLabel,
	InputAdornment,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	register,
	userLogin,
	setLogin,
	setFirstName,
	setLastName,
	setPhone,
	setEmail,
	setPassword,
	setNotify,
	setShow,
	clearErrors,
} from '../../../../redux/slices/userSlice';
import { setMenuView } from '../../../../redux/slices/navSlice';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '../../../../components/Button';
import IconBtn from '../../../../components/IconBtn';
import TouchableOpacity from '../../../../components/TouchableOpacity';

const Auth = () => {
	const { menuView } = useSelector((state) => state.nav);
	const {
		loading,
		login,
		firstName,
		lastName,
		phone,
		email,
		password,
		notify,
		show,
		errors,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (input, value) => {
		const actionMap = {
			toggle: setMenuView,
			login: setLogin,
			first: setFirstName,
			last: setLastName,
			phone: setPhone,
			email: setEmail,
			password: setPassword,
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
					login,
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
		errors?.message &&
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
				<FormControl variant='standard'>
					{menuView === 'Register' && (
						<>
							<TextField
								label='First Name'
								size='small'
								margin='dense'
								value={firstName}
								onFocus={handleFocus}
								onChange={(e) => handleChange('first', e.target.value)}
							/>
							{errors?.firstName && (
								<h6 className='error'>{errors?.firstName}</h6>
							)}
							<TextField
								label='Last Name'
								size='small'
								margin='dense'
								value={lastName}
								onFocus={handleFocus}
								onChange={(e) => handleChange('last', e.target.value)}
							/>
							{errors?.lastName && (
								<h6 className='error'>{errors?.lastName}</h6>
							)}
							<TextField
								type='tel'
								label='Mobile Number'
								size='small'
								margin='dense'
								value={phone}
								onFocus={handleFocus}
								onChange={(e) => handleChange('phone', e.target.value)}
							/>
							{errors?.phone && <h6 className='error'>{errors?.phone}</h6>}
							<TextField
								type='email'
								label='Email'
								size='small'
								margin='dense'
								value={email}
								onFocus={handleFocus}
								onChange={(e) => handleChange('email', e.target.value)}
							/>
							{errors?.email && <h6 className='error'>{errors?.email}</h6>}
						</>
					)}
					{menuView === 'Login' && (
						<>
							<TextField
								label='Email or Mobile Number'
								size='small'
								margin='dense'
								value={login}
								onFocus={handleFocus}
								onChange={(e) => handleChange('login', e.target.value)}
							/>
							{errors?.login && <h6 className='error'>{errors?.login}</h6>}
						</>
					)}
					<TextField
						type={show ? 'text' : 'password'}
						label='Password'
						size='small'
						margin='dense'
						value={password}
						onFocus={handleFocus}
						onChange={(e) => handleChange('password', e.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconBtn
										edge='end'
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => dispatch(setShow())}
									>
										{show ? (
											<VisibilityOff className='visibility-icon' />
										) : (
											<Visibility className='visibility-icon' />
										)}
									</IconBtn>
								</InputAdornment>
							),
						}}
					/>
					{errors?.password && <h6 className='error'>{errors?.password}</h6>}
					{menuView === 'Register' && (
						<div className='notify'>
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
						</div>
					)}
					{errors?.notify && <h6 className='error'>{errors?.notify}</h6>}
					<Button
						type='submit'
						label='SUBMIT'
						btnStyle={{ width: '150px', alignSelf: 'center' }}
						loading={loading}
					/>
				</FormControl>
			</form>
			<div className='response-container'>
				{errors?.message && (
					<h5 className='error'>
						<span>
							<ErrorOutlineIcon fontSize='inherit' />
						</span>
						{errors?.message}
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
