import React from 'react';
import './memories.scss';

const Memories = () => {
	return (
		<div className='memories'>
			<h3>Memories</h3>
			<div className='memory-container empty'>
				<h2>No memories yet, would you like to share?</h2>
			</div>
		</div>
	);
};

export default Memories;
