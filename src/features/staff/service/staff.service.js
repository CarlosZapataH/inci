import { http } from '@src/features/api/api.js';

const updateStaff = async (payload) => {
	try {
		const { data } = await http.post('siscap/users/information', payload);
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

export { updateStaff, listUsers, getUsersFile };
