/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCurrentMonth,
	getAllEvents,
	getInvitedEvents,
	setEventsAttending,
} from '../../../../../../redux/slices/calendarSlice';
import './calendar.scss';
import CalendarHead from './components/CalendarHead';
import Month from './components/Month';
import Sidebar from './components/Sidebar';
import EventModal from './components/EventModal';

const Calendar = () => {
	const { user } = useSelector((state) => state.user);
	const { currentMonth, monthIndex } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setEventsAttending(user?.eventsAttending));
	}, [user]);

	useEffect(() => {
		!user ? dispatch(getAllEvents()) : user && dispatch(getInvitedEvents());
	}, [user]);

	useEffect(() => {
		dispatch(setCurrentMonth(monthIndex));
	}, [monthIndex]);

	return (
		<>
			<EventModal />
			<div className='calendar'>
				<CalendarHead />
				<div className='container'>
					<Sidebar />
					<Month month={currentMonth} />
				</div>
			</div>
		</>
	);
};

export default Calendar;
