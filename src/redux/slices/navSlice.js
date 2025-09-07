import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { clearForm, clearUserErrors } from './userSlice';

export const setMenuView = createAsyncThunk(
	'nav/set_view',
	async (data, { dispatch }) => {
		try {
			dispatch(clearForm());
			dispatch(clearUserErrors());
			return data;
		} catch (err) {
			return { message: 'Error setting menu view!' };
		}
	}
);

export const navAdapter = createEntityAdapter();
const initialState = navAdapter.getInitialState({
	loading: false,
	menuOpen: false,
	menuView: 'Login',
	errors: null,
});

export const navSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		setMenuOpen: (state, action) => {
			state.menuOpen = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(setMenuView.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(setMenuView.fulfilled, (state, action) => {
				state.menuView = action.payload;
			});
	},
});

export const { setMenuOpen } = navSlice.actions;

export default navSlice.reducer;
