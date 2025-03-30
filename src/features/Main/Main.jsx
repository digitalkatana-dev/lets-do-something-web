import React from 'react';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import UpNext from './components/UpNext';
import Schedule from './components/Schedule';
import Memories from './components/Memories';
import './main.scss';

const Main = () => {
	return (
		<div id='main'>
			<Hero />
			<Welcome />
			<UpNext />
			<Schedule />
			<Memories />
		</div>
	);
};

export default Main;
