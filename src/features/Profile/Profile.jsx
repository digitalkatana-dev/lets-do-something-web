import React from 'react';
import './profile.scss';
import User from './components/User';
import Friends from './components/Friends';
import Events from './components/Events';
import EventsAlt from './components/EventsAlt';

const Profile = () => {
	return (
		<div className='profile'>
			<User />
			<Friends />
			<Events />
			<EventsAlt />
		</div>
	);
};

export default Profile;
