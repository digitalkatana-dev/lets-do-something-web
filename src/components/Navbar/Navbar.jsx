import { AppBar, Avatar, Toolbar, useScrollTrigger } from '@mui/material';
import { cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, getUser, logout } from '../../redux/slices/userSlice';
import { setMenuOpen, setMenuView } from '../../redux/slices/navSlice';
import { persistor } from '../../redux/rootStore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.scss';
import IconBtn from '../../components/IconBtn';

const Navbar = (props) => {
	const { menuOpen } = useSelector((state) => state.nav);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const ElevationScroll = (props) => {
		const { children } = props;

		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
		});
		return cloneElement(children, {
			elevation: trigger ? 4 : 0,
		});
	};

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

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		persistor.purge();
	};

	return (
		<ElevationScroll {...props}>
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
		</ElevationScroll>
	);
};

export default Navbar;
