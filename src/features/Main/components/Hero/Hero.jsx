import { isAndroid } from 'react-device-detect';
import { TypeAnimation } from 'react-type-animation';
import './hero.scss';

const Hero = () => {
	return (
		<div id='hero'>
			<video
				src={
					isAndroid
						? 'https://player.vimeo.com/external/438686620.sd.mp4?s=5ea7ab27d60b88010819922022532f2ccaf7ef08&amp;profile_id=164&amp;oauth2_token_id=57447761'
						: '/brunch.mp4'
				}
				loop
				playsInline
				muted
				autoPlay
			/>
			<div className='hero-txt'>
				<h1>
					Let's{' '}
					<TypeAnimation
						cursor={true}
						sequence={[
							'Do Brunch!',
							2000,
							'Go To The Movies!',
							2000,
							'Go Roller Skating!',
							2000,
							'Do Something!!',
							5000,
						]}
						wrapper='span'
						repeat={Infinity}
					/>
				</h1>
			</div>
		</div>
	);
};

export default Hero;
