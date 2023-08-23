import { CircularProgress } from '@mui/material';
import './touchable.scss';

const TouchableOpacity = ({ inlineStyle, loading, onClick, children }) => {
	return (
		<button className='pressable' style={inlineStyle} onClick={onClick}>
			{loading ? <CircularProgress /> : children}
		</button>
	);
};

export default TouchableOpacity;
