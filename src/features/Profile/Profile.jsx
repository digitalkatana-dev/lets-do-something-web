import { useSelector } from 'react-redux';
import './profile.scss';
import User from './components/User';
import Events from './components/ProfileTabs';
import Friends from './components/ProfileTabs';
import Footer from '../../components/Footer';

const Profile = () => {
	const { user } = useSelector((state) => state.user);

	return (
		<div id='profile'>
			<div className='greeting-container'>
				<h4>Hi {user?.firstName}, Welcome back 👋</h4>
			</div>
			<User />
			<Events
				tab1data={user?.eventsAttending}
				tab2data={user?.myEvents}
				type='events'
			/>
			<Friends tab1data={user?.friends} type='friends' />
			<Footer />
		</div>
	);
};

export default Profile;
