import { http } from '@src/features/api/api.js';

const login = async (params) => {
	try {
		const { data } = await http.post('auth/login', params);
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getProfile = async () => {
	try {
		const { data } = await http.get('auth/profile', {
			params: { app_id: parseInt(process.env.REACT_APP_ID) },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

export {
	login,
	getProfile,
	// passwordRecovery,
	// passwordUpdateRecovery,
	// passwordRecoveryToken,
};
