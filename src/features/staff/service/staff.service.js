import { http } from '@src/features/api/api.js';

const updateHelmet = async (payload) => {
	try {
		const { data } = await http.post('/siscap/users/helmet', payload);
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const assignMentor = async (payload) => {
	try {
		const { data } = await http.post('siscap/users/coach', payload);
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const listUsers = async (payload) => {
	try {
		const { data } = await http.get('/siscap/users', {
			params: { ...payload },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getUsersFile = async (payload) => {
	try {
		const { data } = await http.get('/siscap/users/download', {
			params: { ...payload },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

export { updateHelmet, listUsers, getUsersFile, assignMentor };
