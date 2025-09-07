import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Avatar, IconButton, Toolbar } from '@mui/material';
import { setMenuOpen, setMenuView } from '../../redux/slices/navSlice';
import {
	clearUserErrors,
	clearUserSuccess,
	logout,
} from '../../redux/slices/userSlice';
import MenuIcon from '@mui/icons-material/Menu';
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
			dispatch(clearUserErrors());
			dispatch(setMenuView('Login'));
		}, 2000);
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			setTimeout(() => {
				dispatch(clearUserSuccess());
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
		<AppBar className='navbar' position='static'>
			<Toolbar
				className={
					activeUser
						? 'toolbar user-view'
						: menuOpen
						? 'toolbar active'
						: 'toolbar'
				}
			>
				{activeUser && (
					<section className='user-area'>
						<h6 className='greeting responsive-h6'>
							Hello, {activeUser.firstName}
						</h6>
						<Link to={activeUser?.firstLogin ? '/create-profile' : '/profile'}>
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
					</section>
				)}
				<section className='brand-wrapper'>
					<h3 className='brand'>Let's Do Something!</h3>
				</section>
				{activeUser ? (
					<section className='user-controls'>
						<Link to={activeUser?.firstLogin ? '/create-profile' : '/'}>
							<IconButton className='home'>
								<HomeIcon />
							</IconButton>
						</Link>
						<Link to='/' onClick={handleLogout}>
							<IconButton className='logout'>
								<LogoutIcon />
							</IconButton>
						</Link>
					</section>
				) : (
					<IconButton className='mobile' onClick={handleMenu}>
						<MenuIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
