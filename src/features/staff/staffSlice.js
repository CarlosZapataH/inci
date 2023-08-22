import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as staffService from '@src/features/staff/service/staff.service.js';

const initialState = {
	staff: [],
};

const staffSlice = createSlice({
	name: 'staff',
	initialState,
	reducers: {
		setStaff(state) {
			state.staff = [];
		},
	},
	extraReducers: (builder) => {},
});

export const { setStaff } = staffSlice.actions;
export default staffSlice.reducer;
