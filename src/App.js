/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getLatestNotification } from './redux/slices/notificationSlice';
import { socket } from './util/socket';
import './App.scss';
import Navbar from './components/Navbar';
import NavMenu from './components/NavMenu';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './features/Main';
import Profile from './features/Profile';
import DeleteDialog from './components/DeleteDialog';
import NotificationPopup from './components/NotificationPopup';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	const { deleteOpen } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	let refreshInterval;

	const handleRsvp = useCallback(() => {
		dispatch(getLatestNotification());
	}, [dispatch]);

	socket.on('rsvp received', () => handleRsvp());

	const handleRefresh = useCallback(() => {
		if (user !== null) {
			socket.emit('refresh', user._id);
			refreshInterval = setInterval(() => {
				socket.emit('refresh', user._id);
			}, 45000);
		}
	}, [user, refreshInterval]);

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
				<Navbar />
				<NavMenu />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/reset-password/:id' element={<Main />} />
					<Route
						path='/profile'
						element={<ProtectedRoute element={<Profile />} />}
					/>
				</Routes>
			</Router>
			<DeleteDialog open={deleteOpen} />
			<NotificationPopup />
		</div>
	);
}

export default App;
