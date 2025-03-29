import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import calendarReducer from './slices/calendarSlice';
import navReducer from './slices/navSlice';
import memoryReducer from './slices/memorySlice';
import notificationReducer from './slices/notificationSlice';

const userPersistConfig = {
	key: 'user',
	storage,
	whitelist: ['activeUser'],
};

const calendarPersistConfig = {
	key: 'calendar',
	storage,
	whitelist: ['eventsAttending'],
};

export const store = configureStore({
	reducer: {
		app: appReducer,
		user: persistReducer(userPersistConfig, userReducer),
		calendar: persistReducer(calendarPersistConfig, calendarReducer),
		nav: navReducer,
		memory: memoryReducer,
		notification: notificationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
