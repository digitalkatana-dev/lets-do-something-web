import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDaySelected } from '../../../../../../../../redux/slices/calendarSlice';
import { setSelectedEvent } from '../../../../../../../../redux/slices/eventSlice';
import { getCurrentDayClass } from '../../../../../../../../util/helpers';
import dayjs from 'dayjs';
import TouchableOpacity from '../../../../../../../../components/TouchableOpacity';
import './day.scss';

const Day = ({ day, rowIdx }) => {
	const { savedEvents } = useSelector((state) => state.calendar);
	const [dayEvents, setDayEvents] = useState([]);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setDaySelected(day));
	};

	useEffect(() => {
		const events = savedEvents?.filter(
			(event) =>
				dayjs(event.date).format('MM-DD-YY') === dayjs(day).format('MM-DD-YY')
		);
		setDayEvents(events);
	}, [savedEvents, day]);

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
						onClick={() => dispatch(setSelectedEvent(item))}
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
