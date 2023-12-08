import { FormControl, InputAdornment, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	userSearch,
	clearSearchResults,
} from '../../../../../../redux/slices/userSlice';
import SearchIcon from '@mui/icons-material/Search';
import './search.scss';
import UserTemplate from '../../../../../../components/UserTemplate';

const SearchTab = () => {
	const { searchResults } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	let timer;

	const handleFocus = () => {
		const searchInput = document.getElementById('search-box');
		dispatch(clearSearchResults());
		searchInput.value = '';
	};

	const handleChange = (e) => {
		const inputValue = e.target.value;
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (inputValue.trim() === '') {
				dispatch(clearSearchResults());
			} else {
				dispatch(userSearch(inputValue.trim()));
			}
		}, 1000);
	};
	return (
		<div id='search'>
			<div className='search-bar-container'>
				<FormControl variant='standard' fullWidth>
					<TextField
						id='search-box'
						type='text'
						placeholder='Search for your friends!'
						onFocus={handleFocus}
						onChange={handleChange}
						size='small'
						margin='dense'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon className='search-icon' />
								</InputAdornment>
							),
						}}
					/>
				</FormControl>
			</div>
			<div className='search-results-container'>
				{searchResults.length > 0 &&
					searchResults.map((item) => (
						<UserTemplate key={item._id} data={item} />
					))}
			</div>
		</div>
	);
};

export default SearchTab;
