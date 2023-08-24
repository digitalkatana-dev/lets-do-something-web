/* eslint-disable react-hooks/exhaustive-deps */
import {
	IconButton,
	TableCell,
	TableRow,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUser,
	clearErrors,
	clearSuccess,
} from '../../../../../../redux/slices/userSlice';
import { updateEvent } from '../../../../../../redux/slices/calendarSlice';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import './eventTable.scss';

const EventTable = ({ event }) => {
	const { user } = useSelector((state) => state.user);
	// const { success, errors } = useSelector((state) => state.calendar);
	const success = null;
	const errors = null;
	const [rsvpOpen, setRsvpOpen] = useState(event.rsvpOpen);
	const [overflow, setOverflow] = useState(false);
	const parentRef = useRef(null);
	const dispatch = useDispatch();

	const eventDeets =
		event?.type +
		' ' +
		event?.date +
		' ' +
		dayjs(event?.time).format('LT') +
		' ' +
		event?.location;

	useEffect(() => {
		const parentElement = parentRef.current;

		if (parentElement) {
			const isOverflowing =
				parentElement.scrollWidth > parentElement.clientWidth;
			setOverflow(isOverflowing);
		}
	}, []);

	useEffect(() => {
		const handleUpdate = () => {
			const data = {
				_id: event._id,
				rsvpOpen,
			};
			dispatch(updateEvent(data));
		};

		if (rsvpOpen !== event?.rsvpOpen) {
			handleUpdate();
		}
	}, [event, rsvpOpen]);

	useEffect(() => {
		if (success) {
			dispatch(getUser(user?._id));
			dispatch(clearSuccess());
		}
	}, [success, user]);

	useEffect(() => {
		if (errors) {
			dispatch(getUser(user?._id));
			dispatch(clearErrors());
		}
	}, [errors, user]);

	return (
		<TableRow
			sx={{
				'&:last-child td, &:last-child th': { border: 0 },
				backgroundColor: event?.label,
			}}
			className='table-row'
		>
			<TableCell
				component='th'
				scope='row'
				className='table-cell event-details'
			>
				<h4
					className={
						overflow ? 'contents white-txt scroll' : 'contents white-txt'
					}
					ref={parentRef}
				>
					{eventDeets.trim()}
				</h4>
			</TableCell>
			<TableCell align='center' className='table-cell'>
				{event?.isPublic ? (
					<div className='switch-container'>
						<Stack direction='row' spacing={1} alignItems='center'>
							<Typography className='white-txt'>Closed</Typography>
							<Switch
								checked={rsvpOpen}
								onChange={() => setRsvpOpen(!rsvpOpen)}
								color='default'
							/>
							<Typography className='white-txt'>Open</Typography>
						</Stack>
					</div>
				) : (
					<h4 className='white-txt'>N/A</h4>
				)}
			</TableCell>
			<TableCell align='center' className='table-cell'>
				<IconButton style={{ backgroundColor: 'whitesmoke' }}>
					<DeleteIcon htmlColor='red' />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default EventTable;
