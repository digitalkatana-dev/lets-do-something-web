import { IconButton } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, clearSuccess } from '../../../../redux/slices/userSlice';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import './user.scss';
import ProfileImageDialog from '../../../../components/ProfileImageDialog';

const User = () => {
	const { user, success } = useSelector((state) => state.user);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogType, setDialogType] = useState('profile');
	const dispatch = useDispatch();

	const handleDialogToggle = () => {
		setDialogOpen(!dialogOpen);
	};

	const handleCover = () => {
		setDialogType('cover');
		handleDialogToggle();
	};

	const handleProfile = () => {
		setDialogType('profile');
		handleDialogToggle();
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			setTimeout(() => {
				dispatch(clearSuccess());
			}, 7000);
			setDialogOpen(false);
		}
	}, [success, dispatch]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	return (
		<div id='user'>
			<div className='header-container'>
				<div className='cover-photo-section'>
					<div className='cover-photo-container'>
						{user?.coverPhoto && <img src={user?.coverPhoto} alt='cover' />}
						<IconButton className='cover-photo-btn' onClick={handleCover}>
							<PhotoCameraOutlinedIcon className='btn-icon' />
						</IconButton>
					</div>
					<div className='user-image-container'>
						<img src={user?.profilePic} alt='avatar' />
						<IconButton className='profile-pic-btn' onClick={handleProfile}>
							<PhotoCameraOutlinedIcon className='btn-icon' />
						</IconButton>
					</div>
				</div>
				<div className='user-details-container'>
					<span className='full-name'>
						{user?.firstName + ' ' + user?.lastName}
					</span>
					<span className='description'></span>
				</div>
			</div>
			<ProfileImageDialog
				open={dialogOpen}
				type={dialogType}
				handleClose={handleDialogToggle}
			/>
		</div>
	);
};

export default User;
