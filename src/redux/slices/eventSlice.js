import {
	createEntityAdapter,
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import { labelClasses, typeOptions } from '../../util/data';
import doSomethingApi from '../../api/doSomethingApi';

export const getSingleEvent = createAsyncThunk(
	'event/get_single_event',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.get(`/events/${eventInfo}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const sendReminders = createAsyncThunk(
	'event/send_reminders',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.post('/events/reminders', eventInfo);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const inviteSingle = createAsyncThunk(
	'event/send_invite',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.post('/events/invite', eventInfo);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const findGuest = createAsyncThunk(
	'event/find_guest',
	async (guestInfo, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.post('/users/find', guestInfo);
			dispatch(setInvitedGuestInput(''));
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const eventAdapter = createEntityAdapter();
const initialState = eventAdapter.getInitialState({
	loading: false,
	selectedEvent: null,
	isPublic: false,
	rsvpOpen: true,
	eventType: '',
	eventTypeInput: '',
	eventTime: '',
	eventLoc: '',
	selectedLabel: labelClasses[0],
	invitedGuestInput: '',
	invitedGuests: [],
	headcount: '',
	success: null,
	errors: null,
});

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setSelectedEvent: (state, action) => {
			state.selectedEvent = action.payload;
			if (action.payload === null) {
				state.isPublic = false;
				state.rsvpOpen = true;
				state.eventType = '';
				state.eventTypeInput = '';
				state.eventTime = '';
				state.eventLoc = '';
				state.selectedLabel = labelClasses[0];
				state.invitedGuestInput = '';
				state.invitedGuests = [];
			} else {
				const optionMatch = typeOptions.find(
					(item) => item === action.payload.type
				);
				state.isPublic = action.payload.isPublic;
				state.rsvpOpen = action.payload.rsvpOpen;
				state.eventType = optionMatch ? action.payload.type : 'other';
				state.eventTypeInput = !optionMatch ? action.payload.type : '';
				state.eventTime = action.payload.time;
				state.eventLoc = action.payload.location;
				state.selectedLabel = action.payload.label;
				state.invitedGuests = action.payload.invitedGuests;
			}
		},
		setIsPublic: (state, action) => {
			state.isPublic = action.payload;
		},
		setRSVPOpen: (state, action) => {
			state.rsvpOpen = action.payload;
		},
		setEventType: (state, action) => {
			state.eventType = action.payload;
			if (action.payload !== 'other') state.eventTypeInput = '';
		},
		setEventTypeInput: (state, action) => {
			state.eventTypeInput = action.payload;
		},
		setEventTime: (state, action) => {
			state.eventTime = action.payload;
		},
		setEventLoc: (state, action) => {
			state.eventLoc = action.payload;
		},
		setHeadcount: (state, action) => {
			state.headcount = action.payload;
		},
		setSelectedLabel: (state, action) => {
			state.selectedLabel = action.payload;
		},
		setInvitedGuestInput: (state, action) => {
			state.invitedGuestInput = action.payload;
		},
		removeInvitedGuest: (state, action) => {
			const updated = state.invitedGuests.filter(
				(item) => item._id !== action.payload._id
			);
			state.invitedGuests = updated;
		},
		setErrors: (state, action) => {
			state.errors = action.payload;
		},
		clearEvent: (state) => {
			state.isPublic = false;
			state.rsvpOpen = true;
			state.eventType = '';
			state.eventTypeInput = '';
			state.eventTime = '';
			state.eventLoc = '';
			state.selectedLabel = labelClasses[0];
			state.invitedGuestInput = '';
			state.invitedGuests = [];
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
			.addCase(getSingleEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getSingleEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedEvent = action.payload;
			})
			.addCase(getSingleEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(sendReminders.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(sendReminders.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(sendReminders.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(inviteSingle.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(inviteSingle.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(inviteSingle.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(findGuest.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(findGuest.fulfilled, (state, action) => {
				const alreadyInvited = state.invitedGuests.find(
					(item) => item._id === action.payload._id
				);
				state.loading = false;
				if (alreadyInvited) {
					state.errors = { guest: 'Guest already invited' };
				} else {
					state.invitedGuests = [...state.invitedGuests, action.payload];
				}
			})
			.addCase(findGuest.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const {
	setSelectedEvent,
	setIsPublic,
	setRSVPOpen,
	setEventType,
	setEventTypeInput,
	setEventTime,
	setEventLoc,
	setHeadcount,
	setSelectedLabel,
	setInvitedGuestInput,
	removeInvitedGuest,
	setErrors,
	clearEvent,
	clearSuccess,
	clearErrors,
} = eventSlice.actions;

export default eventSlice.reducer;
