import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '@src/api/auth';

export const checkSession = createAsyncThunk('auth/checkSession', async () => {
	const response = await authService.getProfile(); // Cambia la URL por la de tu API
	return response;
});

const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
	status: 'authenticating', // 'authenticated','not-authenticated', 'authenticating'
};

const setCompanyStorage = (data) => {
	const companies = data?.user?.companies;
	if (Array.isArray(companies)) {
		localStorage.setItem('company_id', companies[0]?.id);
	}
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
		setToken: (state, action) => {
			state.token = action.payload;
			//state.isAuthenticated = !!action.payload;
		},

		// logout: (state, action) => {
		// 	state.user = null;
		// 	state.token = null;
		// 	state.status = 'not-authenticated';

		// 	localStorage.removeItem('token');
		// 	localStorage.removeItem('company_id');
		// },

		// checkAuthentication: async (state, action) => {
		// 	const token = localStorage.getItem('token');
		// 	let company_id = localStorage.getItem('company_id');
		// 	if (!token) {
		// 		logout();
		// 		return { ok: false, message: 'No hay token' };
		// 	}
		// 	try {
		// 		const { user } = await authService.getProfile();

		// 		if (Array.isArray(user?.companies)) {
		// 			const found = user.companies.find(
		// 				(company) => company.id == parseInt(company_id)
		// 			);
		// 			if (!found) {
		// 				localStorage.setItem('company_id', user.companies[0]?.id);
		// 				company_id = user.companies[0]?.id;
		// 			}
		// 		}

		// 		//commit('LOGIN_USER', { user, token });
		// 		//commit('SET_MODULES', { user, company_id });
		// 		//commit('SET_FLAG_PASSWORD_RESET', user?.flag_password_reset || false);

		// 		return { ok: true };
		// 	} catch (error) {
		// 		//commit('LOGOUT');
		// 		return { ok: false, message: error.response?.data?.message };
		// 	}
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkSession.pending, (state) => {
				state.isAuthenticated = false;
				state.status = 'authenticating';
			})
			.addCase(checkSession.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.status = 'authenticated';
				setCompanyStorage(action?.payload);
			})
			.addCase(checkSession.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.status = 'not-authenticated';
			});
	},
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
