import React from 'react';
import {
	dynamicWelcomeImage,
	dynamicWelcomeMessage,
} from '../../../../util/helpers';
import './welcome.scss';

const Welcome = () => {
	return (
		<div id='welcome'>
			<img src={dynamicWelcomeImage()} alt='' />
			<div className='message'>
				<h2 className='responsive-h1'>{dynamicWelcomeMessage()}</h2>
			</div>
		</div>
	);
};

export default Welcome;
