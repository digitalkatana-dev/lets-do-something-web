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
	const { activeUser } = useSelector((state) => state.user);
	const { currentMonth, monthIndex } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handleEventsAttending = useCallback(() => {
		dispatch(setEventsAttending(activeUser?.eventsAttending));
	}, [activeUser, dispatch]);

	const handleGetEvents = useCallback(() => {
		!activeUser
			? dispatch(getAllEvents())
			: activeUser && dispatch(getInvitedEvents(activeUser?._id));
	}, [activeUser, dispatch]);

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
