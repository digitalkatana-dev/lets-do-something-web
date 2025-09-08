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
				<span>{dynamicWelcomeMessage()}</span>
			</div>
		</div>
	);
};

export default Welcome;
