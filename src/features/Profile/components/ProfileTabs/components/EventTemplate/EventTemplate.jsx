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
	updateEvent,
	deleteEvent,
} from '../../../../../../redux/slices/calendarSlice';
import { getBackgroundColor } from '../../../../../../util/helpers';
import dayjs from 'dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './event.scss';

const EventTemplate = ({ data, type }) => {
	const { user } = useSelector((state) => state.user);
	const { success } = useSelector((state) => state.calendar);
	const [open, setOpen] = useState(null);
	const [checked, setChecked] = useState(null);
	const dispatch = useDispatch();
	const background = getBackgroundColor(data?.label);
	const isAttend = type === 'attend' ? true : false;
	const isHost = type === 'host' ? true : false;

	const handleRsvp = () => {
		let rsvpData = {
			_id: data?._id,
			user: user?._id,
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
	};

	const handleDeleteClick = () => {
		const delInfo = {
			event: data._id,
			user: user?._id,
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
			</Paper>
			<Popover
				open={!!open}
				anchorEl={open}
				onClose={handleCloseMenu}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				slotProps={{ paper: { sx: { width: 140 } } }}
			>
				<MenuItem onClick={handleCloseMenu}>
					<EditIcon />
					Edit
				</MenuItem>

				<MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
					<DeleteForeverIcon />
					Delete
				</MenuItem>
			</Popover>
		</>
	);
};

export default EventTemplate;
