import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import './profileTabs.scss';
import TabPanel from './components/TabPanel';

const ProfileTabs = ({ type, tab1data, tab2data }) => {
	const [value, setValue] = useState(0);
	const tab1label =
		type === 'events' ? 'Hosting' : type === 'friends' && 'Friends';
	const panel1type =
		type === 'events' ? 'host' : type === 'friends' && 'friend';
	const tab2label =
		type === 'events' ? 'Attending' : type === 'friends' && 'Search';
	const panel2type =
		type === 'events' ? 'attend' : type === 'friends' && 'search';

	const a11yProps = (index) => {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`,
		};
	};

	const handleChange = (e, newValue) => {
		setValue(newValue);
		// setActiveTab && setActiveTab(newValue === 0 ? tab1label : tab2label);
	};

	return (
		<div id='profile-tabs'>
			<div className='heading-container'>
				<h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
			</div>
			<Box className='label-container'>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab label={tab1label} {...a11yProps(0)} className='label' />
					<Tab label={tab2label} {...a11yProps(1)} className='label' />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0} children={tab1data} type={panel1type} />
			<TabPanel value={value} index={1} children={tab2data} type={panel2type} />
		</div>
	);
};

export default ProfileTabs;
