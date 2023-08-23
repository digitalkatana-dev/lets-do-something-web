import {
	AppBar,
	Avatar,
	IconButton,
	Toolbar,
	useScrollTrigger,
} from '@mui/material';
import { cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.scss';
import IconBtn from '../../components/IconBtn';

const Navbar = (props) => {
	const menuOpen = false;
	// const user = {
	// 	firstName: 'Brandon',
	// 	lastName: 'Benoit',
	// };
	const user = null;

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

	return (
		<ElevationScroll {...props}>
			<AppBar>
				<Toolbar className={menuOpen ? 'navbar active' : 'navbar'}>
					{user ? (
						<div className='user-area'>
							<h3>Hello, {user.firstName}!</h3>
							<a href='/profile'>
								<IconBtn tooltip='Profile' placement='right-end'>
									{user?.profilePic ? (
										<Avatar
											alt={user?.firstName + ' ' + user?.lastName}
											src={user?.profilePic}
											sx={{ width: 30, height: 30 }}
										/>
									) : (
										<AccountCircleIcon className='settings-icon' />
									)}
								</IconBtn>
							</a>
						</div>
					) : (
						<div></div>
					)}
					{user ? (
						<div className='user-controls'>
							<a href='/'>
								<IconButton>
									<HomeIcon className='home' />
								</IconButton>
							</a>
							<a href='/'>
								<IconButton>
									<LogoutIcon className='logout' />
								</IconButton>
							</a>
						</div>
					) : (
						<div className='hamburger'>
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
