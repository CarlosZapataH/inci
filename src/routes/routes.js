import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '@src/routes/protectedRoute.jsx';
import Login from '@src/pages/login';
import Dashboard from '@src/pages/dashboard';
import ProfilePage from '@src/pages/profile';
import PesonalSearchPage from '@src/pages/search/personal/PesonalSearch';
import GeneralSearchPage from '@src/pages/search/general/GeneralSearch';
import ProcedureSearchPage from '@src/pages/procedure/search/ProcedureSearch';
import ProcedureUploadPage from '@src/pages/procedure/upload/ProcedureUpload';
import PersonalGuestPage from '@src/pages/guest/personal/PersonalGuest.js';
import ProcedureDetailPage from '@src/pages/procedure/detail/ProcedureDetailPage.js';
import UserPermissionsPage from '@src/pages/user/permissions/UserPermissions.js';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/guest/personal',
		element: <PersonalGuestPage />,
	},
	{
		path: '/guest/personal/:userId',
		element: <PersonalGuestPage />,
	},
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/profile',
				element: <ProfilePage />,
			},
			{
				path: '/search',
				element: <Navigate to="/search/personal" replace />,
			},
			{
				path: '/search/personal',
				element: <PesonalSearchPage />,
			},
			{
				path: '/search/general',
				element: <GeneralSearchPage />,
			},
			{
				path: '/search',
				element: <Navigate to="/procedure/search" replace />,
			},
			{
				path: '/procedure/search',
				element: <ProcedureSearchPage />,
			},
			{
				path: '/procedure/upload',
				element: <ProcedureUploadPage />,
			},
			{
				path: '/procedure/:procedureId/detail',
				element: <ProcedureDetailPage />,
			},
			{
				path: '/user/permissions',
				element: <UserPermissionsPage />,
			},
		],
	},
]);

export default router;
