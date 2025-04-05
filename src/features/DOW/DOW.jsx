import React from 'react';
import { Container } from '@mui/material';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import './dow.scss';

const DOW = () => {
	return (
		<div id='dow'>
			<Container maxWidth='lg'>
				<EventList />
				<EventForm />
			</Container>
		</div>
	);
};

export default DOW;
