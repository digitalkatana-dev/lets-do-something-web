import {
	FormControl,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen, setMenuView } from '../../../../redux/slices/navSlice';
import {
	setPassword,
	setShow,
	resetPasswordWithToken,
	clearSuccess,
	clearErrors,
} from '../../../../redux/slices/userSlice';
import LockResetIcon from '@mui/icons-material/LockReset';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '../../../Button';

const Reset = () => {
	const { loading, password, show, success, errors } = useSelector(
		(state) => state.user
	);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const path = location.pathname.split('/')[2];

	const handleFocus = () => {
		dispatch(clearErrors());
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
		setTimeout(() => {
			dispatch(setMenuOpen(false));
			dispatch(setMenuView('Login'));
			dispatch(clearSuccess());
			navigate('/');
		}, 7000);
	}, [navigate, dispatch]);

	const handleErrors = useCallback(() => {
		setTimeout(() => {
			dispatch(clearErrors());
		}, 7000);
	}, [dispatch]);

	useEffect(() => {
		success && handleSuccess();
	}, [success, handleSuccess]);

	useEffect(() => {
		errors?.message && handleErrors();
	}, [errors, handleErrors]);

	return (
		<div className='menu-container'>
			<h2>Reset Password</h2>
			<LockResetIcon className='icon reset' fontSize='large' />
			<form onSubmit={handleSubmit}>
				<h6 className='desc'>Enter your new password.</h6>
				<FormControl variant='standard'>
					<TextField
						type={show ? 'text' : 'password'}
						label='Password'
						size='small'
						margin='dense'
						value={password}
						onFocus={handleFocus}
						onChange={handleChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => dispatch(setShow())}
										onMouseDown={(e) => e.preventDefault()}
										edge='end'
									>
										{show ? (
											<VisibilityOff className='visibility-icon' />
										) : (
											<Visibility className='visibility-icon' />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{errors?.password && <h6 className='error'>{errors?.password}</h6>}
					<Button
						type='submit'
						label='Submit'
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
						{errors?.auth}
					</h5>
				)}
			</div>
		</div>
	);
};

export default Reset;
