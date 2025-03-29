import {
	IconButton,
	MenuItem,
	Paper,
	Popover,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setDeleteData,
	openDelete,
} from '../../../../../../redux/slices/appSlice';
import {
	setDaySelected,
	setSelectedEvent,
	processRsvp,
	updateEvent,
	deleteEvent,
} from '../../../../../../redux/slices/calendarSlice';
import { getBackgroundColor } from '../../../../../../util/helpers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UndoIcon from '@mui/icons-material/Undo';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './event.scss';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const EventTemplate = ({ data, type }) => {
	const { activeUser } = useSelector((state) => state.user);
	const { success } = useSelector((state) => state.calendar);
	const [open, setOpen] = useState(null);
	const [checked, setChecked] = useState(null);
	const dispatch = useDispatch();
	const background = getBackgroundColor(data?.label);
	const isAttend = type === 'attend' ? true : false;
	const isHost = type === 'host' ? true : false;
	const currentDate = dayjs();
	const attendees = data?.attendees;
	const rsvp = attendees?.find((item) => item?._id === activeUser?._id);

	const handleRsvp = () => {
		let rsvpData = {
			_id: data?._id,
			user: activeUser?._id,
		};
		if (checked) {
			rsvpData.rsvpOpen = false;
			setChecked(false);
		} else if (!checked) {
			rsvpData.rsvpOpen = true;
			setChecked(true);
		}
		dispatch(updateEvent(rsvpData));
	};

	const handleOpenMenu = (event) => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
		dispatch(setDaySelected(null));
		dispatch(setSelectedEvent(null));
	};

	const handleCancel = () => {
		const rsvpData = {
			eventId: data?._id,
			headcount: rsvp?.headcount,
			user: activeUser?._id,
		};
		dispatch(processRsvp(rsvpData));
	};

	const handleEditClick = (item) => {
		const itemDay = `${dayjs(item.date).format(
			'ddd, DD MMM YYYY'
		)} 08:00:00 GMT`;
		const data = {
			day: itemDay,
			eventTime: item.time,
		};
		dispatch(setDaySelected(data));
		dispatch(setSelectedEvent(item));
		setOpen(false);
	};

	const handleDeleteClick = () => {
		const delInfo = {
			event: data._id,
			user: activeUser?._id,
		};

		const delData = {
			type: 'event',
			action: deleteEvent(delInfo),
		};

		dispatch(setDeleteData(delData));
		dispatch(openDelete(true));
		handleCloseMenu();
	};

	const loadEvent = useCallback(() => {
		setChecked(data?.rsvpOpen);
	}, [data]);

	const handleSuccess = useCallback(() => {
		if (success) {
			dispatch(openDelete(false));
		}
	}, [success, dispatch]);

	useEffect(() => {
		loadEvent();
	}, [loadEvent]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	return (
		<>
			<Paper
				className='event-template'
				elevation={7}
				style={{
					backgroundColor: background,
					fontWeight: 'bold',
				}}
			>
				<div className='event-info-container'>
					<p>
						{data.type} @ {data.location}
					</p>
					<p>
						{data.date} @ {dayjs(data.time).format('LT')}
					</p>
				</div>
				{isHost && (
					<>
						<div className='rsvp-container'>
							<h5>RSVP</h5>
							<Stack direction='row' spacing={1} alignItems='center'>
								<Typography>Closed</Typography>
								<Switch
									checked={checked}
									color='secondary'
									onChange={handleRsvp}
								/>
								<Typography>Open</Typography>
							</Stack>
						</div>
						<div className='host-action-container'>
							<IconButton edge='end' onClick={handleOpenMenu}>
								<MoreVertIcon />
							</IconButton>
						</div>
					</>
				)}
				{isAttend && (
					<div className='guest-action-container'>
						<IconButton edge='end' onClick={handleOpenMenu}>
							<MoreVertIcon />
						</IconButton>
					</div>
				)}
			</Paper>
			<Popover
				open={!!open}
				anchorEl={open}
				onClose={handleCloseMenu}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				slotProps={{ paper: { sx: { width: 140 } } }}
			>
				{isHost && (
					<>
						<MenuItem
							onClick={() => handleEditClick(data)}
							sx={{ color: 'steelblue' }}
						>
							<Stack direction='row' gap={1}>
								{currentDate.isBefore(dayjs(data?.date)) ? (
									<>
										<EditIcon />
										Edit
									</>
								) : (
									<>
										<AddAPhotoIcon />
										Upload
									</>
								)}
							</Stack>
						</MenuItem>

						<MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
							<Stack direction='row' gap={1}>
								<DeleteForeverIcon />
								Delete
							</Stack>
						</MenuItem>
					</>
				)}
				{isAttend && (
					<>
						{currentDate.isBefore(dayjs(data?.date)) && (
							<MenuItem onClick={handleCancel} sx={{ color: 'error.main' }}>
								<Stack direction='row' gap={1}>
									<UndoIcon />
									Cancel
								</Stack>
							</MenuItem>
						)}
						{currentDate.isAfter(dayjs(data?.date)) && (
							<MenuItem
								onClick={() => handleEditClick(data)}
								sx={{ color: 'steelblue' }}
							>
								<Stack direction='row' gap={1}>
									<AddAPhotoIcon />
									Upload
								</Stack>
							</MenuItem>
						)}
					</>
				)}
			</Popover>
		</>
	);
};

export default EventTemplate;
