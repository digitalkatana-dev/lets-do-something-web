import { Avatar, Paper, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearLatest } from '../../redux/slices/notificationSlice';
import { getBackgroundColor } from '../../util/helpers';
import './popup.scss';

const NotificationPopup = () => {
	const { latest } = useSelector((state) => state.notification);
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	const background = getBackgroundColor(latest?.label, 0.7);

	const handleActive = useCallback(() => {
		if (latest) {
			setActive(true);
		}
	}, [latest]);

	const handleNotification = useCallback(() => {
		if (latest) {
			setTimeout(() => {
				setActive(false);
			}, 5000);
			setTimeout(() => {
				dispatch(clearLatest());
			}, 7000);
		}
	}, [dispatch, latest]);

	useEffect(() => {
		handleActive();
	}, [handleActive]);

	useEffect(() => {
		handleNotification();
	}, [handleNotification]);

	return (
		<Paper
			className={active ? 'notification active' : 'notification'}
			elevation={10}
		>
			<div
				className='content-container'
				style={{ backgroundColor: background }}
			>
				<Stack direction='row' alignItems='center' gap={1}>
					<Avatar
						src={latest?.userFrom?.profilePic}
						alt={latest?.user}
						sx={{ width: 30, height: 30 }}
					/>
					<span>{`${
						latest?.userFrom?.firstName + ' ' + latest?.userFrom?.lastName
					} just RSVP'd for ${latest?.event}!`}</span>
				</Stack>
			</div>
		</Paper>
	);
};

export default NotificationPopup;
