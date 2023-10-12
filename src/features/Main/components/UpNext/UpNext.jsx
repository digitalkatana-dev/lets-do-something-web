import { TypeAnimation } from 'react-type-animation';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import './upNext.scss';
import Loading from '../../../../components/Loading';

const UpNext = () => {
	const { loading, currentEvents } = useSelector((state) => state.calendar);

	return (
		<div id='up-next'>
			<h2>
				Up next:{' '}
				{loading ? (
					<Loading size={20} style={{ marginBottom: -5, marginLeft: 5 }} />
				) : !loading && currentEvents?.length > 0 ? (
					<TypeAnimation
						cursor={true}
						sequence={[
							dayjs(currentEvents[0]?.date).format('MMM DD, YYYY'),
							2000,
							`${currentEvents[0]?.type} @ ${currentEvents[0]?.location}`,
							4000,
						]}
						wrapper='span'
						repeat={Infinity}
					/>
				) : (
					'TBD'
				)}
			</h2>
		</div>
	);
};

export default UpNext;
