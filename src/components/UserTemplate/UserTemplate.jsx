import { Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { processFriend } from '../../redux/slices/userSlice';
import './userTemplate.scss';

const UserTemplate = ({ data }) => {
	const { _id, firstName, lastName, profilePic } = data;
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const displayName = firstName + ' ' + lastName;
	const isFriend = user?.friends.some((item) => item._id === _id);

	const handleFriend = () => {
		dispatch(processFriend(_id));
	};

	return (
		<Paper className='user-template'>
			<div className='user-image-container'>
				<div className='user-image'>
					<img src={profilePic} alt={displayName} />
				</div>
			</div>
			<div className='user-details-container'>{displayName}</div>
			<div className='user-action-container'>
				<Button onClick={handleFriend}>
					{isFriend ? 'Remove Friend' : 'Add Friend'}
				</Button>
			</div>
		</Paper>
	);
};

export default UserTemplate;
