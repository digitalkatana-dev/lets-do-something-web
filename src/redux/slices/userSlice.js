import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { setMenuView } from './navSlice';
import doSomethingApi from '../../api/doSomethingApi';

export const register = createAsyncThunk(
	'user/register',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.post('/users/register', data);
			const { token, userData } = res.data;
			await localStorage.setItem('token', token);
			dispatch(setMenuView('Login'));
			return userData;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await doSomethingApi.post('/users/login', data);
			const { token, userData } = res.data;
			await localStorage.setItem('token', token);
			dispatch(setMenuView('Login'));
			return userData;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getUser = createAsyncThunk(
	'user/get_user',
	async (data, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.get(`/users/${data}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateProfilePic = createAsyncThunk(
	'user/profile_pic',
	async (data, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.post('/users/profile-pic', data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const generatePasswordToken = createAsyncThunk(
	'user/generate_password_token',
	async (userData, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.post(
				'/users/generate-password-token',
				userData
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const resetPasswordWithToken = createAsyncThunk(
	'user/reset_with_token',
	async (userData, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.post('/users/reset-password', userData);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/update_user',
	async (data, { rejectWithValue }) => {
		try {
			const res = await doSomethingApi.put('/users/update', data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({
	loading: false,
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
	password: '',
	notify: 'sms',
	show: false,
	user: null,
	success: null,
	errors: null,
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setFirstName: (state, action) => {
			state.firstName = action.payload;
		},
		setLastName: (state, action) => {
			state.lastName = action.payload;
		},
		setPhone: (state, action) => {
			state.phone = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		setNotify: (state, action) => {
			state.notify = action.payload;
		},
		setShow: (state) => {
			state.show = !state.show;
		},
		setErrors: (state, action) => {
			state.errors = action.payload;
		},
		clearForm: (state) => {
			state.firstName = '';
			state.lastName = '';
			state.phone = '';
			state.email = '';
			state.password = '';
			state.notify = 'sms';
		},
		clearSuccess: (state) => {
			state.success = null;
		},
		clearErrors: (state) => {
			state.errors = null;
		},
		logout: (state) => {
			state.loading = false;
			state.firstName = '';
			state.lastName = '';
			state.phone = '';
			state.email = '';
			state.password = '';
			state.notify = 'sms';
			state.user = null;
			state.success = null;
			state.errors = null;
			localStorage.removeItem('token');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.firstName = '';
				state.lastName = '';
				state.phone = '';
				state.email = '';
				state.password = '';
				state.notify = 'sms';
				state.user = action.payload;
				state.errors = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.email = '';
				state.password = '';
				state.user = action.payload;
				state.errors = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getUser.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateProfilePic.pending, (state) => {
				state.loading = true;
				state.errors = false;
			})
			.addCase(updateProfilePic.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(updateProfilePic.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(generatePasswordToken.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(generatePasswordToken.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.email = '';
			})
			.addCase(generatePasswordToken.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(resetPasswordWithToken.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(resetPasswordWithToken.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.password = '';
			})
			.addCase(resetPasswordWithToken.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.userData;
				state.success = action.payload.success;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(logout, (state) => {
				userAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				userAdapter.removeAll(state);
			});
	},
});

export const {
	setFirstName,
	setLastName,
	setPhone,
	setEmail,
	setPassword,
	setNotify,
	setShow,
	setErrors,
	clearForm,
	clearSuccess,
	clearErrors,
	logout,
} = userSlice.actions;

export default userSlice.reducer;
