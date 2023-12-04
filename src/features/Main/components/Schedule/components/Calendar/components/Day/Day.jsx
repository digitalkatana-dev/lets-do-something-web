import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setDaySelected,
	setSelectedEvent,
} from '../../../../../../../../redux/slices/calendarSlice';
import { getCurrentDayClass } from '../../../../../../../../util/helpers';
import dayjs from 'dayjs';
import TouchableOpacity from '../../../../../../../../components/TouchableOpacity';
import './day.scss';

const Day = ({ day, rowIdx }) => {
	const { allEvents } = useSelector((state) => state.calendar);
	const [dayEvents, setDayEvents] = useState([]);
	const dispatch = useDispatch();

	const handleClick = () => {
		const data = {
			day,
		};
		dispatch(setDaySelected(data));
	};

	const handleSelectedEvent = (e, item) => {
		const itemDay = `${dayjs(item.date).format(
			'ddd, DD MMM YYYY'
		)} 08:00:00 GMT`;
		const data = {
			day: itemDay,
			eventTime: item.time,
		};
		e.stopPropagation();
		dispatch(setSelectedEvent(item));
		dispatch(setDaySelected(data));
	};

	useEffect(() => {
		const events = allEvents?.filter(
			(event) =>
				dayjs(event.date).format('MM-DD-YY') === dayjs(day).format('MM-DD-YY')
		);
		setDayEvents(events);
	}, [allEvents, day]);

	return (
		<TouchableOpacity
			onClick={handleClick}
			inlineStyle={{ border: '1px solid lightgrey', zIndex: 1 }}
		>
			<Grid item xs={1} className='cell'>
				<header>
					{rowIdx === 0 && <p className='abv'>{dayjs(day).format('ddd')}</p>}
					<p className={`${getCurrentDayClass(day)} date`}>
						{dayjs(day).format('D')}
					</p>
				</header>
				{dayEvents?.map((item) => (
					<button
						key={item._id}
						onClick={(e) => handleSelectedEvent(e, item)}
						style={{ backgroundColor: `${item.label}` }}
						className={'day-event'}
					>
						<div
							className={
								item.location.length > 8 ? 'btn-txt scrolled' : 'btn-txt'
							}
						>
							{item.location}
						</div>
					</button>
				))}
			</Grid>
		</TouchableOpacity>
	);
};

export default Day;
