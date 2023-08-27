/* eslint-disable react-hooks/exhaustive-deps */
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Paper,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateUser,
	updateProfilePic,
} from '../../../../redux/slices/userSlice';
import { base64Encode } from '../../../../util/helpers';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import './user.scss';

const User = () => {
	const { user } = useSelector((state) => state.user);
	const [file, setFile] = useState(null);
	const [base64File, setBase64File] = useState('');
	const [firstName, setFirstName] = useState(user?.firstName);
	const [lastName, setLastName] = useState(user?.lastName);
	const [phone, setPhone] = useState(user?.phone);
	const [email, setEmail] = useState(user?.email);
	const [password, setPassword] = useState('********');
	const [notify, setNotify] = useState(user?.notify);
	const picRef = useRef(null);
	const dispatch = useDispatch();

	const handleClick = () => {
		picRef.current.click();
	};

	const handleChange = (input, value) => {
		switch (input) {
			case 'pic':
				setFile(value);
				break;

			case 'first':
				setFirstName(value);
				break;

			case 'last':
				setLastName(value);
				break;

			case 'phone':
				setPhone(value);
				break;

			case 'email':
				setEmail(value);
				break;

			case 'password':
				setPassword(value);
				break;

			case 'notify':
				setNotify(value);
				break;

			default:
				break;
		}
	};

	const handleUpdate = () => {
		const data = {
			...(firstName !== user?.firstName && { firstName }),
			...(lastName !== user?.lastName && { lastName }),
			...(phone !== user?.phone && { phone }),
			...(email !== user?.email && { email }),
			...(password !== '********' && { password }),
			...(notify !== user?.notify && { notify }),
		};

		dispatch(updateUser(data));
	};

	useEffect(() => {
		const handleUpdatePic = () => {
			const picData = new FormData();
			const filename = file.name;
			picData.append('name', filename);
			picData.append('file', file);
			picData.append('b64str', base64File);
			// for (var pair of picData.entries()) {
			// 	console.log('Memory', pair[1]);
			// }
			dispatch(updateProfilePic(picData));
			setTimeout(() => {
				setFile(null);
				setBase64File('');
			}, 2000);
		};
		file && base64File && handleUpdatePic();
	}, [file, base64File]);

	useEffect(() => {
		setPassword('********');
	}, [user]);

	base64Encode(file, setBase64File);

	return (
		<div className='user'>
			<Paper className='pic-box' elevation={5}>
				{user?.profilePic ? (
					<img src={user?.profilePic} alt='me' className='profile-pic' />
				) : (
					<AccountCircleIcon className='no-pic' />
				)}
				<input
					style={{ display: 'none' }}
					type='file'
					ref={picRef}
					onChange={(e) => handleChange('pic', e.target.files[0])}
				/>
				<IconButton className='pic-add' onClick={handleClick}>
					<AddBoxIcon />
				</IconButton>
			</Paper>
			<Paper className='info-box' elevation={5}>
				<FormControl>
					<TextField
						variant='standard'
						label='First Name'
						margin='dense'
						size='small'
						value={firstName}
						onChange={(e) => handleChange('first', e.target.value)}
						// fullWidth
					/>
					<TextField
						variant='standard'
						label='Last Name'
						margin='dense'
						size='small'
						value={lastName}
						onChange={(e) => handleChange('last', e.target.value)}
						// fullWidth
					/>
					<TextField
						variant='standard'
						type='tel'
						label='Mobile Number'
						margin='dense'
						size='small'
						value={phone}
						onChange={(e) => handleChange('phone', e.target.value)}
						// fullWidth
					/>
				</FormControl>
				<FormControl>
					<TextField
						variant='standard'
						type='email'
						label='Email'
						margin='dense'
						size='small'
						value={email}
						onChange={(e) => handleChange('email', e.target.value)}
						// fullWidth
					/>
					<TextField
						variant='standard'
						type='password'
						label='Password'
						margin='dense'
						size='small'
						value={password}
						onChange={(e) => handleChange('password', e.target.value)}
						// fullWidth
					/>
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
				</FormControl>
			</Paper>
			<button id='update' onClick={handleUpdate}>
				Update
			</button>
		</div>
	);
};

export default User;
