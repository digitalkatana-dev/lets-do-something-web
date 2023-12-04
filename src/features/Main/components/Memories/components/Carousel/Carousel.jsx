import Slider from 'react-slick';
import './carousel.scss';

const Carousel = ({ memories }) => {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Slider {...settings} className='slide' autoplay>
			{memories?.map((item) => {
				const displayName = `${item.uploadedBy.firstName} ${item.uploadedBy.lastName}`;
				return (
					<div className='pic-container' key={item._id}>
						<div className='pic-wrapper'>
							<img src={item.image} alt='test' />
							<div className='overlay'>
								<h5>{item.location + ' ' + item.date}</h5>
								<h5>Uploaded by: {displayName}</h5>
							</div>
						</div>
					</div>
				);
			})}
		</Slider>
	);
};

export default Carousel;
