import {
	Avatar,
	FormControl,
	InputAdornment,
	InputLabel,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearErrors,
	setSelectedFriend,
	addFriendToGuestList,
	setInvitedGuestInput,
	findGuest,
	findAndInvite,
	removeGuest,
	removeInvitedGuest,
} from '../../../../redux/slices/calendarSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import DeleteIcon from '@mui/icons-material/Delete';
import IconBtn from '../../../IconBtn';

const InviteTab = () => {
	const {
		selectedEvent,
		selectedFriend,
		invitedGuestInput,
		invitedGuests,
		errors,
	} = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.user);
	const filteredGuests = invitedGuests?.filter(
		(item) => item?._id !== user?._id
	);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (input, value) => {
		const actionMap = {
			select: setSelectedFriend,
			input: setInvitedGuestInput,
		};

		const action = actionMap[input];

		if (action) {
			dispatch(action(value));
		}
	};

	const handleAddGuest = () => {
		let data;
		if (selectedEvent) {
			data = {
				guest: invitedGuestInput,
				eventId: selectedEvent?._id,
				type: selectedEvent?.type,
				date: selectedEvent?.date,
				time: selectedEvent?.time,
				notes: selectedEvent?.notes,
				creator: user?._id,
			};
			dispatch(findAndInvite(data));
		} else {
			data = {
				guest: invitedGuestInput,
			};
			dispatch(findGuest(data));
		}
	};

	const handleInviteFriend = () => {
		if (selectedEvent) {
			let data = {
				guest: selectedFriend?._id,
				eventId: selectedEvent?._id,
				type: selectedEvent?.type,
				date: selectedEvent?.date,
				time: selectedEvent?.time,
				notes: selectedEvent?.notes,
				creator: user?._id,
			};
			dispatch(findAndInvite(data));
		} else {
			dispatch(addFriendToGuestList(selectedFriend));
		}
	};

	const handleRemoveGuest = (guest) => {
		if (selectedEvent) {
			const data = {
				eventId: selectedEvent._id,
				guest: guest._id,
				user: user?._id,
			};
			dispatch(removeInvitedGuest(data));
		} else {
			const updated = invitedGuests?.filter((item) => item?._id !== guest?._id);
			dispatch(removeGuest(updated));
		}
	};

	// const handleReminders = () => {
	// 	const data = {
	// 		eventId: selectedEvent?._id,
	// 	};
	// 	dispatch(sendReminders(data));
	// };

	return (
		<>
			{user?.friends.length > 0 && (
				<div className='event-section alt'>
					<FormControl fullWidth>
						<div className='input-btn-row'>
							<InputLabel id='friends-select'>Friends</InputLabel>
							<Select
								labelId='friends-select'
								label='Firends'
								size='small'
								margin='dense'
								variant='standard'
								fullWidth
								value={selectedFriend ? selectedFriend : ''}
								onChange={(e) => handleChange('select', e.target.value)}
							>
								<MenuItem value=''>Choose..</MenuItem>
								{user?.friends.map((item) => (
									<MenuItem key={item._id} value={item}>
										<Stack direction='row' alignItems='center'>
											<ListItemAvatar>
												<Avatar
													src={
														item.profilePic
															? item.profilePic
															: 'https://dosomething-backend.onrender.com/uploads/avatars/avatar_26.jpg'
													}
													alt='guest'
												/>
											</ListItemAvatar>
											<ListItemText>
												{item.firstName + ' ' + item.lastName}
											</ListItemText>
										</Stack>
									</MenuItem>
								))}
							</Select>
							<IconBtn
								tooltip='Invite Friend'
								placement='top'
								disabled={!selectedFriend}
								onClick={handleInviteFriend}
							>
								<AddBoxIcon className='add-icon' />
							</IconBtn>
						</div>
					</FormControl>
				</div>
			)}
			<div className='event-section alt'>
				<FormControl fullWidth>
					<div className='input-btn-row'>
						<TextField
							label='Invite Guests'
							placeholder='Email Or Phone'
							size='small'
							margin='dense'
							variant='standard'
							fullWidth
							value={invitedGuestInput}
							onChange={(e) => handleChange('input', e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<PersonAddIcon className='icon' />
									</InputAdornment>
								),
							}}
							onFocus={handleFocus}
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
					{errors?.guest && <h6 className='error'>{errors?.guest}</h6>}
				</FormControl>
				<List className='list'>
					{selectedEvent && (
						<ListItem disablePadding className='invited-guests'>
							<ListItemText secondary='Invited Guests' />
							<IconBtn
								disabled={invitedGuests.length <= 1}
								tooltip='Send Reminders'
								placement='top'
								// onClick={handleReminders}
							>
								<SendToMobileIcon htmlColor='steelblue' />
							</IconBtn>
						</ListItem>
					)}
					{filteredGuests.map((item) => (
						<ListItem
							disablePadding
							className='list-item'
							key={item._id}
							secondaryAction={
								<IconBtn
									tooltip='Delete Guest'
									placement='top'
									onClick={() => handleRemoveGuest(item)}
								>
									<DeleteIcon htmlColor='red' />
								</IconBtn>
							}
						>
							<ListItemAvatar>
								<Avatar
									src={
										item.profilePic
											? item.profilePic
											: 'https://dosomething-backend.onrender.com/uploads/avatars/avatar_26.jpg'
									}
									alt='guest'
								/>
							</ListItemAvatar>
							{item?.firstName ? (
								<ListItemText primary={`${item.firstName} ${item.lastName}`} />
							) : (
								<ListItemText
									primary={item?.phone ? item?.phone : item?.email}
								/>
							)}
						</ListItem>
					))}
				</List>
			</div>
		</>
	);
};

export default InviteTab;
