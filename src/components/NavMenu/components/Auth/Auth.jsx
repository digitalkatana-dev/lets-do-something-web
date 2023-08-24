import {
	FormControl,
	FormControlLabel,
	FormLabel,
	InputAdornment,
	Radio,
	RadioGroup,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	register,
	login,
	setFirstName,
	setLastName,
	setPhone,
	setEmail,
	setPassword,
	setNotify,
	setShow,
	clearForm,
	clearErrors,
} from '../../../../redux/slices/userSlice';
import { setMenuView } from '../../../../redux/slices/navSlice';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '../../../../components/Button';
import IconBtn from '../../../../components/IconBtn';
import TextInput from '../../../../components/TextInput';
import TouchableOpacity from '../../../../components/TouchableOpacity';

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
		show,
		errors,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (input, value) => {
		switch (input) {
			case 'toggle':
				dispatch(clearErrors());
				dispatch(clearForm());
				dispatch(setMenuView(value));
				break;

			case 'first':
				dispatch(setFirstName(value));
				break;

			case 'last':
				dispatch(setLastName(value));
				break;

			case 'phone':
				dispatch(setPhone(value));
				break;

			case 'email':
				dispatch(setEmail(value));
				break;

			case 'password':
				dispatch(setPassword(value));
				break;

			case 'notify':
				dispatch(setNotify(value));
				break;

			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email.toLowerCase(),
			password,
		};

		switch (menuView) {
			case 'Login':
				dispatch(login(data));
				break;

			case 'Register':
				data.firstName = firstName;
				data.lastName = lastName;
				data.phone = phone;
				data.notify = notify;
				dispatch(register(data));
				break;

			default:
				break;
		}
	};

	return (
		<>
			<TouchableOpacity
				onClick={() =>
					handleChange('toggle', menuView === 'Login' ? 'Register' : 'Login')
				}
			>
				<h2>{menuView}</h2>
				{menuView === 'Register' ? (
					<>
						<PersonAddIcon className='title-icon green' fontSize='large' />
						<p className='auth-message'>
							Already have an account? Click <span className='link'>here</span>!
						</p>
					</>
				) : (
					<>
						<LoginIcon className='title-icon green' fontSize='large' />
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
							<TextInput
								label='First Name'
								margin='dense'
								size='small'
								value={firstName}
								onFocus={handleFocus}
								onChange={(e) => handleChange('first', e.target.value)}
							/>
							{errors && errors.firstName && (
								<h6 className='error'>{errors.firstName}</h6>
							)}
							<TextInput
								label='Last Name'
								margin='dense'
								size='small'
								value={lastName}
								onFocus={handleFocus}
								onChange={(e) => handleChange('last', e.target.value)}
							/>
							{errors && errors.lastName && (
								<h6 className='error'>{errors.lastName}</h6>
							)}
							<TextInput
								type='tel'
								label='Mobile Number'
								margin='dense'
								size='small'
								value={phone}
								onFocus={handleFocus}
								onChange={(e) => handleChange('phone', e.target.value)}
							/>
							{errors && errors.phone && (
								<h6 className='error'>{errors.phone}</h6>
							)}
						</>
					)}
					<TextInput
						type='email'
						label='Email'
						margin='dense'
						size='small'
						value={email}
						onFocus={handleFocus}
						onChange={(e) => handleChange('email', e.target.value)}
					/>
					{errors && errors.email && <h6 className='error'>{errors.email}</h6>}
					<TextInput
						type={show ? 'text' : 'password'}
						label='Password'
						margin='dense'
						size='small'
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
					{errors && errors.password && (
						<h6 className='error'>{errors.password}</h6>
					)}
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
					{errors && errors.notify && (
						<h6 className='error'>{errors.notify}</h6>
					)}
					{errors && errors.user && <h6 className='error'>{errors.user}</h6>}
					<Button type='submit' loading={loading} label='SUBMIT' />
				</FormControl>
			</form>
			{menuView === 'Login' && (
				<h6 className='link' onClick={() => dispatch(setMenuView('Forgot'))}>
					Forgot Password
				</h6>
			)}
		</>
	);
};

export default Auth;
