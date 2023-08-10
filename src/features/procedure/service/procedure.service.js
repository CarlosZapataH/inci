import { http } from '@src/features/api/api.js';

const getProcedures = async (params) => {
	try {
		const { data } = await http.get('procedure', {
			params: { ...params },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const createProcedures = async (payload) => {
	try {
		const { data } = await http.post('procedure/load', payload);
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const createProceduresDocument = async (payload) => {
	try {
		const { data } = await http.post('procedure/load/zip', payload);
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

export { getProcedures, createProcedures, createProceduresDocument };
