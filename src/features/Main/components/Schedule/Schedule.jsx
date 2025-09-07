import { Alert, Snackbar } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearCalendarSuccess,
	clearCalendarErrors,
} from '../../../../redux/slices/calendarSlice';
import './schedule.scss';
import Calendar from './components/Calendar';
import GuestList from './components/GuestList';

const Schedule = () => {
	const [open, setOpen] = useState(false);
	const { success, errors } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handleClose = (alert) => {
		const alertActions = {
			success: clearCalendarSuccess,
			errors: clearCalendarErrors,
		};

		const action = alertActions[alert];

		if (action) {
			dispatch(action());
		}

		setOpen(false);
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			setOpen(true);
			setTimeout(() => {
				dispatch(clearCalendarSuccess());
			}, 5000);
		}
	}, [dispatch, success]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	useEffect(() => {
		errors?.message && setOpen(true);
	}, [errors]);

	return (
		<div className='schedule'>
			<Calendar />
			<GuestList />
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={() =>
					handleClose(success ? 'success' : errors?.message && 'error')
				}
			>
				<Alert severity={success ? 'success' : errors?.message && 'error'}>
					{success && success?.message}
					{errors?.message && errors?.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Schedule;
