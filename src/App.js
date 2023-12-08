// import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { socket } from './util/socket';
import './App.scss';
import Navbar from './components/Navbar';
import NavMenu from './components/NavMenu';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './features/Main';
import Profile from './features/Profile';
import DeleteDialog from './components/DeleteDialog';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	const { deleteOpen } = useSelector((state) => state.app);
	// const { user } = useSelector((state) => state.user);
	// let setupInterval;

	// const handleSetup = useCallback(() => {
	// 	if (user !== null) {
	// 		setupInterval = setInterval(() => {
	// 			socket.emit('setup', user);
	// 		}, 45000);
	// 	} else {
	// 		if (setupInterval) {
	// 			clearInterval(setupInterval);
	// 			setupInterval = null;
	// 		}
	// 		socket.emit('disconnected');
	// 	}
	// }, [user, socket]);

	// useEffect(() => {
	// 	handleSetup();
	// 	return () => {
	// 		// Clear interval on unmount or dependency change
	// 		if (setupInterval) {
	// 			clearInterval(setupInterval);
	// 			setupInterval = null; // Reset the setupInterval variable
	// 		}
	// 	};
	// }, [handleSetup]);

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
		</div>
	);
}

export default App;
