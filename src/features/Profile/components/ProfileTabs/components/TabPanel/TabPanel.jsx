import { Box, Typography } from '@mui/material';
import EventTemplate from '../EventTemplate';
import SearchTab from '../SearchTab';
import UserTemplate from '../../../../../../components/UserTemplate';

const TabPanel = ({ children, index, value, type, ...other }) => {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
			style={{ height: 'calc(100% - 129px)', overflowY: 'auto' }}
		>
			{value === index && (
				<>
					{type === 'search' ? (
						<SearchTab />
					) : (
						<Box sx={{ padding: '10px 10px 0 10px' }}>
							{type === 'friend'
								? children?.map((item) => (
										<UserTemplate key={item._id} data={item} />
								  ))
								: (type === 'host' || type === 'attend') &&
								  children.map((item) => (
										<EventTemplate key={item._id} data={item} type={type} />
								  ))}
							{children.length === 0 && (
								<Typography>Nothing to Show!</Typography>
							)}
						</Box>
					)}
				</>
			)}
		</div>
	);
};

export default TabPanel;
