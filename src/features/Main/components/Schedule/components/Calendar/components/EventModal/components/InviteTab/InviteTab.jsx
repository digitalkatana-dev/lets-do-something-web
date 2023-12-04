import {
	InputAdornment,
	List,
	ListItem,
	ListItemText,
	TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearErrors,
	setInvitedGuestInput,
	findGuest,
	removeInvitedGuest,
} from '../../../../../../../../../../redux/slices/calendarSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import DeleteIcon from '@mui/icons-material/Delete';
import IconBtn from '../../../../../../../../../../components/IconBtn';

const InviteTab = () => {
	const { selectedEvent, invitedGuestInput, invitedGuests, errors } =
		useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.user);
	const eventAuthor = selectedEvent?.createdBy;
	const currentUser = user?._id;
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (e) => {
		dispatch(setInvitedGuestInput(e.target.value));
	};

	const handleAddGuest = () => {
		const data = {
			guest: invitedGuestInput,
		};
		dispatch(findGuest(data));
	};

	const handleRemoveGuest = (guest) => {
		const updated = invitedGuests?.filter((item) => item?._id !== guest?._id);
		dispatch(removeInvitedGuest(updated));
	};

	// const handleAddGuest = () => {
	// 	const data = {
	// 		guest: invitedGuestInput,
	// 		eventId: selectedEvent?._id,
	// 		type: selectedEvent?.type,
	// 		date: selectedEvent?.date,
	// 		time: selectedEvent?.time,
	// 		creator: user?._id,
	// 	};

	// 	const { valid, errors } = validateInvitedGuest(invitedGuestInput);

	// 	if (!valid) {
	// 		dispatch(setErrors(errors));
	// 	} else {
	// 		dispatch(findAndInvite(data));
	// 	}
	// };

	// const handleReminders = () => {
	// 	const data = {
	// 		eventId: selectedEvent?._id,
	// 	};
	// 	dispatch(sendReminders(data));
	// };

	return (
		<div className='event-section alt'>
			<div className='input-btn-row'>
				<TextField
					label='Invite Guests'
					placeholder='Email Or Phone'
					size='small'
					margin='dense'
					variant='standard'
					fullWidth
					value={invitedGuestInput}
					onChange={handleChange}
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
			{invitedGuests.length > 0 && (
				<List className='list'>
					<ListItem disablePadding className='invited-guests'>
						<ListItemText secondary='Invited Guests' />
						{selectedEvent && eventAuthor === currentUser && (
							<IconBtn
								tooltip='Send Reminders'
								placement='top'
								// onClick={handleReminders}
							>
								<SendToMobileIcon htmlColor='steelblue' />
							</IconBtn>
						)}
					</ListItem>
					{invitedGuests
						?.filter((item) => item._id !== user._id)
						.map((item) => (
							<ListItem disablePadding className='list-item' key={item._id}>
								{item?.firstName ? (
									<ListItemText
										primary={`${item.firstName} ${item.lastName}`}
									/>
								) : (
									<ListItemText
										primary={item?.phone ? item?.phone : item?.email}
									/>
								)}
								{selectedEvent && eventAuthor === currentUser && (
									<IconBtn
										tooltip='Send Invite'
										placement='top'
										// onClick={() => handleInvite(item)}
									>
										<SendToMobileIcon htmlColor='steelblue' />
									</IconBtn>
								)}
								<IconBtn
									tooltip='Delete Guest'
									placement='top'
									onClick={() => handleRemoveGuest(item)}
								>
									<DeleteIcon htmlColor='red' />
								</IconBtn>
							</ListItem>
						))}
				</List>
			)}
		</div>
	);
};

export default InviteTab;
