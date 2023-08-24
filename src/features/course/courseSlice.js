import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as courseService from '@src/api/course';

export const listUsers = createAsyncThunk('course/listUsers', async () => {
	const response = await courseService.getUsers();
	return response;
});

export const listCoursesByUser = createAsyncThunk(
	'course/listCoursesByUser',
	async (filters) => {
		const response = await courseService.getCourseByUser(filters);
		return response;
	}
);

export const listCourses = createAsyncThunk('course/listCourses', async (params) => {
	const response = await courseService.getCourses(params);
	return response;
});

export const listGeneralCourses = createAsyncThunk(
	'course/listGeneralCourses',
	async (params) => {
		const response = await courseService.getGeneralCourses(params);
		return response;
	}
);

export const listGeneralGuestCourses = createAsyncThunk(
	'course/listGeneralGuestCourses',
	async (params) => {
		const response = await courseService.getGeneralGuestCourses(params);
		return response;
	}
);

const initialState = {
	users: [],
	courses: [],
	coursesUsers: [],
	coursesByUser: [],
};

const uniqueUsers = (users) => {
	let result = [];
	if (Array.isArray(users)) {
		result = users.filter(
			(user, index) =>
				users.findIndex((u) => u.fullName === user.fullName) === index
		);
		result = result.filter((user) => !!user?.document);
	}
	return result;
};

const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		setCourses(state) {
			state.courses = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(listUsers.fulfilled, (state, action) => {
			state.users = uniqueUsers(action?.payload?.data);
		});
		builder.addCase(listCoursesByUser.fulfilled, (state, action) => {
			state.coursesByUser = action?.payload?.courses;
		});
		builder.addCase(listCourses.fulfilled, (state, action) => {
			state.courses = action?.payload?.courses;
		});
		builder.addCase(listGeneralCourses.fulfilled, (state, action) => {
			state.coursesUsers = action?.payload?.coursesUsers;
		});
		builder.addCase(listGeneralGuestCourses.fulfilled, (state, action) => {
			state.coursesUsers = action?.payload?.coursesUsers;
		});
	},
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;
