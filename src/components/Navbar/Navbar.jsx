import { AppBar, Avatar, Toolbar } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearErrors, getUser, logout } from '../../redux/slices/userSlice';
import { setMenuOpen, setMenuView } from '../../redux/slices/navSlice';
import { persistor } from '../../redux/rootStore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.scss';
import IconBtn from '../../components/IconBtn';

const Navbar = () => {
	const { menuOpen } = useSelector((state) => state.nav);
	const { user } = useSelector((state) => state.user);
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

	const handleProfile = () => {
		dispatch(getUser(user?._id));
	};

	const handleLogout = () => {
		dispatch(logout());
		persistor.purge();
	};

	const handleResetPreload = useCallback(() => {
		if (path) {
			dispatch(setMenuView('Reset'));
			dispatch(setMenuOpen(true));
		}
	}, [path, dispatch]);

	useEffect(() => {
		handleResetPreload();
	}, [handleResetPreload]);

	return (
		<AppBar>
			<Toolbar className={menuOpen ? 'navbar active' : 'navbar'}>
				{user ? (
					<div className='user-area'>
						<h3>Hello, {user.firstName}!</h3>
						<Link to='/profile' onClick={handleProfile}>
							<IconBtn tooltip='Profile' placement='right-end'>
								{user?.profilePic ? (
									<Avatar
										alt={user?.firstName + ' ' + user?.lastName}
										src={user?.profilePic}
										sx={{ width: 30, height: 30 }}
									/>
								) : (
									<AccountCircleIcon className='profile-icon white-txt' />
								)}
							</IconBtn>
						</Link>
					</div>
				) : (
					<div></div>
				)}
				{user ? (
					<div className='user-controls'>
						<Link to='/'>
							<IconBtn>
								<HomeIcon className='white-txt home' />
							</IconBtn>
						</Link>
						<Link to='/' onClick={handleLogout}>
							<IconBtn>
								<LogoutIcon className='white-txt logout' />
							</IconBtn>
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
