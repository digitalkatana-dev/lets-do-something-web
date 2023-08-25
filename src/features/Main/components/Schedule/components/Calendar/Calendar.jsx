/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCurrentMonth,
	getAllEvents,
	getInvitedEvents,
	setEventsAttending,
	clearSuccess,
	clearErrors,
} from '../../../../../../redux/slices/calendarSlice';
import './calendar.scss';
import CalendarHead from './components/CalendarHead';
import Month from './components/Month';
import Sidebar from './components/Sidebar';
import EventModal from './components/EventModal';

const Calendar = () => {
	const { user } = useSelector((state) => state.user);
	const { currentMonth, monthIndex, success, errors } = useSelector(
		(state) => state.calendar
	);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const handleClose = (alert) => {
		switch (alert) {
			case 'success':
				dispatch(clearSuccess());
				break;

			case 'errors':
				dispatch(clearErrors());
				break;

			default:
				break;
		}
		setOpen(false);
	};

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
			{success?.message && (
				<Snackbar
					open={open}
					autoHideDuration={7000}
					onClose={() => handleClose('success')}
				>
					<Alert severity='success'>{success.message}</Alert>
				</Snackbar>
			)}
			{errors?.event && (
				<Snackbar
					open={open}
					autoHideDuration={7000}
					onClose={() => handleClose('errors')}
				>
					<Alert severity='error'>{errors.event}</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default Calendar;
