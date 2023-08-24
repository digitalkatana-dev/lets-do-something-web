import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EventAccordion from './components/EventAccordion';
import EventTable from './components/EventTable';
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
							<EventAccordion key={event._id} event={event} />
						))}
					</div>
				</div>
				<div className='container'>
					<div className='toolbar'>
						<h4>Attending</h4>
					</div>
					<div className='event-list'>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 600 }} size='small'>
								<TableHead>
									<TableRow className='table-head'>
										<TableCell align='center' className='head-cell'>
											Event
										</TableCell>
										<TableCell align='center' className='head-cell'>
											RSVP Open
										</TableCell>
										<TableCell align='center' className='head-cell'>
											Delete
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{myEvents.map((event) => (
										<EventTable key={event._id} event={event} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Events;
