import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';
import CloseIcon from '@mui/icons-material/Close';

const ProfileImageDialog = ({ open, type, handleClose }) => {
	const { activeUser } = useSelector((state) => state.user);
	const [avatar, setAvatar] = useState('');
	const dispatch = useDispatch();

	const heading = type === 'profile' ? 'Avatars' : 'Backgrounds';

	const handleClick = (e) => {
		setAvatar(e.target.src === avatar ? '' : e.target.src);
	};

	const handleUpdate = () => {
		let data = {
			_id: activeUser?._id,
		};

		if (type === 'profile') {
			data.profilePic = avatar;
		} else if (type === 'cover') {
			data.coverPhoto = avatar;
		}

		dispatch(updateUser(data));
		setAvatar('');
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='sm'>
			<DialogTitle>{heading}</DialogTitle>
			<IconButton
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: '#AAA',
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent
				dividers
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					gap: '10px',
				}}
			>
				{[...Array(type === 'profile' ? 26 : 24)].map((_, index) => {
					let source;

					if (type === 'profile') {
						source = `http://localhost:3005/uploads/avatars/avatar_${
							index + 1
						}.jpg`;
					} else if (type === 'cover') {
						source = `http://localhost:3005/uploads/covers/cover_${
							index + 1
						}.jpg`;
					}

					return (
						<IconButton
							key={index + 1}
							onClick={handleClick}
							style={{
								border: avatar === source ? '2px ridge dodgerblue' : 'none',
							}}
						>
							<Avatar src={source} alt='user' />
						</IconButton>
					);
				})}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleUpdate}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ProfileImageDialog;
