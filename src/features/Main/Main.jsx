import React from 'react';
import './main.scss';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import UpNext from './components/UpNext';
import Schedule from './components/Schedule';
import Memories from './components/Memories';
import Footer from '../../components/Footer';

const Main = () => {
	return (
		<div className='main'>
			<Hero />
			<Welcome />
			<UpNext />
			<Schedule />
			<Memories />
			<Footer />
		</div>
	);
};

export default Main;
