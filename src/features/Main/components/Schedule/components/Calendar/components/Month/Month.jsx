import { Fragment } from 'react';
import { Grid } from '@mui/material';
import Day from '../Day';

const Month = ({ month }) => {
	return (
		<div className='month'>
			{month.map((row, i) => (
				<Fragment key={i}>
					<Grid container columns={7}>
						{row.map((day, idx) => (
							<Day key={idx} day={day} rowIdx={i} />
						))}
					</Grid>
				</Fragment>
			))}
		</div>
	);
};

export default Month;
