import {
	FormControl,
	FormControlLabel,
	FormLabel,
	InputAdornment,
	Radio,
	RadioGroup,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '../../../../components/Button';
import IconBtn from '../../../../components/IconBtn';
import TextInput from '../../../../components/TextInput';
import TouchableOpacity from '../../../../components/TouchableOpacity';

const Auth = () => {
	const menuView = 'Login';
	const errors = null;
	const show = false;
	const loading = false;

	return (
		<>
			<TouchableOpacity>
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
			<form>
				<FormControl variant='standard'>
					{menuView === 'Register' && (
						<>
							<TextInput label='First Name' margin='dense' size='small' />
							{errors && errors.firstName && (
								<h6 className='error'>{errors.firstName}</h6>
							)}
							<TextInput label='Last Name' margin='dense' size='small' />
							{errors && errors.lastName && (
								<h6 className='error'>{errors.lastName}</h6>
							)}
							<TextInput
								type='tel'
								label='Mobile Number'
								margin='dense'
								size='small'
							/>
							{errors && errors.phone && (
								<h6 className='error'>{errors.phone}</h6>
							)}
						</>
					)}
					<TextInput type='email' label='Email' margin='dense' size='small' />
					{errors && errors.email && <h6 className='error'>{errors.email}</h6>}
					<TextInput
						type={show ? 'text' : 'password'}
						label='Password'
						margin='dense'
						size='small'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconBtn edge='end'>
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
							<RadioGroup row>
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
			{menuView === 'Login' && <h6 className='link'>Forgot Password</h6>}
		</>
	);
};

export default Auth;
