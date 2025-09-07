import React from 'react';
import { Container } from '@mui/material';
import Navbar from '../../components/Navbar';
import NavMenu from '../../components/NavMenu';
import './main.scss';

const MainLayout = ({ children }) => {
	return (
		<Container id='main-layout' maxWidth='xl'>
			<Navbar />
			<NavMenu />
			<div className='content'>{children}</div>
		</Container>
	);
};

export default MainLayout;
