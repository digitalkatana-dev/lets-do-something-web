import {
	createEntityAdapter,
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import { setDeleteData } from './appSlice';
import { getUser } from './userSlice';
import { socket } from '../../util/socket';
import { getMonth, defaultTime, reFormatTime } from '../../util/helpers';
import { labelClasses, typeOptions } from '../../util/data';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import doSomethingApi from '../../api/doSomethingApi';
dayjs.extend(isSameOrAfter);

export const setDaySelected = createAsyncThunk(
	'calendar/set_selected_day',
	async (data, { dispatch }) => {
		const { day, eventTime } = data;
		try {
			dispatch(
				setEventTime(
					eventTime ? reFormatTime(eventTime, day) : defaultTime(day)
				)
			);
			return day;
		} catch (err) {
			return { message: 'Error settng date' };
		}
	}
);

export const createEvent = createAsyncThunk(
	'calendar/create_event',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.post('/events', data);
			if (res.data.success) {
				dispatch(getUser(data.createdBy));
				dispatch(getInvitedEvents(data.createdBy));
				dispatch(clearEvent());
			}
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

export const getDayEvents = createAsyncThunk(
	'calendar/get_day_events',
	async (data, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.get(`/events/?date=${data}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getInvitedEvents = createAsyncThunk(
	'calendar/get_invited_events',
	async (data, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.get(`/events/?user=${data}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getSingleEvent = createAsyncThunk(
	'calendar/get_single_event',
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
	'calendar/send_reminders',
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
	'calendar/send_invite',
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
	'calendar/find_guest',
	async (guestInfo, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.post('/users/check', guestInfo);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const findAndInvite = createAsyncThunk(
	'calendar/find_and_invite',
	async (data, { rejectWithValue, dispatch }) => {
		const { creator, ...others } = data;
		try {
			const res = await doSomethingApi.post('/users/find-and-invite', others);
			const { success, updatedEvent } = res.data;
			if (success) {
				dispatch(getUser(creator));
				dispatch(getInvitedEvents(creator));
				dispatch(setSelectedEvent(updatedEvent));
			}
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const removeInvitedGuest = createAsyncThunk(
	'calendar/remove_invited',
	async (data, { rejectWithValue, dispatch }) => {
		const { user, ...others } = data;
		try {
			const res = await doSomethingApi.put('/events/guests', others);
			const { success, updated } = res.data;
			if (success) {
				dispatch(getInvitedEvents(user));
				dispatch(setSelectedEvent(updated));
			}
			return success;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateEvent = createAsyncThunk(
	'calendar/update_event',
	async (data, { rejectWithValue, dispatch }) => {
		const { user, ...others } = data;
		try {
			const res = await doSomethingApi.put(`/events/update`, others);
			const { success, updated } = res.data;
			if (success) {
				dispatch(getUser(user));
				dispatch(getInvitedEvents(user));
				dispatch(setSelectedEvent(updated));
			}
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const processRsvp = createAsyncThunk(
	'calendar/rsvp',
	async (data, { rejectWithValue, dispatch }) => {
		const { isAttending, ...others } = data;
		try {
			const res = await doSomethingApi.put('/events/rsvp', others);
			const { success, updated } = res.data;
			if (success) {
				dispatch(setHeadcount(''));
				dispatch(getUser(data.user));
				dispatch(getInvitedEvents(data.user));
				dispatch(setSelectedEvent(updated));
				if (isAttending === false) {
					socket.emit('rsvp', updated.createdBy);
				}
			}
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
			const res = await doSomethingApi.delete(`/events/${eventInfo.event}`);
			const { success } = res.data;
			if (success) {
				dispatch(getUser(eventInfo.user));
				dispatch(setSelectedEvent(null));
				dispatch(setDeleteData(null));
			}
			return success;
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
	allEvents: null,
	currentEvents: null,
	fsDayEvents: null,
	selectedEvent: null,
	guestList: null,
	eventsAttending: null,
	isPublic: false,
	rsvpOpen: true,
	eventType: '',
	eventTypeInput: '',
	eventTime: '',
	eventLoc: '',
	eventNote: '',
	selectedLabel: labelClasses[0],
	selectedFriend: null,
	invitedGuestInput: '',
	invitedGuests: [],
	headcount: '',
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
		setGuestList: (state, action) => {
			state.guestList = action.payload;
		},
		setEventsAttending: (state, action) => {
			state.eventsAttending = action.payload;
		},
		setFSDayEvents: (state, action) => {
			state.fsDayEvents = action.payload;
		},
		setSelectedEvent: (state, action) => {
			state.selectedEvent = action.payload;
			if (action.payload === null) {
				state.isPublic = false;
				state.rsvpOpen = true;
				state.eventType = '';
				state.eventTypeInput = '';
				state.eventTime = '';
				state.eventLoc = '';
				state.eventNote = '';
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
				// state.eventTime = action.payload.time;
				state.eventLoc = action.payload.location;
				state.eventNote = action.payload.notes;
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
		setEventNote: (state, action) => {
			state.eventNote = action.payload;
		},
		setHeadcount: (state, action) => {
			state.headcount = action.payload;
		},
		setSelectedLabel: (state, action) => {
			state.selectedLabel = action.payload;
		},
		setSelectedFriend: (state, action) => {
			state.selectedFriend = action.payload === '' ? null : action.payload;
		},
		addFriendToGuestList: (state, action) => {
			state.invitedGuests = [...state.invitedGuests, action.payload];
			state.selectedFriend = null;
		},
		setInvitedGuestInput: (state, action) => {
			state.invitedGuestInput = action.payload;
		},
		removeGuest: (state, action) => {
			state.invitedGuests = action.payload;
		},
		clearSelectedDay: (state) => {
			state.daySelected = null;
		},
		clearFSDayEvents: (state) => {
			state.fsDayEvents = null;
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
			state.eventNote = '';
			state.selectedLabel = labelClasses[0];
			state.invitedGuestInput = '';
			state.invitedGuests = [];
		},
		clearCalendarSuccess: (state) => {
			state.success = null;
		},
		clearCalendarErrors: (state) => {
			state.errors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(setDaySelected.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(setDaySelected.fulfilled, (state, action) => {
				state.loading = false;
				state.daySelected = action.payload;
			})
			.addCase(setDaySelected.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(createEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(createEvent.fulfilled, (state, action) => {
				state.loading = false;
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
				state.allEvents = action.payload.events;
				state.currentEvents = action.payload.current;
				// state.currentEvents =
				// 	action.payload.filter((item) =>
				// 		dayjs(item.date).isSameOrAfter(new Date(), 'day')
				// 	) == []
				// 		? null
				// 		: action.payload.filter((item) =>
				// 				dayjs(item.date).isSameOrAfter(new Date(), 'day')
				// 		  );
			})
			.addCase(getAllEvents.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getDayEvents.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getDayEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.dayEvents = action.payload;
			})
			.addCase(getDayEvents.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getInvitedEvents.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getInvitedEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.allEvents = action.payload.events;
				state.currentEvents = action.payload.current;
				// state.currentEvents =
				// 	action.payload.filter((item) =>
				// 		dayjs(item.date).isSameOrAfter(new Date(), 'day')
				// 	) == []
				// 		? null
				// 		: action.payload.filter((item) =>
				// 				dayjs(item.date).isSameOrAfter(new Date(), 'day')
				// 		  );
			})
			.addCase(getInvitedEvents.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
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
				const isInvited = state.invitedGuests.some(
					(item) => item._id === action.payload._id
				);
				state.loading = false;
				if (isInvited) {
					state.errors = { guest: 'Guest already invited' };
				} else {
					state.invitedGuestInput = '';
					state.invitedGuests = [...state.invitedGuests, action.payload];
				}
			})
			.addCase(findGuest.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(findAndInvite.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(findAndInvite.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
			})
			.addCase(findAndInvite.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(removeInvitedGuest.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(removeInvitedGuest.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(removeInvitedGuest.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
			})
			.addCase(updateEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(processRsvp.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(processRsvp.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.guestList = action.payload.updated.attendees;
				state.open = false;
			})
			.addCase(processRsvp.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(deleteEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(deleteEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.open = false;
			})
			.addCase(deleteEvent.rejected, (state, action) => {
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
	setGuestList,
	setEventsAttending,
	setFSDayEvents,
	setSelectedEvent,
	setIsPublic,
	setRSVPOpen,
	setEventType,
	setEventTypeInput,
	setEventTime,
	setEventLoc,
	setEventNote,
	setHeadcount,
	setSelectedLabel,
	setSelectedFriend,
	addFriendToGuestList,
	setInvitedGuestInput,
	removeGuest,
	clearSelectedDay,
	clearFSDayEvents,
	setErrors,
	clearEvent,
	clearCalendarSuccess,
	clearCalendarErrors,
} = calendarSlice.actions;

export default calendarSlice.reducer;
