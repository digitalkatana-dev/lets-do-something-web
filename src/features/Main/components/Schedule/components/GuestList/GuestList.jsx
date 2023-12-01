/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setGuestList,
	setErrors,
} from '../../../../../../redux/slices/calendarSlice';
import { guestListEvents } from '../../../../../../util/helpers';
import './guestList.scss';

const GuestList = () => {
	const { allEvents, guestList } = useSelector((state) => state.calendar);
	const { selectedEvent } = useSelector((state) => state.event);
	const dispatch = useDispatch();

	const errorHandler = (data) => {
		dispatch(setErrors(data));
	};

	useEffect(() => {
		if (selectedEvent) {
			dispatch(setGuestList(selectedEvent?.attendees));
		}
	}, [selectedEvent]);

	return (
		<div className='guest-list'>
			<header>
				<h3>Guest Book</h3>
			</header>
			<div className='container'>
				<img src='/guest-book.png' alt='' />
				<div className='overlay'>
					{selectedEvent ? (
						<div className='current-events'>
							<span className='details'>
								{selectedEvent?.type} @ {selectedEvent?.location} on{' '}
								{selectedEvent?.date}
							</span>
							{guestList?.map((guest) => (
								<span key={guest._id}>
									{guest.headcount - 1 >= 2 ? (
										<>
											{guest.name} + {guest.headcount - 1} guests
										</>
									) : guest.headcount - 1 > 0 ? (
										<>
											{guest.name} + {guest.headcount - 1} guest
										</>
									) : (
										<>{guest.name}</>
									)}
								</span>
							))}
						</div>
					) : (
						allEvents &&
						guestListEvents(allEvents, errorHandler).map((event) => (
							<div key={event._id} className='current-events'>
								<span className='details'>{event.details}</span>
								{event.confirmedGuests?.map((guest) => (
									<span key={guest._id}>
										{guest.headcount - 1 >= 2 ? (
											<>
												{guest.name} + {guest.headcount - 1} guests
											</>
										) : guest.headcount - 1 > 0 ? (
											<>
												{guest.name} + {guest.headcount - 1} guest
											</>
										) : (
											<>{guest.name}</>
										)}
									</span>
								))}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default GuestList;
