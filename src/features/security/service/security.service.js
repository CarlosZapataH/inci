import { http } from '@src/features/api/api.js';

const usersActive = async (params) => {
	try {
		const { data } = await http.get('user', { params });
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getManagements = async (params) => {
	try {
		const { data } = await http.get('cost-center/all', {
			params: { app_id: parseInt(process.env.REACT_APP_ID) },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getCostCenter = async (parameter) => {
	try {
		const { data } = await http.get(`cost-center/${parameter || ''}`);
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getCharges = async (params) => {
	try {
		const { data } = await http.get('charge', { params });
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const searchUsers = async (params) => {
	try {
		const { data } = await http.get('user/search', { params });
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

export { usersActive, getManagements, getCostCenter, getCharges, searchUsers };
