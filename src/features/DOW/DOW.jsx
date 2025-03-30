import React from 'react';
import EventForm from './components/EventForm';
import './dow.scss';

const DOW = () => {
	return (
		<div id='dow'>
			<div className='action-bar'>Actions</div>
			<div className='day-container'>
				<div className='day-events'>Events</div>
				<EventForm />
			</div>
		</div>
	);
};

export default DOW;
