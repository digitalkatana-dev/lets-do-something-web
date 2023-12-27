import { useCallback, useEffect } from 'react';
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

const Calendar = () => {
	const { user } = useSelector((state) => state.user);
	const { currentMonth, monthIndex } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handleEventsAttending = useCallback(() => {
		dispatch(setEventsAttending(user?.eventsAttending));
	}, [user, dispatch]);

	const handleGetEvents = useCallback(() => {
		!user
			? dispatch(getAllEvents())
			: user && dispatch(getInvitedEvents(user?._id));
	}, [user, dispatch]);

	const handleCurrentMonth = useCallback(() => {
		dispatch(setCurrentMonth(monthIndex));
	}, [monthIndex, dispatch]);

	useEffect(() => {
		handleEventsAttending();
	}, [handleEventsAttending]);

	useEffect(() => {
		handleGetEvents();
	}, [handleGetEvents]);

	useEffect(() => {
		handleCurrentMonth();
	}, [handleCurrentMonth]);

	return (
		<>
			<div id='calendar'>
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
