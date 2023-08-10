import { http } from './api';

const getUsers = async () => {
	try {
		const { data } = await http.get('user', {
			params: { app_id: parseInt(process.env.REACT_APP_ID), company_id: 1 },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getCourseByUser = async (params) => {
	try {
		const { data } = await http.get('course/user', {
			params: {
				...params,
				company_id: 1,
				app_id: parseInt(process.env.REACT_APP_ID),
			},
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getCourses = async (params) => {
	try {
		const { data } = await http.get('course', {
			params: { ...params },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getGeneralCourses = async (params) => {
	try {
		const { data } = await http.get('course/general', {
			params: { ...params },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getGeneralGuestCourses = async (params) => {
	try {
		const { data } = await http.get('course/guest/general', {
			params: { ...params },
		});
		return data || null;
	} catch (error) {
		return Promise.reject(error);
	}
};

export {
	getUsers,
	getCourseByUser,
	getCourses,
	getGeneralCourses,
	getGeneralGuestCourses,
};
