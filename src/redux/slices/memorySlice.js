import {
	createEntityAdapter,
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import doSomethingApi from '../../api/doSomethingApi';

export const createMemory = createAsyncThunk(
	'memory/create_new_memory',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.post('/memories', data);
			const { success } = res.data;
			success && dispatch(getMemories());
			return success;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const getMemories = createAsyncThunk(
	'memory/get_memories',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.get('/memories');
			return res.data;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const memoryAdapter = createEntityAdapter();
const initialState = memoryAdapter.getInitialState({
	loading: false,
	date: '',
	location: '',
	eventId: '',
	memory: null,
	allMemories: null,
	success: null,
	errors: null,
});

export const memorySlice = createSlice({
	name: 'memory',
	initialState,
	reducers: {
		setMemoryDate: (state, action) => {
			state.date = action.payload;
		},
		setMemoryLocation: (state, action) => {
			state.location = action.payload;
		},
		setEventId: (state, action) => {
			state.eventId = action.payload;
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
			.addCase(createMemory.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(createMemory.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(createMemory.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getMemories.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getMemories.fulfilled, (state, action) => {
				state.loading = false;
				state.allMemories = action.payload;
			})
			.addCase(getMemories.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const { setMemoryDate, setMemoryLocation, setEventId } =
	memorySlice.actions;

export default memorySlice.reducer;
