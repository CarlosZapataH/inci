import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as securityService from '@src/features/security/service/security.js';

export const listCharges = createAsyncThunk('security/listCharges', async () => {
	const response = await securityService.getCharges();
	return response;
});

export const listCostCenter = createAsyncThunk(
	'security/listCostCenter',
	async (params) => {
		const response = await securityService.getManagements(params);
		return response;
	}
);

const initialState = {
	costCenter: [],
	charges: [],
};

const courseSlice = createSlice({
	name: 'security',
	initialState,
	reducers: {
		setCharges(state) {
			state.charges = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(listCharges.fulfilled, (state, action) => {
			state.charges = action?.payload?.data;
		});
		builder.addCase(listCostCenter.fulfilled, (state, action) => {
			state.costCenter = action?.payload?.data;
		});
	},
});

export const { setCharges } = courseSlice.actions;
export default courseSlice.reducer;
