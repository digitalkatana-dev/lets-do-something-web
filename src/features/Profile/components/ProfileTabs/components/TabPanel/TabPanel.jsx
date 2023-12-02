import { Box, Typography } from '@mui/material';
import EventTemplate from '../EventTemplate';

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
				<Box>
					{children?.length > 0 ? (
						children?.map((item) => (
							<EventTemplate key={item._id} data={item} type={type} />
						))
					) : (
						<Typography>Nothing to Show!</Typography>
					)}
				</Box>
			)}
		</div>
	);
};

export default TabPanel;
