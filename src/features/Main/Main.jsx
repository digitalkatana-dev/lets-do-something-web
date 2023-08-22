import React from 'react';
import './main.scss';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import UpNext from './components/UpNext';

const Main = () => {
	return (
		<div className='main'>
			<Hero />
			<Welcome />
			<UpNext />
		</div>
	);
};

export default Main;
