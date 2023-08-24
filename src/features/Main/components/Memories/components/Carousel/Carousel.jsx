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
			{memories?.map((item) => (
				<div className='pic-container' key={item.id}>
					<img src={item.pic} alt='test' />
					<div className='overlay'>
						<h5>{item.location + ' ' + item.date}</h5>
						<h5>Uploaded by: {item.user}</h5>
					</div>
				</div>
			))}
		</Slider>
	);
};

export default Carousel;
