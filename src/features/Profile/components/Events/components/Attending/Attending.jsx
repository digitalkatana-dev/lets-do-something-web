import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UndoIcon from '@mui/icons-material/Undo';
import './attending.scss';

const Attending = ({ event }) => {
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
			sx={{ '&:not(:last-child)': { borderBottom: '2px ridge whitesmoke' } }}
			style={{ backgroundColor: event?.label, margin: 0 }}
		>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<h4 style={{ color }}>
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
						<h4>Cancel</h4>
					</div>
				</div>
				<div className='detail-row'>
					<div className='row-section'>
						<IconButton style={{ backgroundColor: 'whitesmoke' }}>
							<UndoIcon htmlColor='green' />
						</IconButton>
					</div>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default Attending;
