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
import userReducer from './slices/userSlice';
import calendarReducer from './slices/calendarSlice';
import eventReducer from './slices/eventSlice';
import navReducer from './slices/navSlice';
import memoryReducer from './slices/memorySlice';

const userPersistConfig = {
	key: 'user',
	storage,
	whitelist: ['user'],
};

const calendarPersistConfig = {
	key: 'calendar',
	storage,
	whitelist: ['eventsAttending'],
};

export const store = configureStore({
	reducer: {
		user: persistReducer(userPersistConfig, userReducer),
		calendar: persistReducer(calendarPersistConfig, calendarReducer),
		event: eventReducer,
		nav: navReducer,
		memory: memoryReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
