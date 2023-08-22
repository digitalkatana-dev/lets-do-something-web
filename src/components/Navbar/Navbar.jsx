import {
	AppBar,
	Avatar,
	IconButton,
	Toolbar,
	useScrollTrigger,
} from '@mui/material';
import { cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.scss';

const Navbar = (props) => {
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
				<Toolbar className='navbar'></Toolbar>
			</AppBar>
		</ElevationScroll>
	);
};

export default Navbar;
