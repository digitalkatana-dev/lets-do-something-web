import React from 'react';
import './welcome.scss';

const Welcome = () => {
	return (
		<div id='welcome'>
			<img src='new-year.jpg' alt='' />
			<div className='message'>
				<span>Happy</span>
				<span>New</span>
				<span>Year!</span>
			</div>
		</div>
	);
};

export default Welcome;
