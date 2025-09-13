import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Avatar,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import {
	toggleOpen,
	clearSelectedDay,
	clearFSDayEvents,
} from '../../../../../../../../redux/slices/calendarSlice';
import CloseIcon from '@mui/icons-material/Close';
import EventForm from '../../../../../../../../components/EventForm';
import Button from '../../../../../../../../transition/Button';
import './fsday.scss';

const FSDay = () => {
	const { daySelected, fsDayEvents } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const testEventArray = [
	// 	{ _id: 1, location: 'Bjs', label: 'dodgerblue' },
	// 	{ _id: 2, location: 'Bjs', label: 'red' },
	// 	{ _id: 3, location: 'Bjs', label: 'seagreen' },
	// 	{ _id: 4, location: 'Bjs', label: 'goldenrod' },
	// 	{ _id: 5, location: 'Bjs', label: 'brown' },
	// 	{ _id: 6, location: 'Bjs', label: 'violet' },
	// 	{ _id: 7, location: 'Bjs', label: 'salmon' },
	// 	{ _id: 8, location: 'Bjs', label: 'orange' },
	// 	{ _id: 9, location: 'Bjs', label: 'purple' },
	// 	{ _id: 10, location: 'Bjs', label: 'dodgerblue' },
	// 	{ _id: 11, location: 'Bjs', label: 'red' },
	// 	{ _id: 12, location: 'Bjs', label: 'seagreen' },
	// 	{ _id: 13, location: 'Bjs', label: 'goldenrod' },
	// ];

	const handleClose = () => {
		navigate('/');
		setTimeout(() => {
			dispatch(clearSelectedDay());
			dispatch(clearFSDayEvents());
		}, 1500);
	};

	const handleClick = () => {
		dispatch(toggleOpen(true));
	};

	return (
		<div id='fsday'>
			<header>
				<h3>{daySelected.split('07')[0]}</h3>
				<IconButton onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</header>
			<div id='content-wrapper'>
				<section id='day-event-list'>
					<List
						sx={{
							maxHeight: '100%',
							overflowY: 'scroll',
							bgcolor: 'background.paper',
						}}
					>
						{fsDayEvents?.map((item) => (
							<div key={item._id}>
								<ListItem
									style={{ backgroundColor: `${item.label}` }}
									alignItems='flex-start'
								>
									<ListItemAvatar>
										<Avatar src={item.createdBy.profilePic} />
									</ListItemAvatar>
									<ListItemText
										primary={item.type}
										secondary={`${item.location} ${item.time}`}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
							</div>
						))}
					</List>
				</section>
				<section id='day-actions'>
					<Button onClick={handleClick}>Create new event</Button>
				</section>
				<section id='event-details'>
					<EventForm />
				</section>
			</div>
		</div>
	);
};

export default FSDay;
