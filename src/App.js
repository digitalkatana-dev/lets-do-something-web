/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getLatestNotification } from './redux/slices/notificationSlice';
import { socket } from './util/socket';
import './App.scss';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import CreateProfile from './features/CreateProfile';
import Main from './features/Main';
import Profile from './features/Profile';
import FSDay from './features/Main/components/Schedule/components/Calendar/components/FSDay';
import FSEvent from './features/Main/components/Schedule/components/Calendar/components/FSEvent';
import EventModal from './components/EventModal';
import DeleteDialog from './components/DeleteDialog';
import NotificationPopup from './components/NotificationPopup';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	const { deleteOpen } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	let refreshInterval;

	const handleRsvp = useCallback(() => {
		dispatch(getLatestNotification());
	}, [dispatch]);

	socket.on('rsvp received', () => handleRsvp());

	const handleRefresh = useCallback(() => {
		if (activeUser !== null) {
			socket.emit('refresh', activeUser._id);
			refreshInterval = setInterval(() => {
				socket.emit('refresh', activeUser._id);
			}, 45000);
		}
	}, [activeUser, refreshInterval]);

	useEffect(() => {
		handleRefresh();
		return () => {
			// Clear interval on unmount or dependency change
			if (refreshInterval) {
				clearInterval(refreshInterval);
				refreshInterval = null; // Reset the setupInterval variable
			}
		};
	}, [handleRefresh]);

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={<MainLayout children={<Main />} />} />
					<Route
						path='/create-profile'
						element={
							<ProtectedRoute
								element={<MainLayout children={<CreateProfile />} />}
							/>
						}
					/>
					<Route
						path='/reset-password/:id'
						element={<MainLayout children={<Main />} />}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRoute element={<MainLayout children={<Profile />} />} />
						}
					/>
					<Route
						path='selected-day'
						element={<MainLayout children={<FSDay />} />}
					/>
				</Routes>
			</Router>
			<EventModal />
			<DeleteDialog open={deleteOpen} />
			{/* <NotificationPopup /> */}
		</div>
	);
}

export default App;
