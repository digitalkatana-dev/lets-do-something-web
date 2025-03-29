import { useState } from 'react';
import './textInput.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const TextInput = ({
	style,
	label,
	leftIcon,
	rightIcon,
	disabled,
	type,
	placeholder,
	value,
	onChange,
	onFocus,
	error,
}) => {
	const [show, setShow] = useState(false);

	return (
		<div className='text-input' style={style}>
			{label && <label>{label}</label>}
			<div className='input-container'>
				{leftIcon}
				<input
					disabled={disabled}
					type={show ? 'text' : type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onFocus={onFocus}
				/>
				{type === 'password' ? (
					<>
						{show ? (
							<VisibilityOffIcon
								className='hide'
								onClick={() => setShow(!show)}
							/>
						) : (
							<VisibilityIcon className='hide' onClick={() => setShow(!show)} />
						)}
					</>
				) : (
					rightIcon
				)}
			</div>
			{error && <h6 className='error'>{error}</h6>}
		</div>
	);
};

export default TextInput;
