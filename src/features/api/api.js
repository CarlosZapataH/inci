import axios from 'axios';
//import { urlApi } from './config';
//import store from '@/store';

const http = axios.create({
	baseURL: process.env.REACT_APP_API + '/api/v1',
});

http.interceptors.request.use((config) => {
	const configParams = config.params;
	const configHeaders = config.headers;
	config.params = { company_id: localStorage.getItem('company_id'), ...configParams };
	config.headers = {
		...configHeaders,
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	};
	return config;
});

// http.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		const status = store.state.auth.status;
// 		if (error.response.status === 401) {
// 			store.dispatch('auth/logout');
// 			if (status == 'authenticated') {
// 				window.location.href = '/';
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );

export { http };
