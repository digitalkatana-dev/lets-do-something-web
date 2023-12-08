import { Paper } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';
import './profile.scss';
import User from './components/User';
import Events from './components/ProfileTabs';
import Friends from './components/ProfileTabs';
import Footer from '../../components/Footer';

const Profile = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const loadUser = useCallback(() => {
		dispatch(getUser(user?._id));
	}, [dispatch, user?._id]);

	useEffect(() => {
		loadUser();
	}, [loadUser]);

	return (
		<div id='profile'>
			<Paper id='profile-container' elevation={10}>
				<div className='greeting-container'>
					<h4>Hi {user?.firstName}, Welcome back 👋</h4>
				</div>
				<User />
				<Events
					tab1data={user?.myEvents}
					tab2data={user?.eventsAttending}
					type='events'
				/>
				<Friends tab1data={user?.friends} type='friends' />
			</Paper>
			<Footer />
		</div>
	);
};

export default Profile;
