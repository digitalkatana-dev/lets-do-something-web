import { CircularProgress } from '@mui/material';
import './button.scss';

const Button = ({
	disabled,
	type,
	label,
	btnClass,
	btnStyle,
	loading,
	onClick,
}) => {
	return (
		<button
			disabled={disabled}
			type={type}
			className={`btn ${btnClass}`}
			style={btnStyle}
			onClick={onClick}
		>
			{loading ? <CircularProgress size={20} thickness={5} /> : label}
		</button>
	);
};

export default Button;
