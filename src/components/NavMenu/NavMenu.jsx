import { Paper } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from '../../redux/slices/navSlice';
import './navMenu.scss';
import Auth from './components/Auth';
import Forgot from './components/Forgot';
import Reset from './components/Reset';

const NavMenu = () => {
	const { menuOpen, menuView } = useSelector((state) => state.nav);
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleMenuOpen = useCallback(() => {
		activeUser && dispatch(setMenuOpen(false));
	}, [activeUser, dispatch]);

	useEffect(() => {
		handleMenuOpen();
	}, [handleMenuOpen]);

	return (
		<Paper className={menuOpen ? 'menu active' : 'menu'}>
			{menuView === 'Forgot' ? (
				<Forgot />
			) : menuView === 'Reset' ? (
				<Reset />
			) : (
				<Auth />
			)}
		</Paper>
	);
};

export default NavMenu;
