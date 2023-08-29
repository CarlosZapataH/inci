import { createSelector } from '@reduxjs/toolkit';
const allPermissions = (state) => state.auth?.permissions;

export const checkPermissions = createSelector(
	allPermissions,
	(permissions) => (moduleName, pageName, activityName) => {
		if (Array.isArray(permissions)) {
			return permissions.some(
				(permission) =>
					permission?.module_name == moduleName &&
					permission?.page_name == pageName &&
					permission?.activity_name == activityName
			);
		}
		return false;
	}
);
