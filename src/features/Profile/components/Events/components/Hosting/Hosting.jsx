import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	IconButton,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import './hosting.scss';

const Hosting = ({ event }) => {
	const [rsvpOpen, setRsvpOpen] = useState(event ? event.rsvpOpen : false);
	let background;
	let color;

	switch (event?.label) {
		case 'violet':
			background = 'rgba(238, 130, 238, .8)';
			color = 'whitesmoke';
			break;
		case 'grey':
			background = 'rgba(128, 128, 128, .8)';
			color = 'whitesmoke';
			break;
		case 'teal':
			background = 'rgba(0, 128, 128, .8)';
			color = 'whitesmoke';
			break;
		case 'dodgerblue':
			background = 'rgba(30, 144, 255, .8)';
			color = 'whitesmoke';
			break;
		case 'tomato':
			background = 'rgba(255, 99, 71, .8)';
			color = 'whitesmoke';
			break;
		case 'mediumpurple':
			background = 'rgba(147, 112, 216, .8)';
			color = 'whitesmoke';
			break;

		default:
			color = 'black';
			break;
	}

	return (
		<Accordion
			sx={{ '&:not(:last-child)': { borderBottom: '2px ridge white' } }}
			style={{ backgroundColor: background, margin: 0 }}
		>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<h4 style={{ color: color }}>
					{event?.type +
						' ' +
						event?.date +
						' ' +
						dayjs(event?.time).format('LT') +
						' ' +
						event?.location}
				</h4>
			</AccordionSummary>
			<AccordionDetails>
				<div className='detail-row'>
					<div className='row-section'>
						<h4>RSVP Open</h4>
					</div>
					<div className='row-section'>
						<h4>Delete</h4>
					</div>
				</div>
				<div className='detail-row'>
					<div className='row-section'>
						{event?.isPublic ? (
							<Stack direction='row' spacing={1} alignItems='center'>
								<Typography style={{ color: 'whitesmoke' }}>Closed</Typography>
								<Switch
									checked={rsvpOpen}
									onChange={() => setRsvpOpen(!rsvpOpen)}
									color='default'
								/>
								<Typography style={{ color: 'whitesmoke' }}>Open</Typography>
							</Stack>
						) : (
							<h4>N/A</h4>
						)}
					</div>
					<div className='row-section'>
						<IconButton style={{ backgroundColor: 'whitesmoke' }}>
							<DeleteIcon htmlColor='red' />
						</IconButton>
					</div>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default Hosting;
