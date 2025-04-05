import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mui/material';
import {
	clearErrors,
	setSelectedFriend,
	addFriendToGuestList,
	setInvitedGuestInput,
	findGuest,
	findAndInvite,
	removeGuest,
	removeInvitedGuest,
} from '../../../../../../redux/slices/calendarSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import DeleteIcon from '@mui/icons-material/Delete';
import TextInput from '../../../../../../transition/TextInput';
import IconBtn from '../../../../../../components/IconBtn';

const InviteTab = () => {
	const { activeUser } = useSelector((state) => state.user);
	const {
		loading,
		selectedEvent,
		selectedFriend,
		invitedGuestInput,
		invitedGuests,
		errors,
	} = useSelector((state) => state.calendar);
	const filteredGuests = invitedGuests?.filter(
		(item) => item?._id !== activeUser?._id
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

	const handleInviteFriend = () => {
		if (selectedEvent) {
			let data = {
				guest: selectedFriend?._id,
				eventId: selectedEvent?._id,
				type: selectedEvent?.type,
				date: selectedEvent?.date,
				time: selectedEvent?.time,
				notes: selectedEvent?.notes,
				creator: activeUser?._id,
			};
			dispatch(findAndInvite(data));
		} else {
			dispatch(addFriendToGuestList(selectedFriend));
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
				creator: activeUser?._id,
			};
			dispatch(findAndInvite(data));
		} else {
			data = {
				guest: invitedGuestInput,
			};
			dispatch(findGuest(data));
		}
	};

	const handleRemoveGuest = (guest) => {
		if (selectedEvent) {
			const data = {
				eventId: selectedEvent._id,
				guest: guest._id,
				user: activeUser?._id,
			};
			dispatch(removeInvitedGuest(data));
		} else {
			const updated = invitedGuests?.filter((item) => item?._id !== guest?._id);
			dispatch(removeGuest(updated));
		}
	};

	return (
		<form action=''>
			{activeUser?.friends.length > 0 && (
				<div className='event-section alt'>
					<FormControl size='small' fullWidth>
						<div className='input-btn-row'>
							<InputLabel id='friends-select'>Friends</InputLabel>
							<Select
								labelId='friends-select'
								size='small'
								margin='dense'
								variant='standard'
								fullWidth
								value={selectedFriend}
								onChange={(e) => handleChange('select', e.target.value)}
							>
								<MenuItem value=''>Choose..</MenuItem>
								{activeUser?.friends.map((item) => (
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
				<div className='input-btn-row'>
					<FormControl fullWidth>
						<TextInput
							containerClass='standard'
							placeholder='Email or Phone'
							value={invitedGuestInput}
							onChange={(e) => handleChange('input', e.target.value)}
							onFocus={handleFocus}
							leftIcon={
								<InputAdornment position='start'>
									<PersonAddIcon className='icon' />
								</InputAdornment>
							}
							error={errors?.guest}
						/>
					</FormControl>
					<IconBtn
						tooltip='Add Guest'
						placement='top'
						disabled={!invitedGuestInput}
						onClick={handleAddGuest}
					>
						<AddBoxIcon className='add-icon' />
					</IconBtn>
				</div>
			</div>
			<div className='event-section alt'>
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
		</form>
	);
};

export default InviteTab;
