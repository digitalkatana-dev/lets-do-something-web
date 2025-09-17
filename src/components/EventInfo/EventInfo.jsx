import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Alert,
	Button,
	DialogContentText,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { setMenuOpen } from '../../redux/slices/navSlice';
import {
	toggleOpen,
	createEvent,
	updateEvent,
	processRsvp,
	setSelectedEvent,
	setSelectedFriend,
	setHeadcount,
	clearCalendarErrors,
	setEventTime,
} from '../../redux/slices/calendarSlice';
import { createMemory } from '../../redux/slices/memorySlice';
import {
	tagStyle,
	arrayMatch,
	objectMatch,
	defaultTime,
} from '../../util/helpers';
import { labelClasses } from '../../util/data';
import Cropper from 'react-cropper';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import NotesIcon from '@mui/icons-material/Notes';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import UndoIcon from '@mui/icons-material/Undo';
import './eventInfo.scss';
import IconBtn from '../IconBtn';
import EventInfoTabs from './components/EventInfoTabs';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const EventInfo = () => {
	const {
		open,
		daySelected,
		eventsAttending,
		selectedEvent,
		isPublic,
		rsvpOpen,
		eventType,
		eventTypeInput,
		eventTime,
		eventLoc,
		eventNote,
		invitedGuests,
		headcount,
		selectedLabel,
		errors,
	} = useSelector((state) => state.calendar);
	const { success } = useSelector((state) => state.memory);
	const { activeUser } = useSelector((state) => state.user);
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [cropped, setCropped] = useState(null);
	const [warning, setWarning] = useState(false);
	const cropperRef = useRef(null);
	const eventAuthor = selectedEvent?.createdBy?._id;
	const currentUser = activeUser?._id;
	const isAttending = eventsAttending?.some(
		(event) => event._id === selectedEvent?._id
	);
	const attendees = selectedEvent?.attendees;
	const rsvp = attendees?.find((item) => item?._id === activeUser?._id);
	const rsvpGuests = rsvp?.headcount - 1;
	const rsvpMessage = `${
		activeUser?.firstName
	}, you are all set! We have received your RSVP and can't wait to see you${
		rsvpGuests === 0
			? '!'
			: ` and your ${rsvpGuests === 1 ? 'guest' : `${rsvpGuests} guests`}!`
	}`;
	const currentDate = dayjs();
	const isBeforeCheck = dayjs(eventTime).isSameOrBefore(dayjs(daySelected));
	const dispatch = useDispatch();

	const handleDisabled = () => {
		let data = {
			isPublic: isPublic,
			rsvpOpen: rsvpOpen,
			type: eventType === 'other' ? eventTypeInput : eventType,
			time: eventTime.split('T')[1],
			location: eventLoc,
			notes: eventNote,
			label: selectedLabel,
		};
		let check = {
			isPublic: selectedEvent?.isPublic,
			rsvpOpen: selectedEvent?.rsvpOpen,
			type: selectedEvent?.type,
			time: selectedEvent?.time.split('T')[1],
			location: selectedEvent?.location,
			notes: selectedEvent?.notes,
			label: selectedEvent?.label,
		};

		if (!selectedEvent) {
			if (!eventType || !eventTime || !eventLoc) return true;
		} else if (selectedEvent && eventAuthor === currentUser) {
			if (objectMatch(data, check)) return true;
		} else if (selectedEvent && eventAuthor !== currentUser) {
			if (!headcount) return true;
		}

		return false;
	};

	const handleClose = () => {
		const itemDay = `${dayjs(daySelected).format(
			'ddd, DD MMM YYYY'
		)} 08:00:00 GMT`;
		dispatch(setSelectedEvent(null));
		dispatch(setEventTime(defaultTime(itemDay)));
		// dispatch(toggleOpen(false));
		// setTimeout(() => {
		// 	dispatch(setSelectedEvent(null));
		// 	dispatch(setSelectedFriend(null));
		// }, 500);
	};

	const handleSignIn = () => {
		dispatch(setMenuOpen(true));
		dispatch(toggleOpen(false));
	};

	const handleFocus = () => {
		dispatch(clearCalendarErrors());
	};

	const handleChange = (e) => {
		dispatch(setHeadcount(e.target.value));
	};

	const onCrop = () => {
		const cropper = cropperRef.current?.cropper;
		setCropped(cropper.getCroppedCanvas());
	};

	const handleFileChange = (selectedFile) => {
		setFile(selectedFile);

		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setPreview(null);
			setCropped(null);
		}
	};

	const handleAddMemory = () => {
		cropped.toBlob((blob) => {
			let memory = new FormData();
			memory.append('memory', blob, file.name);
			memory.append('date', selectedEvent?.date);
			memory.append('location', selectedEvent?.location);
			memory.append('eventId', selectedEvent._id);
			dispatch(createMemory(memory));
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let data;
		if (!selectedEvent) {
			if (invitedGuests.length === 0 && !warning) {
				setWarning(true);
			} else {
				data = {
					date: dayjs(daySelected).format('M/DD/YYYY'),
					isPublic,
					...(isPublic && { rsvpOpen }),
					type: eventType === 'other' ? eventTypeInput : eventType,
					time: eventTime,
					location: eventLoc,
					notes: eventNote,
					label: selectedLabel,
					invitedGuests,
					createdBy: activeUser?._id,
				};
				dispatch(createEvent(data));
				setWarning(false);
			}
		} else if (selectedEvent && eventAuthor === currentUser) {
			data = {
				_id: selectedEvent?._id,
				...(isPublic !== selectedEvent?.isPublic && { isPublic }),
				...(isPublic && rsvpOpen !== selectedEvent?.rsvpOpen && { rsvpOpen }),
				...(eventType !== selectedEvent?.type && {
					type: eventType === 'other' ? eventTypeInput : eventType,
				}),
				...(eventTime !== selectedEvent?.time && { time: eventTime }),
				...(eventLoc !== selectedEvent?.location && { location: eventLoc }),
				...(eventNote !== selectedEvent?.notes && { notes: eventNote }),
				...(selectedLabel !== selectedEvent?.label && {
					label: selectedLabel,
				}),
				...(!arrayMatch(invitedGuests, selectedEvent?.invitedGuests) && {
					invitedGuests,
				}),
				user: activeUser?._id,
			};
			dispatch(updateEvent(data));
		} else {
			data = {
				eventId: selectedEvent?._id,
				headcount,
				user: activeUser?._id,
				isAttending,
			};
			dispatch(processRsvp(data));
		}
	};

	const handleCancel = () => {
		const data = {
			eventId: selectedEvent?._id,
			headcount: rsvp?.headcount,
			user: activeUser?._id,
		};
		dispatch(processRsvp(data));
	};

	const handleClearWarning = () => {
		setWarning(false);
	};

	useEffect(() => {
		if (success) {
			setFile(null);
			setPreview(null);
			setCropped(null);
		}
	}, [success]);

	// console.log(isBefore);

	return (
		<div id='eventInfo'>
			{activeUser && selectedEvent && (
				<IconBtn id='event-close-btn' onClick={handleClose}>
					<CloseIcon />
				</IconBtn>
			)}
			{/* <section className='header'>
				<DragHandleIcon />
				<span className='header-content'>
					{!activeUser && <>{!selectedEvent ? 'Create' : 'RSVP'}</>}
					{activeUser && (
						<>
							{!selectedEvent
								? 'Create'
								: selectedEvent && eventAuthor === currentUser
								? 'Manage'
								: selectedEvent && eventAuthor !== currentUser
								? 'RSVP'
								: null}
						</>
					)}
				</span>
				<IconBtn onClick={handleClose}>
					<CloseIcon />
				</IconBtn>
			</section> */}
			<section className='form'>
				<form action=''>
					{!activeUser && (
						<>
							{!selectedEvent ? (
								<>
									<section className='event-section alt'>
										<FormControl variant='standard' size='small' fullWidth>
											<InputLabel id='event-type'>Event Type</InputLabel>
											<Select labelId='event-type' disabled value=''>
												<MenuItem value=''>
													<em>Sign in to create an event!</em>
												</MenuItem>
											</Select>
										</FormControl>
									</section>
									<section className='event-section'>
										<EventIcon className='icon space' />
										<h5>{dayjs(daySelected)?.format('dddd, MMMM DD')}</h5>
									</section>
									<section className='event-section'>
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
									</section>
									<section className='event-section'>
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
									</section>
									<section className='event-section'>
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
									</section>
									<section className='event-section'>
										<BookmarkBorderIcon className='icon space' />
										<div className='tag-swatch'>
											{labelClasses.map((item, i) => (
												<span key={i} style={tagStyle(item)}>
													{selectedLabel === item && <CheckIcon fontSize='4' />}
												</span>
											))}
										</div>
									</section>
								</>
							) : (
								<>
									<h3 className='rsvp-details'>
										{selectedEvent?.type} @ {selectedEvent?.location}
									</h3>
									<h4 className='rsvp-details'>
										Hosted by:{' '}
										{selectedEvent?.createdBy?.firstName +
											' ' +
											selectedEvent?.createdBy?.lastName}
									</h4>
									<section className='event-section'>
										<EventIcon className='icon space' />
										<h5>
											{dayjs(selectedEvent?.date).format('dddd, MMMM DD')}
										</h5>
									</section>
									<section className='event-section'>
										<ScheduleIcon className='icon space' />
										<h5>{dayjs(selectedEvent?.time).format('LT')}</h5>
									</section>
									<section className='event-section'>
										<MyLocationIcon className='icon space' />
										<h5>{selectedEvent?.location}</h5>
									</section>
									<section className='event-section'>
										<div className='icon-container'>
											<NotesIcon className='icon' />
										</div>
										<Button
											variant='text'
											className='sign-in-btn'
											onClick={handleSignIn}
										>
											Sign in to RSVP!
										</Button>
									</section>
									<section className='event-section'>
										<div className='no-user'>
											<div className='icon-container'>
												<p className='icon-label'>Headcount</p>
												<GroupAddIcon className='icon' />
											</div>
										</div>
									</section>
								</>
							)}
						</>
					)}
					{activeUser && (
						<>
							{!selectedEvent ||
							(selectedEvent && eventAuthor === currentUser) ? (
								<>
									<EventInfoTabs />
								</>
							) : (
								<>
									<h3 className='rsvp-details'>
										{selectedEvent?.type} @ {selectedEvent?.location}
									</h3>
									<h4 className='rsvp-details'>
										Hosted by:{' '}
										{selectedEvent?.createdBy.firstName +
											' ' +
											selectedEvent?.createdBy.lastName}
									</h4>
									<section className='event-section'>
										<EventIcon className='icon space' />
										<h5>
											{selectedEvent ? (
												<>{dayjs(selectedEvent.date).format('dddd, MMMM DD')}</>
											) : (
												<>{dayjs(daySelected)?.format('dddd, MMMM DD')}</>
											)}
										</h5>
									</section>
									<section className='event-section'>
										<ScheduleIcon className='icon space' />
										<h5>
											{selectedEvent ? (
												<>{dayjs(selectedEvent.time).format('LT')}</>
											) : (
												<>TBD</>
											)}
										</h5>
									</section>
									<section className='event-section'>
										<MyLocationIcon className='icon space' />
										<h5>{selectedEvent ? selectedEvent.location : 'TBD'}</h5>
									</section>
									<section className='event-section'>
										<NotesIcon className='icon space' />
										<h6>
											{selectedEvent?.notes
												? selectedEvent?.notes
												: 'No notes!'}
										</h6>
									</section>
									{isAttending &&
									currentDate.isBefore(dayjs(selectedEvent?.date)) ? (
										<DialogContentText textAlign='center'>
											{rsvpMessage}
										</DialogContentText>
									) : isAttending &&
									  currentDate.isAfter(dayjs(selectedEvent?.date)) ? (
										<>
											<DialogContentText textAlign='center'>
												Hello, {activeUser.firstName}! We hope you enjoyed{' '}
												{selectedEvent?.type}! If you took any photos, feel free
												to upload them below.
											</DialogContentText>
											<div className='event-section alt'>
												<MuiFileInput
													placeholder='Click to Upload Memory'
													size='small'
													margin='dense'
													variant='standard'
													fullWidth
													value={file}
													onChange={handleFileChange}
												/>
												<div className='image-preview-container'>
													{preview && (
														<Cropper
															src={preview}
															initialAspectRatio={16 / 9}
															guides={false}
															background={false}
															crop={onCrop}
															ref={cropperRef}
														/>
													)}
												</div>
												<Button disabled={!cropped} onClick={handleAddMemory}>
													Create Memory
												</Button>
											</div>
										</>
									) : (
										<>
											<h4 textAlign='center'>
												Hello, {activeUser.firstName}! How many in your party?
											</h4>
											<TextField
												disabled={
													!selectedEvent ||
													(selectedEvent?.isPublic && !selectedEvent?.rsvpOpen)
												}
												label='Headcount'
												placeholder={
													!selectedEvent?.rsvpOpen
														? 'RSVP Currently Closed'
														: ''
												}
												size='small'
												margin='dense'
												variant='standard'
												fullWidth
												value={headcount}
												onChange={handleChange}
												sx={{ marginTop: '15px' }}
												onFocus={handleFocus}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<GroupAddIcon className='icon' />
														</InputAdornment>
													),
												}}
											/>
											{errors?.headcount && (
												<h6 className='error'>{errors?.headcount}</h6>
											)}
										</>
									)}
								</>
							)}
						</>
					)}
					{/* {activeUser && isBeforeCheck ? (
						<>
							{selectedEvent && isAttending ? (
								<IconBtn tooltip='Undo' placement='left' onClick={handleCancel}>
									<UndoIcon className='undo' />
								</IconBtn>
							) : (
								<>
									{warning ? (
										<Alert
											severity='warning'
											action={
												<div className='action-container'>
													<Button onClick={handleClearWarning}>Cancel</Button>
													<Button onClick={handleSubmit}>Proceed</Button>
												</div>
											}
											style={{ width: '100%' }}
										>
											Don't forget to invite friends!
										</Alert>
									) : (
										<Button disabled={handleDisabled()} onClick={handleSubmit}>
											Submit
										</Button>
									)}
								</>
							)}
						</>
					) : (
						activeUser &&
						dayjs(daySelected).isSameOrBefore(currentDate, 'day') &&
						null
					)} */}
					{activeUser && isBeforeCheck && (
						<>
							{selectedEvent && isAttending ? (
								<IconBtn tooltip='Undo' placement='left' onClick={handleCancel}>
									<UndoIcon className='undo' />
								</IconBtn>
							) : (
								<>
									{warning ? (
										<Alert
											severity='warning'
											action={
												<div className='action-container'>
													<Button onClick={handleClearWarning}>Cancel</Button>
													<Button onClick={handleSubmit}>Proceed</Button>
												</div>
											}
											style={{ width: '100%' }}
										>
											Don't forget to invite friends!
										</Alert>
									) : (
										<Button disabled={handleDisabled()} onClick={handleSubmit}>
											Submit
										</Button>
									)}
								</>
							)}
						</>
					)}
				</form>
			</section>
		</div>
	);
};

export default EventInfo;
