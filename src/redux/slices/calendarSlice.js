import {
	createEntityAdapter,
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import { getUser } from './userSlice';
import { setSelectedEvent } from './eventSlice';
import { getMonth } from '../../util/helpers';
import dayjs from 'dayjs';
import doSomethingApi from '../../api/doSomethingApi';

export const createEvent = createAsyncThunk(
	'calendar/create_event',
	async (eventInfo, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.post('/events', eventInfo);
			const creator = res.data.event.createdBy;
			if (creator) dispatch(getUser(creator));

			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getAllEvents = createAsyncThunk(
	'calendar/get_all_events',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.get('/events');
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getInvitedEvents = createAsyncThunk(
	'calendar/get_invited_events',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.get('/events/invited');
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateEvent = createAsyncThunk(
	'calendar/update_event',
	async (eventInfo, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.put(`/events/update`, eventInfo);
			const creator = res.data.updateEvent.createdBy;
			if (creator) dispatch(getUser(creator));

			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const attendEvent = createAsyncThunk(
	'calendar/rsvp',
	async (eventInfo, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.put('/events/add-attendee', eventInfo);
			const creator = res.data.updateEvent.createdBy;
			if (creator) dispatch(getUser(creator));

			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const cancelRsvp = createAsyncThunk(
	'calendar/cancel_rsvp',
	async (eventInfo, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.put(
				'/events/remove-attendee',
				eventInfo
			);
			const creator = res.data.updateEvent.createdBy;
			if (creator) dispatch(getUser(creator));

			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteEvent = createAsyncThunk(
	'calendar/delete_event',
	async (eventInfo, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.delete(`/events/${eventInfo}`);
			if (res.data.success) {
				dispatch(getUser(eventInfo.user));
				dispatch(setSelectedEvent(null));
			}

			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const uploadMemory = createAsyncThunk(
	'calendar/upload_memory',
	async (eventInfo, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.post('/events/photo-upload', eventInfo);
			const creator = res.data.updateEvent.createdBy;
			if (creator) dispatch(getUser(creator));

			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const calendarAdapter = createEntityAdapter();
const initialState = calendarAdapter.getInitialState({
	loading: false,
	open: false,
	currentMonth: getMonth(),
	monthIndex: dayjs().month(),
	currentMonthSmall: getMonth(),
	monthIndexSmall: dayjs().month(),
	daySelected: null,
	selectedEvent: null,
	savedEvents: null,
	currentEvents: null,
	memoryEvents: null,
	guestList: null,
	eventsAttending: null,
	success: null,
	errors: null,
});

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		toggleOpen: (state, action) => {
			state.open = action.payload;
		},
		setCurrentMonth: (state, action) => {
			state.currentMonth = getMonth(action.payload);
		},
		setMonthIndex: (state, action) => {
			state.monthIndex = action.payload;
		},
		setCurrentMonthSmall: (state, action) => {
			state.currentMonthSmall = getMonth(action.payload);
		},
		setMonthIndexSmall: (state, action) => {
			state.monthIndexSmall = action.payload;
		},
		setDaySelected: (state, action) => {
			state.daySelected = action.payload;
		},
		setGuestList: (state, action) => {
			state.guestList = action.payload;
		},
		setEventsAttending: (state, action) => {
			state.eventsAttending = action.payload;
		},
		setErrors: (state, action) => {
			state.errors = action.payload;
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
			.addCase(createEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(createEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.savedEvents = action.payload.allEvents;
				state.currentEvents = action.payload.current;
				state.success = action.payload.success;
				state.open = false;
			})
			.addCase(createEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getAllEvents.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getAllEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.savedEvents = action.payload.all;
				state.currentEvents = action.payload.current;
				state.memoryEvents = action.payload.all;
			})
			.addCase(getAllEvents.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getInvitedEvents.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getInvitedEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.savedEvents = action.payload.invited;
				state.currentEvents = action.payload.current;
			})
			.addCase(getInvitedEvents.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.savedEvents = action.payload.updatedAll;
				state.currentEvents = action.payload.current;
				state.success = action.payload.success;
				state.open = false;
			})
			.addCase(updateEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(attendEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(attendEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.savedEvents = action.payload.updatedAll;
				state.currentEvents = action.payload.current;
				state.guestList = action.payload.updatedEvent.attendees;
				state.eventsAttending = action.payload.updatedEventsAttending;
				state.open = false;
			})
			.addCase(attendEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(cancelRsvp.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(cancelRsvp.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.savedEvents = action.payload.updatedAll;
				state.currentEvents = action.payload.current;
				state.guestList = action.payload.updatedEvent.attendees;
				state.eventsAttending = action.payload.updatedEventsAttending;
			})
			.addCase(cancelRsvp.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(deleteEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(deleteEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.savedEvents = action.payload.updatedAll;
				state.currentEvents = action.payload.current;
				state.open = false;
			})
			.addCase(deleteEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(uploadMemory.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(uploadMemory.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.savedEvents = action.payload.updatedAll;
				state.currentEvents = action.payload.current;
				state.memoryEvents = action.payload.updatedAll;
			})
			.addCase(uploadMemory.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const {
	toggleOpen,
	setCurrentMonth,
	setMonthIndex,
	setCurrentMonthSmall,
	setMonthIndexSmall,
	setDaySelected,
	setGuestList,
	setEventsAttending,
	setErrors,
	clearSuccess,
	clearErrors,
} = calendarSlice.actions;

export default calendarSlice.reducer;
