import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import {
	setMonthIndex,
	setMonthIndexSmall,
} from '../../../../../../../../redux/slices/calendarSlice';
import dayjs from 'dayjs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './head.scss';

const CalendarHead = () => {
	const { monthIndex } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handlePrev = () => {
		dispatch(setMonthIndex(monthIndex - 1));
	};

	const handleNxt = () => {
		dispatch(setMonthIndex(monthIndex + 1));
	};

	const handleToday = () => {
		dispatch(setMonthIndex(dayjs().month()));
		dispatch(setMonthIndexSmall(dayjs().month()));
	};

	return (
		<header className='head'>
			<img src='calendar-logo.png' alt='' className='icon' />
			<h3>Event Calendar</h3>
			<Button variant='outlined' className='today-btn' onClick={handleToday}>
				Today
			</Button>
			<IconButton className='icon-btn left' onClick={handlePrev}>
				<ChevronLeftIcon />
			</IconButton>
			<IconButton className='icon-btn' onClick={handleNxt}>
				<ChevronRightIcon />
			</IconButton>
			<h4>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</h4>
		</header>
	);
};

export default CalendarHead;
