import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton, Paper } from '@mui/material';
import {
	toggleOpen,
	setSelectedEvent,
	setEventTime,
	clearSelectedDay,
	clearFSDayEvents,
} from '../../../../../../../../redux/slices/calendarSlice';
import { reFormatTime } from '../../../../../../../../util/helpers';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import EventItem from '../../../../../../../../components/EventItem';
import EventInfo from '../../../../../../../../components/EventInfo';
import Button from '../../../../../../../../transition/Button';
import './fsday.scss';

const FSDay = () => {
	const { daySelected, fsDayEvents } = useSelector((state) => state.calendar);
	const [isMobile, setIsMobile] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');
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

	const handleSelectedEvent = (e, item) => {
		const itemDay = `${dayjs(item.date).format(
			'ddd, DD MMM YYYY'
		)} 08:00:00 GMT`;
		dispatch(setEventTime(reFormatTime(item.time, itemDay)));
		dispatch(setSelectedEvent(item));
		isMobile && dispatch(toggleOpen(true));
	};

	const handleClick = () => {
		dispatch(toggleOpen(true));
	};

	const handleMobile = useCallback(() => {
		const handleResize = () => {
			if (window.innerWidth <= 600) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleDate = useCallback(() => {
		if (selectedDate !== daySelected.split('07')[0]) {
			setSelectedDate(daySelected.split('07')[0]);
		}
	}, [daySelected, selectedDate]);

	useEffect(() => {
		handleMobile();
	}, [handleMobile]);

	useEffect(() => {
		handleDate();
	}, [handleDate]);

	return (
		<div id='fsday'>
			<header>
				<h3>{selectedDate}</h3>
				<IconButton onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</header>
			<div id='content-wrapper'>
				<section id='day-event-list'>
					<Paper className='fsDay-surface' elevation={7}>
						{fsDayEvents?.map((item) => (
							<div
								key={item?._id}
								onClick={(e) => handleSelectedEvent(e, item)}
							>
								<EventItem data={item} type='fsDay' />
							</div>
						))}
					</Paper>
					<Button id='create-event-btn' onClick={handleClick}>
						Create new event
					</Button>
				</section>
				<section id='event-details'>
					<Paper className='fsDay-surface' elevation={7}>
						<EventInfo />
					</Paper>
				</section>
			</div>
		</div>
	);
};

export default FSDay;
