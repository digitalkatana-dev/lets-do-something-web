import React from 'react';
import './profile.scss';
import User from './components/User';
import Friends from './components/Friends';
import Events from './components/Events';

const Profile = () => {
	return (
		<div className='profile'>
			<User />
			<Friends />
			<Events />
		</div>
	);
};

export default Profile;
