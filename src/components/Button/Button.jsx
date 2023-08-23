import { CircularProgress } from '@mui/material';
import './button.scss';

const Button = ({ type, label, loading, onClick }) => {
	return (
		<button type={type} className='btn' onClick={onClick}>
			{loading ? <CircularProgress size={20} thickness={5} /> : label}
		</button>
	);
};

export default Button;
