/* eslint-disable react-hooks/exhaustive-deps */
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputAdornment,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import { TimeField } from '@mui/x-date-pickers';
import { MuiFileInput } from 'mui-file-input';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleOpen,
	createEvent,
	updateEvent,
	attendEvent,
	cancelRsvp,
	deleteEvent,
	uploadMemory,
} from '../../../../../../../../redux/slices/calendarSlice';
import {
	setSelectedEvent,
	setIsPublic,
	setRSVPOpen,
	setEventType,
	setEventTypeInput,
	setEventTime,
	setEventLoc,
	setInvitedGuestInput,
	findGuest,
	removeInvitedGuest,
	setHeadcount,
	setSelectedLabel,
	sendReminders,
	inviteSingle,
	setErrors,
	clearEvent,
	clearErrors,
} from '../../../../../../../../redux/slices/eventSlice';
import { labelClasses } from '../../../../../../../../util/data';
import { validateInvitedGuest } from '../../../../../../../../util/validators';
import {
	formattedTime,
	alreadyAttending,
	tagStyle,
	base64Encode,
} from '../../../../../../../../util/helpers';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import CloseIcon from '@mui/icons-material/Close';
import DetailsIcon from '@mui/icons-material/Details';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './eventModal.scss';
import IconBtn from '../../../../../../../../components/IconBtn';
dayjs.extend(isSameOrBefore);

const EventModal = () => {
	const { user } = useSelector((state) => state.user);
	const { open, daySelected, eventsAttending } = useSelector(
		(state) => state.calendar
	);
	const {
		selectedEvent,
		isPublic,
		rsvpOpen,
		eventType,
		eventTypeInput,
		eventTime,
		eventLoc,
		invitedGuestInput,
		invitedGuests,
		headcount,
		selectedLabel,
		errors,
	} = useSelector((state) => state.event);
	const [file, setFile] = useState(null);
	const [base64File, setBase64File] = useState('');
	const eventAuthor = selectedEvent?.createdBy;
	const currentUser = user?._id;
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(toggleOpen(false));
		setTimeout(() => {
			dispatch(setSelectedEvent(null));
		}, 1000);
	};

	const handleChange = (input, value) => {
		switch (input) {
			case 'public':
				dispatch(setIsPublic(value));
				break;

			case 'available':
				dispatch(setRSVPOpen(value));
				break;

			case 'type':
				dispatch(setEventType(value));
				break;

			case 'other':
				dispatch(setEventTypeInput(value));
				break;

			case 'time':
				dispatch(setEventTime(formattedTime(value)));
				break;

			case 'loc':
				dispatch(setEventLoc(value));
				break;

			case 'label':
				dispatch(setSelectedLabel(value));
				break;

			case 'guest':
				dispatch(setInvitedGuestInput(value));
				break;

			case 'count':
				dispatch(setHeadcount(value));
				break;

			case 'pic':
				setFile(value);
				break;

			default:
				break;
		}
	};

	const handleAddGuest = () => {
		const data = {
			guest: invitedGuestInput,
		};

		const { valid, errors } = validateInvitedGuest(invitedGuestInput);

		if (!valid) {
			dispatch(setErrors(errors));
		} else {
			dispatch(findGuest(data));
		}
	};

	const handleAddMemory = () => {
		const memory = new FormData();
		const filename = file.name;
		memory.append('name', filename);
		memory.append('file', file);
		memory.append('b64str', base64File);
		memory.append('date', selectedEvent?.date);
		memory.append('location', selectedEvent?.location);
		memory.append('eventId', selectedEvent._id);
		// for (var pair of memory.entries()) {
		// 	console.log('Memory', pair[1]);
		// }
		dispatch(uploadMemory(memory));
		setFile(null);
	};

	const handleReminders = () => {
		const data = {
			eventId: selectedEvent?._id,
		};
		dispatch(sendReminders(data));
	};

	const handleInvite = (item) => {
		const data = {
			type: selectedEvent?.type,
			date: selectedEvent?.date,
			time: selectedEvent?.time,
			guest: item,
		};

		dispatch(inviteSingle(data));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let data;
		if (!selectedEvent) {
			data = {
				date: dayjs(daySelected).format('M/DD/YYYY'),
				isPublic,
				...(isPublic && { rsvpOpen }),
				type: eventType === 'other' ? eventTypeInput : eventType,
				time: eventTime,
				location: eventLoc,
				label: selectedLabel,
				invitedGuests: [
					{
						_id: user?._id,
						firstName: user?.firstName,
						lastName: user?.lastName,
					},
					...invitedGuests,
				],
			};
			dispatch(createEvent(data));
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
				...(selectedLabel !== selectedEvent?.label && {
					label: selectedLabel,
				}),
				...(invitedGuests !== selectedEvent?.invitedGuests && {
					invitedGuests,
				}),
			};
			dispatch(updateEvent(data));
		} else if (selectedEvent) {
			data = {
				eventId: selectedEvent?._id,
				headcount,
				user: user?._id,
			};
			dispatch(attendEvent(data));
		}
	};

	const handleUndo = () => {
		const data = {
			eventId: selectedEvent?._id,
			user: user?._id,
		};
		dispatch(cancelRsvp(data));
	};

	const handleDelete = () => {
		const data = {
			event: selectedEvent?._id,
			user: user?._id,
		};
		dispatch(deleteEvent(data));
	};

	// useEffect(() => {
	// 	if (success) dispatch(clearEvent());
	// }, [success]);

	useEffect(() => {
		if (selectedEvent) dispatch(setEventTime(selectedEvent?.time));
	}, [selectedEvent]);

	base64Encode(file, setBase64File);

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
			<DialogTitle className='title'>
				<DragHandleIcon />
				<div className='content-switch'>
					<h6>
						{!user && <>{!selectedEvent ? 'Create' : 'RSVP'}</>}
						{user && (
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
					</h6>
				</div>
				<IconBtn tooltip='Close' onClick={handleClose}>
					<CloseIcon />
				</IconBtn>
			</DialogTitle>
			<DialogContent>
				<FormControl variant='standard' size='small' fullWidth>
					{!user && (
						<>
							{!selectedEvent ? (
								<>
									<div className='event-section alt'>
										<InputLabel id='event-type'>Event Type</InputLabel>
										<Select labelId='event-type' disabled value='' fullWidth>
											<MenuItem value=''>
												<em>Sign in to create an event!</em>
											</MenuItem>
										</Select>
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
										<TextField
											disabled
											label='Time'
											variant='standard'
											value='Sign in to create an event!'
											fullWidth
											size='small'
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<ScheduleIcon className='icon' />
													</InputAdornment>
												),
											}}
										/>
									</div>
									<div className='event-section'>
										<TextField
											disabled
											label='Location'
											variant='standard'
											value='Sign in to create an event!'
											fullWidth
											size='small'
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<MyLocationIcon className='icon' />
													</InputAdornment>
												),
											}}
										/>
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
									<div className='event-section alt'>
										<div className='input-btn-row'>
											<TextField
												disabled
												label='Invite Guests'
												variant='standard'
												value='Sign in to create an event!'
												fullWidth
												size='small'
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<PersonAddIcon className='icon' />
														</InputAdornment>
													),
												}}
											/>
											<IconBtn disabled>
												<AddBoxIcon className='add-icon' />
											</IconBtn>
										</div>
									</div>
								</>
							) : (
								<>
									<DialogContentText className='rsvp-details'>
										{selectedEvent?.type} @ {selectedEvent?.location}
									</DialogContentText>
									<DialogContentText className='rsvp-details'>
										Hosted by:{' '}
										{selectedEvent?.invitedGuests[0].firstName +
											' ' +
											selectedEvent?.invitedGuests[0].lastName}
									</DialogContentText>
									<div className='event-section'>
										<EventIcon className='icon space' />
										<h5>
											{dayjs(selectedEvent?.date).format('dddd, MMMM DD')}
										</h5>
									</div>
									<div className='event-section'>
										<ScheduleIcon className='icon space' />
										<h5>{dayjs(selectedEvent?.time).format('LT')}</h5>
									</div>
									<div className='event-section'>
										<MyLocationIcon className='icon space' />
										<h5>{selectedEvent?.location}</h5>
									</div>
									<DialogContentText className='rsvp-details sign-in-warning'>
										{' '}
										Sign in to RSVP!
									</DialogContentText>
									<TextField
										disabled
										label='Headcount'
										variant='standard'
										size='small'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<GroupAddIcon className='icon' />
												</InputAdornment>
											),
										}}
									/>
								</>
							)}
						</>
					)}
					{user && (
						<>
							{!selectedEvent ||
							(selectedEvent && eventAuthor === currentUser) ? (
								<>
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
									{isPublic && (
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
									)}
									<div className='event-section alt'>
										<FormControl variant='standard' size='small' fullWidth>
											<InputLabel id='event-type'>Event Type</InputLabel>
											<Select
												labelId='event-type'
												value={eventType}
												onChange={(e) => handleChange('type', e.target.value)}
												fullWidth
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
											<TextField
												label='Go on...'
												variant='standard'
												value={eventTypeInput}
												onChange={(e) => handleChange('other', e.target.value)}
												fullWidth
												sx={{ mt: '15px' }}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<DetailsIcon className='icon' />
														</InputAdornment>
													),
												}}
											/>
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
										<TimeField
											label='Time'
											variant='standard'
											value={dayjs(eventTime)}
											onChange={(value) => handleChange('time', value)}
											fullWidth
											size='small'
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<ScheduleIcon className='icon' />
													</InputAdornment>
												),
											}}
										/>
										{errors && errors.time && (
											<h6 className='error'>{errors.time}</h6>
										)}
									</div>
									<div className='event-section'>
										<TextField
											label='Location'
											variant='standard'
											value={eventLoc}
											onChange={(e) => handleChange('loc', e.target.value)}
											fullWidth
											size='small'
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<MyLocationIcon className='icon' />
													</InputAdornment>
												),
											}}
										/>
										{errors && errors.location && (
											<h6 className='error'>{errors.location}</h6>
										)}
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
									{selectedEvent &&
									dayjs(selectedEvent?.date).isSameOrBefore(
										new Date(),
										'day'
									) ? (
										<div className='event-section alt'>
											<div className='input-btn-row'>
												<MuiFileInput
													label='Upload Pic'
													placeholder='Click to choose file'
													variant='standard'
													value={file}
													onChange={(file) => handleChange('pic', file)}
													fullWidth
													size='small'
												/>
												<IconBtn disabled={!file} onClick={handleAddMemory}>
													<AddAPhotoIcon className='add-icon' />
												</IconBtn>
											</div>
										</div>
									) : (
										<div className='event-section alt'>
											<div className='input-btn-row'>
												<TextField
													label='Invite Guests'
													placeholder='Email Or Phone'
													variant='standard'
													value={invitedGuestInput}
													onChange={(e) =>
														handleChange('guest', e.target.value)
													}
													fullWidth
													size='small'
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>
																<PersonAddIcon className='icon' />
															</InputAdornment>
														),
													}}
													onFocus={() => dispatch(clearErrors())}
												/>
												<IconBtn
													tooltip='Add Guest'
													placement='top'
													disabled={!invitedGuestInput}
													onClick={handleAddGuest}
												>
													<AddBoxIcon className='add-icon' />
												</IconBtn>
											</div>
											{errors && errors.guest && (
												<h6 className='error'>{errors.guest}</h6>
											)}
											{invitedGuests.length > 0 && (
												<List className='list'>
													<ListItem disablePadding className='invited-guests'>
														<ListItemText secondary='Invited Guests' />
														{selectedEvent && eventAuthor === currentUser && (
															<IconBtn
																tooltip='Send Reminders'
																placement='top'
																onClick={handleReminders}
															>
																<SendToMobileIcon htmlColor='steelblue' />
															</IconBtn>
														)}
													</ListItem>
													{invitedGuests
														?.filter((item) => item._id !== user._id)
														.map((item) => {
															if (item?.firstName) {
																return (
																	<ListItem
																		disablePadding
																		className='list-item'
																		key={item._id}
																	>
																		<ListItemText
																			primary={`${item.firstName} ${item.lastName}`}
																		/>
																		{selectedEvent &&
																			eventAuthor === currentUser && (
																				<IconBtn
																					tooltip='Send Invite'
																					placement='top'
																					onClick={() => handleInvite(item)}
																				>
																					<SendToMobileIcon htmlColor='steelblue' />
																				</IconBtn>
																			)}
																		<IconBtn
																			tooltip='Delete Guest'
																			placement='top'
																			onClick={() =>
																				dispatch(removeInvitedGuest(item))
																			}
																		>
																			<DeleteIcon htmlColor='red' />
																		</IconBtn>
																	</ListItem>
																);
															} else {
																return (
																	<ListItem
																		disablePadding
																		className='list-item'
																		key={item._id}
																	>
																		<ListItemText
																			primary={
																				item?.phone ? item?.phone : item?.email
																			}
																		/>
																		{selectedEvent &&
																			eventAuthor === currentUser && (
																				<IconBtn
																					tooltip='Send Invite'
																					placement='top'
																					onClick={() => handleInvite(item)}
																				>
																					<SendToMobileIcon htmlColor='steelblue' />
																				</IconBtn>
																			)}
																		<IconBtn
																			tooltip='Delete Guest'
																			placement='top'
																			onClick={() =>
																				dispatch(removeInvitedGuest(item))
																			}
																		>
																			<DeleteIcon htmlColor='red' />
																		</IconBtn>
																	</ListItem>
																);
															}
														})}
												</List>
											)}
										</div>
									)}
								</>
							) : (
								<>
									<div className='event-section'>
										<LocalActivityIcon className='icon space' />
										<h5>{selectedEvent?.type}</h5>
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
										<ScheduleIcon className='icon space' />
										<h5>
											{selectedEvent ? (
												<>{dayjs(selectedEvent.time).format('LT')}</>
											) : (
												<>TBD</>
											)}
										</h5>
									</div>
									<div className='event-section'>
										<MyLocationIcon className='icon space' />
										<h5>
											{selectedEvent ? <>{selectedEvent.location}</> : 'TBD'}
										</h5>
									</div>
									{alreadyAttending(eventsAttending, selectedEvent) ? (
										<>
											<DialogContentText>
												RSVP received, you're all set!
											</DialogContentText>
										</>
									) : (
										<>
											{selectedEvent &&
											dayjs(selectedEvent?.date).isSameOrBefore(
												new Date(),
												'day'
											) ? (
												<>
													<DialogContentText>
														Hello, {user.firstName}!
													</DialogContentText>
													<div className='event-section alt'>
														<div className='input-btn-row'>
															<MuiFileInput
																label='Upload Pic'
																placeholder='Click to choose file'
																variant='standard'
																value={file}
																onChange={(file) => handleChange('pic', file)}
																fullWidth
																size='small'
															/>
															<IconBtn
																disabled={!file}
																onClick={handleAddMemory}
															>
																<AddAPhotoIcon className='add-icon' />
															</IconBtn>
														</div>
													</div>
												</>
											) : (
												<>
													<DialogContentText>
														Hello, {user.firstName}! How many in your party?
													</DialogContentText>
													<TextField
														disabled={
															!selectedEvent ||
															(selectedEvent?.isPublic &&
																!selectedEvent?.rsvpOpen)
														}
														label='Headcount'
														placeholder={
															selectedEvent?.isPublic &&
															!selectedEvent?.rsvpOpen &&
															'RSVP Currently Closed'
														}
														variant='standard'
														value={headcount}
														onChange={(e) =>
															handleChange('count', e.target.value)
														}
														fullWidth
														size='small'
														sx={{ marginTop: '15px' }}
														onFocus={() => dispatch(clearErrors())}
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
						</>
					)}
				</FormControl>
			</DialogContent>
			{user && (
				<DialogActions
					sx={{
						justifyContent:
							selectedEvent && eventAuthor === currentUser
								? 'space-between'
								: 'flex-end',
					}}
				>
					{selectedEvent &&
						alreadyAttending(eventsAttending, selectedEvent) && (
							<IconBtn tooltip='Undo' onClick={handleUndo}>
								<UndoIcon className='undo' />
							</IconBtn>
						)}
					{selectedEvent &&
						!alreadyAttending(eventsAttending, selectedEvent) && (
							<Button onClick={handleSubmit}>Submit</Button>
						)}
					{selectedEvent && eventAuthor === currentUser && (
						<IconBtn tooltip='Delete' placement='top' onClick={handleDelete}>
							<DeleteIcon className='delete' />
						</IconBtn>
					)}
					{!selectedEvent && (
						<Button
							disabled={!eventType || !eventTime || !eventLoc}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					)}
				</DialogActions>
			)}
		</Dialog>
	);
};

export default EventModal;
