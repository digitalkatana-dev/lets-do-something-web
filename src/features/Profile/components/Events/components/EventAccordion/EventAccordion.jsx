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
import './eventAccordion.scss';

const EventAccordion = ({ event }) => {
	const [rsvpOpen, setRsvpOpen] = useState(event ? event.rsvpOpen : false);
	let color;

	switch (event?.label) {
		case 'violet':
		case 'grey':
		case 'teal':
		case 'dodgerblue':
		case 'tomato':
		case 'mediumpurple':
			color = 'whitesmoke';
			break;

		default:
			color = 'black';
			break;
	}

	return (
		<Accordion
			sx={{ '&:not(:last-child)': { borderBottom: '2px ridge white' } }}
			style={{ backgroundColor: event?.label, margin: 0 }}
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

export default EventAccordion;
