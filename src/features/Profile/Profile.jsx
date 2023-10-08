import React from 'react';
import './profile.scss';
import User from './components/User';
import Friends from './components/Friends';
import Events from './components/Events';
// import EventsAlt from './components/EventsAlt';
import Footer from '../../components/Footer';

const Profile = () => {
	return (
		<div className='profile'>
			<User />
			<Friends />
			<Events />
			{/* <EventsAlt /> */}
			<Footer />
		</div>
	);
};

export default Profile;
