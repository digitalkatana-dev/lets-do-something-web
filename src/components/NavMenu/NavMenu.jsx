import { Paper } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './navMenu.scss';
import Auth from './components/Auth';
import Forgot from './components/Forgot';

const NavMenu = () => {
	const menuView = 'login';
	const menuOpen = true;

	return (
		<Paper className={menuOpen ? 'menu active' : 'menu'}>
			{menuView === 'forgot' ? <Forgot /> : <Auth />}
		</Paper>
	);
};

export default NavMenu;
