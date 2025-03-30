import React from 'react';
import EventTab from '../EventTab';
import InviteTab from '../InviteTab';

const TabPanel = ({ children, value, index, type, ...other }) => {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && (
				<>
					{type === 'event' ? <EventTab /> : type === 'invite' && <InviteTab />}
				</>
			)}
		</div>
	);
};

export default TabPanel;
