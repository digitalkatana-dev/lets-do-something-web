import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import NavMenu from './components/NavMenu';
import Main from './features/Main';
import Profile from './features/Profile';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	const { user } = useSelector((state) => state.user);
	const success = null;
	const errors = null;

	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const handleClose = (alert) => {
		switch (alert) {
			// case 'success':
			// 	dispatch(clearSuccess());
			// 	break;

			// case 'errors':
			// 	dispatch(clearErrors());
			// 	break;

			default:
				break;
		}
		setOpen(false);
	};

	return (
		<div className='App'>
			<Router>
				<Navbar />
				<NavMenu />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/profile' element={user ? <Profile /> : <Main />} />
				</Routes>
			</Router>
			<Snackbar
				open={open}
				autoHideDuration={7000}
				onClose={() =>
					handleClose(success ? 'success' : errors ? 'errors' : null)
				}
			></Snackbar>
		</div>
	);
}

export default App;
