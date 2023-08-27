/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMonthSmall } from '../../../../../../../../../../redux/slices/calendarSlice';
import './smallCal.scss';
import SmallCalHead from './components/SmallCalHead';
import SmallCalMonth from './components/SmallCalMonth';

const SmallCalendar = () => {
	const { monthIndexSmall } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setCurrentMonthSmall(monthIndexSmall));
	}, [monthIndexSmall]);

	return (
		<div className='small-cal'>
			<SmallCalHead />
			<SmallCalMonth />
		</div>
	);
};

export default SmallCalendar;
