import { http } from '@src/features/api/api.js';

const updateStaff = async (payload) => {
	try {
		const { data } = await http.post('siscap/users/information', payload);
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

export { updateStaff };
