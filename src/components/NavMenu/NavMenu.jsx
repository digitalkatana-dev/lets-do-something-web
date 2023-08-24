/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from '../../redux/slices/navSlice';
import './navMenu.scss';
import Auth from './components/Auth';
import Forgot from './components/Forgot';

const NavMenu = () => {
	const { menuOpen, menuView } = useSelector((state) => state.nav);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(setMenuOpen(false));
		}
	}, [user]);

	return (
		<Paper className={menuOpen ? 'menu active' : 'menu'}>
			{menuView === 'Forgot' ? <Forgot /> : <Auth />}
		</Paper>
	);
};

export default NavMenu;
