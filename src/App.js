import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { clearSuccess, clearErrors } from './redux/slices/calendarSlice';
import './App.scss';
import Navbar from './components/Navbar';
import NavMenu from './components/NavMenu';
import Main from './features/Main';
import Profile from './features/Profile';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	const { user } = useSelector((state) => state.user);
	const { success, errors } = useSelector((state) => state.calendar);

	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const handleClose = (alert) => {
		switch (alert) {
			case 'success':
				dispatch(clearSuccess());
				break;

			case 'errors':
				dispatch(clearErrors());
				break;

			default:
				break;
		}
		setOpen(false);
	};

	useEffect(() => {
		if (success || errors) {
			setOpen(true);
		}
	}, [success, errors]);

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
			{success?.message && (
				<Snackbar
					open={open}
					autoHideDuration={7000}
					onClose={() => handleClose('success')}
				>
					<Alert severity='success'>{success.message}</Alert>
				</Snackbar>
			)}
			{errors?.event && (
				<Snackbar
					open={open}
					autoHideDuration={7000}
					onClose={() => handleClose('errors')}
				>
					<Alert severity='error'>{errors.event}</Alert>
				</Snackbar>
			)}
		</div>
	);
}

export default App;
