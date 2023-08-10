import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../auth/authSlice';
import courseReducer from '../course/courseSlice';
import securityReducer from '../security/securitySlice';
import procedureReducer from '../procedure/procedureSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		course: courseReducer,
		security: securityReducer,
		procedure: procedureReducer,
	},
});
