import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './memories.scss';
import Carousel from './components/Carousel';

const Memories = () => {
	// const {memoryEvents} = useSelector(state=> state.calendar);
	const [memories, setMemories] = useState([
		{
			id: 1,
			date: '8/22/2023',
			location: 'My Kitchen',
			pic: 'https://res.cloudinary.com/dk9gbz4ag/image/upload/v1684994355/samples/food/spices.jpg',
			user: 'Brandon Benoit',
		},
		{
			id: 2,
			date: '8/19/2023',
			location: 'The Office Bar & Grill',
			pic: 'https://res.cloudinary.com/dk9gbz4ag/image/upload/v1684994354/samples/imagecon-group.jpg',
			user: 'John Doe',
		},
		{
			id: 3,
			date: '8/15/2023',
			location: 'Right near da beach maaan!',
			pic: 'https://res.cloudinary.com/dk9gbz4ag/image/upload/v1684994354/samples/imagecon-group.jpg',
			user: 'Samson Simpson',
		},
	]);

	// useEffect(() => {
	// 	const pics = [];
	// 	memoryEvents?.forEach((item) => {
	// 		if (item.pics.length > 0) {
	// 			item.pics?.forEach((item) => {
	// 				pics.push({
	// 					id: item.id,
	// 					date: item.date,
	// 					location: item.location,
	// 					pic: item.pic,
	// 					user: item.user,
	// 				});
	// 			});
	// 		}
	// 	});

	// 	setMemories(pics.length > 0 ? pics : null);
	// }, [memoryEvents]);

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
