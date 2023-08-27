import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthIndexSmall } from '../../../../../../../../../../../../redux/slices/calendarSlice';
import dayjs from 'dayjs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SmallCalHead = () => {
	const { monthIndexSmall } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handlePrev = () => {
		dispatch(setMonthIndexSmall(monthIndexSmall - 1));
	};

	const handleNxt = () => {
		dispatch(setMonthIndexSmall(monthIndexSmall + 1));
	};

	return (
		<header className='small-head'>
			<p>
				{dayjs(new Date(dayjs().year(), monthIndexSmall)).format('MMMM YYYY')}
			</p>
			<IconButton className='icon-btn left' onClick={handlePrev}>
				<ChevronLeftIcon />
			</IconButton>
			<IconButton className='icon-btn' onClick={handleNxt}>
				<ChevronRightIcon />
			</IconButton>
		</header>
	);
};

export default SmallCalHead;
