import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './memories.scss';
import Carousel from './components/Carousel';

const Memories = () => {
	const { memoryEvents } = useSelector((state) => state.calendar);
	const [memories, setMemories] = useState(null);

	useEffect(() => {
		const pics = [];
		memoryEvents?.forEach((item) => {
			if (item.pics.length > 0) {
				item.pics?.forEach((item) => {
					pics.push({
						id: item._id,
						date: item.date,
						location: item.location,
						pic: item.pic,
						user: item.user,
					});
				});
			}
		});

		setMemories(pics.length > 0 ? pics : null);
	}, [memoryEvents]);

	return (
		<div className='memories'>
			<h3>Memories</h3>
			<div className={memories ? 'memory-container' : 'memory-container empty'}>
				{memories ? (
					<Carousel memories={memories} />
				) : (
					<h2>No memories yet, would you like to share?</h2>
				)}
			</div>
		</div>
	);
};

export default Memories;
