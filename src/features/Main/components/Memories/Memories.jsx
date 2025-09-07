import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMemories,
	clearMemorySuccess,
} from '../../../../redux/slices/memorySlice';
import './memories.scss';
import Carousel from './components/Carousel';

const Memories = () => {
	const { allMemories, success } = useSelector((state) => state.memory);
	const dispatch = useDispatch();

	const loadMemories = useCallback(() => {
		dispatch(getMemories());
	}, [dispatch]);

	const handleSuccess = useCallback(() => {
		if (success) {
			setTimeout(() => {
				dispatch(clearMemorySuccess());
			}, 5000);
		}
	}, [dispatch, success]);

	useEffect(() => {
		loadMemories();
	}, [loadMemories]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	return (
		<div className='memories'>
			<h3>Memories</h3>
			<div
				className={
					allMemories?.length > 0
						? 'memory-container'
						: 'memory-container empty'
				}
			>
				{allMemories?.length > 0 ? (
					<Carousel memories={allMemories} />
				) : (
					<h2>No memories yet, would you like to share?</h2>
				)}
			</div>
		</div>
	);
};

export default Memories;
