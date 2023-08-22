import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../auth/authSlice';
import courseReducer from '../course/courseSlice';
import securityReducer from '../security/securitySlice';
import procedureReducer from '../procedure/procedureSlice';
import staffReducer from '../staff/staffSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		course: courseReducer,
		security: securityReducer,
		procedure: procedureReducer,
		staff: staffReducer,
	},
});
