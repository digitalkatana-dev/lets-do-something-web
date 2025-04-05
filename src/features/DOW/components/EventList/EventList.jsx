import React from 'react';
import { dummyEvents } from '../../../../util/data';
import './eventList.scss';

const EventList = () => {
	return (
		<div id='event-list'>
			<h4>Event List</h4>
			{dummyEvents.map((event) => (
				<div key={event.id} style={{ backgroundColor: event.bg }}>
					<h5>{event.title}</h5>
					<p>{event.date}</p>
					<p>{event.time}</p>
					<p>{event.location}</p>
				</div>
			))}
		</div>
	);
};

export default EventList;
