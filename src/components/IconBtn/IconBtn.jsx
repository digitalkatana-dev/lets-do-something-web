import { IconButton, Tooltip } from '@mui/material';

const IconBtn = ({
	tooltip,
	placement,
	edge,
	disabled,
	onClick,
	onMouseDown,
	children,
}) => {
	return (
		<>
			{disabled ? (
				<IconButton
					edge={edge}
					disabled={disabled}
					onClick={onClick}
					onMouseDown={onMouseDown}
				>
					{children}
				</IconButton>
			) : (
				<Tooltip title={tooltip} placement={placement}>
					<IconButton edge={edge} onClick={onClick} onMouseDown={onMouseDown}>
						{children}
					</IconButton>
				</Tooltip>
			)}
		</>
	);
};

export default IconBtn;
