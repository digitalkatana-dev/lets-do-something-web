import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import { setMenuOpen } from '../../../../redux/slices/navSlice';
import { tagStyle, arrayMatch, objectMatch } from '../../../../util/helpers';
import { labelClasses } from '../../../../util/data';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import NotesIcon from '@mui/icons-material/Notes';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import UndoIcon from '@mui/icons-material/Undo';
import FormTabs from './components/FormTabs';
import './eventForm.scss';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const EventForm = () => {
	const { activeUser } = useSelector((state) => state.user);
	const { daySelected, selectedLabel } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handleSignIn = () => {
		dispatch(setMenuOpen(true));
	};

	return (
		<div id='event-form'>
			<h4>Create Event</h4>
			{!activeUser && (
				<>
					<div className='event-section alt'>
						<FormControl size='small' fullWidth>
							<InputLabel id=''>Event Type</InputLabel>
							<Select labelId='event-type' disabled value=''>
								<MenuItem value=''>
									<em>Sign in to create an event!</em>
								</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className='event-section'>
						<EventIcon className='icon space' />
						<h5>{dayjs(daySelected)?.format('dddd, MMMM DD')}</h5>
					</div>
					<div className='event-section'>
						<div className='no-user'>
							<div className='icon-container'>
								<p className='icon-label'>Time</p>
								<ScheduleIcon className='icon' />
							</div>
							<Button
								variant='text'
								className='sign-in-btn'
								onClick={handleSignIn}
							>
								Sign in to create an event!
							</Button>
						</div>
					</div>
					<div className='event-section'>
						<div className='no-user'>
							<div className='icon-container'>
								<p className='icon-label'>Location</p>
								<MyLocationIcon className='icon' />
							</div>
							<Button
								variant='text'
								className='sign-in-btn'
								onClick={handleSignIn}
							>
								Sign in to create an event!
							</Button>
						</div>
					</div>
					<div className='event-section'>
						<div className='no-user'>
							<div className='icon-container'>
								<p className='icon-label'>Notes</p>
								<NotesIcon className='icon' />
							</div>
							<Button
								variant='text'
								className='sign-in-btn'
								onClick={handleSignIn}
							>
								Sign in to create an event!
							</Button>
						</div>
					</div>
					<div className='event-section'>
						<BookmarkBorderIcon className='icon space' />
						<div className='tag-swatch'>
							{labelClasses.map((item, i) => (
								<span key={i} style={tagStyle(item)}>
									{selectedLabel === item && <CheckIcon fontSize='4' />}
								</span>
							))}
						</div>
					</div>
				</>
			)}
			{activeUser && <FormTabs />}
		</div>
	);
};

export default EventForm;
