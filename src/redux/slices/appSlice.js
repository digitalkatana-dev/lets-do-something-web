import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
// import { PURGE } from 'redux-persist';

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	isMobile: false,
	deleteOpen: false,
	deleteData: null,
	memoryOpen: false,
	errors: null,
});

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setIsMobile: (state, action) => {
			state.isMobile = action.payload;
		},
		openDelete: (state, action) => {
			state.deleteOpen = action.payload;
		},
		setDeleteData: (state, action) => {
			state.deleteData = action.payload;
		},
		setMemoryOpen: (state, action) => {
			state.memoryOpen = action.payload;
		},
	},
});

export const { setIsMobile, openDelete, setDeleteData, setMemoryOpen } =
	appSlice.actions;

export default appSlice.reducer;
