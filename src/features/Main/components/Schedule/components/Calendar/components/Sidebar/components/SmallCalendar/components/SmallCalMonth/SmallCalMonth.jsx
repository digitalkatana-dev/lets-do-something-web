import { Grid } from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setMonthIndex,
	setDaySelected,
	setFSDayEvents,
} from '../../../../../../../../../../../../redux/slices/calendarSlice';
import dayjs from 'dayjs';
import './smallMonth.scss';
import TouchableOpacity from '../../../../../../../../../../../../components/TouchableOpacity';

const SmallCalMonth = () => {
	const { currentMonthSmall, monthIndexSmall, daySelected, allEvents } =
		useSelector((state) => state.calendar);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getDayClass = (day) => {
		const format = 'MM-DD-YY';
		const nowDay = dayjs(new Date()).format(format);
		const currDay = dayjs(day).format(format);
		const slcDay = daySelected && dayjs(daySelected).format(format);
		if (nowDay === currDay) {
			return 'today';
		} else if (currDay === slcDay) {
			return 'selected-day';
		} else {
			return '';
		}
	};

	const handleClick = (day) => {
		const data = {
			day,
		};
		const events = allEvents?.filter(
			(event) =>
				dayjs(event.date).format('MM-DD-YY') === dayjs(day).format('MM-DD-YY')
		);

		dispatch(setMonthIndex(monthIndexSmall));
		dispatch(setDaySelected(data));
		dispatch(setFSDayEvents(events));
		navigate('/selected-day');
	};

	return (
		<div>
			<Grid container columns={7}>
				{currentMonthSmall[0].map((day, i) => (
					<Grid item xs={1} key={i} className='cell'>
						<span>{dayjs(day).format('dd').charAt(0)}</span>
					</Grid>
				))}
			</Grid>
			{currentMonthSmall.map((row, i) => (
				<Fragment key={i}>
					<Grid container columns={7}>
						{row.map((day, idx) => (
							<Grid item xs={1} key={idx} className='cell'>
								<TouchableOpacity onClick={() => handleClick(day)}>
									<span className={`${getDayClass(day)}`}>
										{dayjs(day).format('D')}
									</span>
								</TouchableOpacity>
							</Grid>
						))}
					</Grid>
				</Fragment>
			))}
		</div>
	);
};

export default SmallCalMonth;
