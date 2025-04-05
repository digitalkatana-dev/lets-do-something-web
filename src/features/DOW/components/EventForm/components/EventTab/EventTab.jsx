import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import {
	setIsPublic,
	setRSVPOpen,
	setEventType,
	setEventTypeInput,
	setEventTime,
	setEventLoc,
	setEventNote,
	setInvitedGuestInput,
	setHeadcount,
	setSelectedLabel,
} from '../../../../../../redux/slices/calendarSlice';
import { formattedTime, tagStyle } from '../../../../../../util/helpers';
import { labelClasses } from '../../../../../../util/data';
import dayjs from 'dayjs';
import DetailsIcon from '@mui/icons-material/Details';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import TextInput from '../../../../../../transition/TextInput';

const EventTab = () => {
	const {
		daySelected,
		selectedEvent,
		isPublic,
		rsvpOpen,
		eventType,
		eventTypeInput,
		eventTime,
		eventLoc,
		eventNote,
		selectedLabel,
		errors,
	} = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handleChange = (input, value) => {
		const actionMap = {
			public: setIsPublic,
			available: setRSVPOpen,
			type: setEventType,
			other: setEventTypeInput,
			time: (v) => setEventTime(formattedTime(v)),
			loc: setEventLoc,
			notes: setEventNote,
			label: setSelectedLabel,
			guest: setInvitedGuestInput,
			count: setHeadcount,
		};

		const action = actionMap[input];

		if (action) {
			dispatch(action(value));
		}
	};

	return (
		<form>
			<div className='event-section alt'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<Typography>Private</Typography>
					<Switch
						checked={isPublic}
						onChange={() => handleChange('public', !isPublic)}
						color='secondary'
					/>
					<Typography>Public</Typography>
				</Stack>
			</div>
			<div className='event-section alt'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<Typography>RSVP Closed</Typography>
					<Switch
						checked={rsvpOpen}
						onChange={() => handleChange('available', !rsvpOpen)}
						color='secondary'
					/>
					<Typography>RSVP Open</Typography>
				</Stack>
			</div>
			<div className='event-section alt'>
				<FormControl size='small' fullWidth>
					<InputLabel id='event-type'>Event Type</InputLabel>
					<Select
						labelId='event-type'
						size='small'
						margin='dense'
						variant='standard'
						value={eventType}
						onChange={(e) => handleChange('type', e.target.value)}
					>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						<MenuItem value='Brunch'>Brunch</MenuItem>
						<MenuItem value='Dinner'>Dinner</MenuItem>
						<MenuItem value='Movies'>Movies</MenuItem>
						<MenuItem value='Game Night'>Game Night</MenuItem>
						<MenuItem value='Party'>Party</MenuItem>
						<MenuItem value='other'>Other</MenuItem>
					</Select>
				</FormControl>
				{eventType === 'other' && (
					<FormControl fullWidth>
						<TextInput
							style={{ marginTop: '15px' }}
							containerClass='standard'
							leftIcon={
								<InputAdornment position='start'>
									<DetailsIcon className='icon' />
								</InputAdornment>
							}
							placeholder='Go on...'
							value={eventTypeInput}
							onChange={(e) => handleChange('other', e.target.value)}
						/>
					</FormControl>
				)}
			</div>
			<div className='event-section'>
				<EventIcon className='icon space' />
				<h5>
					{selectedEvent ? (
						<>{dayjs(selectedEvent.date).format('dddd, MMMM DD')}</>
					) : (
						<>{dayjs(daySelected)?.format('dddd, MMMM DD')}</>
					)}
				</h5>
			</div>
			<div className='event-section'>
				<FormControl fullWidth>
					<TextInput
						containerClass='standard'
						leftIcon={
							<InputAdornment position='start'>
								<ScheduleIcon className='icon' />
							</InputAdornment>
						}
						placeholder='Time'
						value={dayjs(eventTime)}
						onChange={(value) => handleChange('time', value)}
						error={errors?.time}
					/>
				</FormControl>
			</div>
			<div className='event-section'>
				<FormControl fullWidth>
					<TextInput
						containerClass='standard'
						leftIcon={
							<InputAdornment position='start'>
								<MyLocationIcon className='icon' />
							</InputAdornment>
						}
						placeholder='Location'
						value={eventLoc}
						onChange={(e) => handleChange('loc', e.target.value)}
						error={errors?.location}
					/>
				</FormControl>
			</div>
			<div className='event-section'>
				<FormControl fullWidth>
					<TextInput
						containerClass='standard'
						leftIcon={
							<InputAdornment position='start'>
								<EditNoteIcon className='icon' />
							</InputAdornment>
						}
						placeholder='Notes'
						value={eventNote}
						onChange={(e) => handleChange('notes', e.target.value)}
						error={errors?.location}
					/>
				</FormControl>
			</div>
			<div className='event-section'>
				<BookmarkBorderIcon className='icon space' />
				<div className='tag-swatch'>
					{labelClasses.map((item, i) => (
						<span
							key={i}
							onClick={() => handleChange('label', item)}
							style={tagStyle(item)}
						>
							{selectedLabel === item && <CheckIcon fontSize='4' />}
						</span>
					))}
				</div>
			</div>
		</form>
	);
};

export default EventTab;
