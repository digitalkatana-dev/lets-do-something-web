import { AppBar, Avatar, IconButton, Toolbar } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
	clearErrors,
	clearSuccess,
	logout,
} from '../../redux/slices/userSlice';
import { setMenuOpen, setMenuView } from '../../redux/slices/navSlice';
import { persistor } from '../../redux/rootStore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.scss';

const Navbar = () => {
	const { menuOpen } = useSelector((state) => state.nav);
	const { activeUser, success } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const location = useLocation();
	const path = location.pathname.split('/')[2];

	const handleMenu = () => {
		dispatch(setMenuOpen(!menuOpen));
		setTimeout(() => {
			dispatch(clearErrors());
			dispatch(setMenuView('Login'));
		}, 1000);
	};

	const handleLogout = () => {
		dispatch(logout());
		persistor.purge();
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			setTimeout(() => {
				dispatch(clearSuccess());
			}, 5000);
		}
	}, [dispatch, success]);

	const handleResetPreload = useCallback(() => {
		if (path) {
			dispatch(setMenuView('Reset'));
			dispatch(setMenuOpen(true));
		}
	}, [path, dispatch]);

	useEffect(() => {
		handleResetPreload();
	}, [handleResetPreload]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	return (
		<AppBar>
			<Toolbar className={menuOpen ? 'navbar active' : 'navbar'}>
				{activeUser ? (
					<div className='user-area'>
						<h3>Hello, {activeUser.firstName}!</h3>
						<Link to='/profile'>
							<IconButton
								tooltip='Profile'
								placement='right-end'
								className='avatar'
							>
								{activeUser?.profilePic ? (
									<Avatar
										alt={activeUser?.firstName + ' ' + activeUser?.lastName}
										src={activeUser?.profilePic}
										sx={{ width: 30, height: 30 }}
									/>
								) : (
									<AccountCircleIcon className='profile-icon white-txt' />
								)}
							</IconButton>
						</Link>
					</div>
				) : (
					<div></div>
				)}
				{activeUser ? (
					<div className='user-controls'>
						<Link to='/'>
							<IconButton className='home'>
								<HomeIcon className='white-txt' />
							</IconButton>
						</Link>
						<Link to='/' onClick={handleLogout}>
							<IconButton className='logout'>
								<LogoutIcon className='white-txt' />
							</IconButton>
						</Link>
					</div>
				) : (
					<div className='hamburger' onClick={handleMenu}>
						<span className='line1'></span>
						<span className='line2'></span>
						<span className='line3'></span>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
