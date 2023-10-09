import { useDispatch, useSelector } from 'react-redux';
import Hosting from './components/Hosting';
import Attending from './components/Attending';
import './events.scss';

const Events = () => {
	const { user } = useSelector((state) => state.user);
	const myEvents = user?.myEvents;
	const attending = user?.eventsAttending;
	const dispatch = useDispatch();

	return (
		<div className='events'>
			<div className='header'>
				<h3>Events</h3>
			</div>
			<div className='big-box'>
				<div className='container'>
					<div className='toolbar'>
						<h4>Hosting</h4>
					</div>
					<div className='event-list'>
						{myEvents.map((event) => (
							<Hosting key={event._id} event={event} />
						))}
					</div>
				</div>
				<div className='container'>
					<div className='toolbar'>
						<h4>Attending</h4>
					</div>
					<div className='event-list'>
						{attending.map((event) => (
							<Attending key={event.id} event={event} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Events;
