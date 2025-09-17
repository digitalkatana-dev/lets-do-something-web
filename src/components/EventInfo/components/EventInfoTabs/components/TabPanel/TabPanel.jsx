import React from 'react';
import FormTab from '../FormTab';
import InviteTab from '../InviteTab';

const TabPanel = ({ children, value, index, type, ...other }) => {
	return (
		<div
			id={`tabpanel-${index}`}
			role='tabpanel'
			hidden={value !== index}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && (
				<>
					{type === 'event' ? <FormTab /> : type === 'invite' && <InviteTab />}
				</>
			)}
		</div>
	);
};

export default TabPanel;
