import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TabPanel from './components/TabPanel';

const EventFormTabs = ({ tab1data, tab2data }) => {
	const [value, setValue] = useState(0);

	const a11yProps = (index) => {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`,
		};
	};

	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	return (
		<div id='form-tabs'>
			<Box className='label-container'>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab className='label' label='Create/Modify' {...a11yProps(0)} />
					<Tab className='label' label='Invite' {...a11yProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0} children={tab1data} type='event' />
			<TabPanel value={value} index={1} children={tab2data} type='invite' />
		</div>
	);
};

export default EventFormTabs;
