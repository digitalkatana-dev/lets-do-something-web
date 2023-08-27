import React from 'react';
import Calendar from './components/Calendar';
import GuestList from './components/GuestList';
import './schedule.scss';

const Schedule = () => {
	return (
		<div className='schedule'>
			<Calendar />
			<GuestList />
		</div>
	);
};

export default Schedule;
