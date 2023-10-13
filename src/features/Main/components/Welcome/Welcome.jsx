import React from 'react';
import './welcome.scss';

const Welcome = () => {
	return (
		<div className='welcome'>
			<h3>
				Welcome to <span>Let's Do Something!</span> Please feel free to use this
				site to schedule events, of all kinds, with your friends and family! Are
				you ready? Then Let's Do Something!
			</h3>
			{/* <h3>
				Welcome to <span>Let's Do Something!</span> Please feel free to use this
				site to schedule events, of all kinds, with your friends and family! As
				this site was created with my friends in mind, any personal data that is
				saved is encrypted, and your data will NEVER be sold. Are you ready?
				Then Let's Do Something!
			</h3> */}
		</div>
	);
};

export default Welcome;
