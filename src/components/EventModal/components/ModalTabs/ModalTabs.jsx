import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import TabPanel from '../TabPanel';

const ModalTabs = ({ type, tab1data, tab2data }) => {
	const [value, setValue] = useState(0);

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
		<div id='modal-tabs'>
			<Box className='label-container'>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab label='Create/Modify' {...a11yProps(0)} className='label' />
					<Tab label='Invite' {...a11yProps(1)} className='label' />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0} children={tab1data} type='event' />
			<TabPanel value={value} index={1} children={tab2data} type='invite' />
		</div>
	);
};

export default ModalTabs;
