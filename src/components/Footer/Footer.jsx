// import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
// import CallIcon from '@mui/icons-material/Call';
import CopyrightIcon from '@mui/icons-material/Copyright';
import './footer.scss';

const Footer = () => {
	const { menuOpen } = useSelector((state) => state.nav);

	return (
		<footer className={menuOpen ? 'footer active' : 'footer'}>
			{/* <div className='social-container'>
				<p className='content'>Social</p>
				<div className='divider' />
				<div className='row'>
					<Tooltip title='Instagram' placement='left-start'>
						<IconButton
							href='https://instagram.com/matchmakingnannyservices/'
							target='_blank'
							referrerPolicy='no-referrer'
						>
							<InstagramIcon className='white-txt' />
						</IconButton>
					</Tooltip>
					<Tooltip title='LinkedIn' placement='top'>
						<IconButton
							href='https://www.linkedin.com/in/kristin-rogers-97358b21a/'
							target='_blank'
							referrerPolicy='no-referrer'
						>
							<LinkedInIcon className='white-txt' />
						</IconButton>
					</Tooltip>
					<Tooltip title='FaceBook' placement='right-start'>
						<IconButton
							href='https://www.facebook.com/profile.php?id=100090630715504'
							target='_blank'
							referrerPolicy='no-referrer'
						>
							<FacebookIcon className='white-txt' />
						</IconButton>
					</Tooltip>
				</div>
			</div> */}
			<div className='contact-info'>
				<p className='content white-txt'>Contact Us At</p>
				<div className='divider' />
				{/* <div className='row contact-row'>
					<CallIcon className='icon' />
					<h4>619-540-9227</h4>
				</div> */}
				<div className='row contact-row'>
					<EmailIcon className='icon' />
					<Link
						className='link email-link white-txt'
						to='mailto:support@letsdosomething.net'
					>
						support@letsdosomething.net
					</Link>
				</div>
			</div>
			<div className='privacy'>
				<p className='content'>Information</p>
				<div className='divider' />
				<Link
					className='link email-link white-txt'
					to='https://www.privacypolicies.com/live/3bf9d52c-aab9-41ce-8e9d-d37093c5c8b0'
					target='_blank'
				>
					Privacy Policy
				</Link>
				<div className='row copyright'>
					<CopyrightIcon className='icon' />
					<p className='sub-headline-alt'>
						2023{' '}
						<Link
							className='link email-link white-txt'
							to='mailto:digitalkatana.dev'
						>
							digitalkatana.dev
						</Link>{' '}
						All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
