import {
	FormControl,
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
	findAndInvite,
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
	const filteredGuests = invitedGuests?.filter(
		(item) => item?._id !== user?._id
	);
	console.log(filteredGuests);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (e) => {
		dispatch(setInvitedGuestInput(e.target.value));
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

	const handleRemoveGuest = (guest) => {
		const updated = invitedGuests?.filter((item) => item?._id !== guest?._id);
		dispatch(removeInvitedGuest(updated));
	};

	// const handleReminders = () => {
	// 	const data = {
	// 		eventId: selectedEvent?._id,
	// 	};
	// 	dispatch(sendReminders(data));
	// };

	return (
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
			</FormControl>
			<List className='list'>
				{selectedEvent && (
					<ListItem disablePadding className='invited-guests'>
						<ListItemText secondary='Invited Guests' />
						<IconBtn
							tooltip='Send Reminders'
							placement='top'
							// onClick={handleReminders}
						>
							<SendToMobileIcon htmlColor='steelblue' />
						</IconBtn>
					</ListItem>
				)}
				{filteredGuests.map((item) => (
					<ListItem disablePadding className='list-item' key={item._id}>
						{item?.firstName ? (
							<ListItemText primary={`${item.firstName} ${item.lastName}`} />
						) : (
							<ListItemText primary={item?.phone ? item?.phone : item?.email} />
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
		</div>
	);
};

export default InviteTab;
