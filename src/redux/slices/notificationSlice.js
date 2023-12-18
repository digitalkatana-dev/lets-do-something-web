import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import doSomethingApi from '../../api/doSomethingApi';

export const getAllNotifications = createAsyncThunk();

export const getLatestNotification = createAsyncThunk(
	'notification/get_latest',
	async (data, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.get('/notifications/latest');
			return res.data;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const notificationAdapter = createEntityAdapter();
const initialState = notificationAdapter.getInitialState({
	loading: false,
	latest: null,
	allNotifications: [],
	success: null,
	errors: null,
});

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		clearLatest: (state) => {
			state.latest = null;
		},
		clearSuccess: (state) => {
			state.success = null;
		},
		clearErrors: (state) => {
			state.errors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getLatestNotification.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getLatestNotification.fulfilled, (state, action) => {
				state.loading = false;
				state.latest = action.payload.latest;
			})
			.addCase(getLatestNotification.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const { clearLatest, clearSuccess, clearErrors } =
	notificationSlice.actions;

export default notificationSlice.reducer;
