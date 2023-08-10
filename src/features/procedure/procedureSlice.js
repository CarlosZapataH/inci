import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as procedureService from '@src/features/procedure/service/procedure.service.js';

export const listProcedures = createAsyncThunk(
	'procedure/listProcedures',
	async (params) => {
		const response = await procedureService.getProcedures(params);
		return response;
	}
);

export const createProcedures = createAsyncThunk(
	'procedure/createProcedures',
	async (payload) => {
		const response = await procedureService.createProcedures(payload);
		return response;
	}
);

const initialState = {
	procedures: [],
};

const courseSlice = createSlice({
	name: 'procedure',
	initialState,
	reducers: {
		setProcedures(state) {
			state.procedures = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(listProcedures.fulfilled, (state, action) => {
			state.procedures = action?.payload?.procedures;
		});
	},
});

export const { login } = courseSlice.actions;
export default courseSlice.reducer;
