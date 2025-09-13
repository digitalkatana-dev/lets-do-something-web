import axios from 'axios';
import { store } from '../redux/rootStore';
import { logout } from '../redux/slices/userSlice';
import { isTokenExpired } from '../util/helpers';

const instance = axios.create({
	baseURL: 'http://localhost:3005',
});

instance.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem('token');
		if (token) {
			if (isTokenExpired(token)) {
				store.dispatch(logout());
				alert('Session expired. Please log in again.');
				throw new axios.Cancel('Token expired, logging out.');
			}
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

instance.interceptors.response.use(
	(response) => response,
	(err) => {
		if (err.response?.status === 401) {
			store.dispatch(logout());
			alert('Session expired. Please log in again.');
		}
		return Promise.reject(err);
	}
);

export default instance;
