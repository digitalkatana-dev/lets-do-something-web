import React from 'react';
import './welcome.scss';

const Welcome = () => {
	return (
		<div className='welcome'>
			<h3>
				Welcome to <span>The Brunch Network!</span> We will be having brunch on
				the last Sunday of each month at new and exciting locations around San
				Diego. Of course, you can come here to get updates on the next brunch,
				but notifications will also be sent to members prior to the next brunch
				with details on the time/location. Please be sure to RSVP to ensure
				correct headcount. Are you ready? The Let's Do Brunch!
			</h3>
		</div>
	);
};

export default Welcome;
