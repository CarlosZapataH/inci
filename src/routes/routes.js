import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '@src/routes/protectedRoute.jsx';
import Login from '@src/pages/login';
import Dashboard from '@src/pages/dashboard';
import ProfilePage from '@src/pages/profile';
import GeneralSearchPage from '@src/pages/search/general/GeneralSearch';
import PesonalSearchPage from '@src/pages/search/personal/PesonalSearch';
import PersonalGuestPage from '@src/pages/guest/personal/PersonalGuest.js';
import UserPermissionsPage from '@src/pages/user/permissions/UserPermissions.js';
import ErrorPage from '@src/components/global/ErrorPage/ErrorPage.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/guest/personal/:userDocument',
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
				path: '/user/permissions',
				element: <UserPermissionsPage />,
			},
		],
	},
	// {
	// 	path: '/',
	// 	element: <Root />,
		
	// },
]);

// DELETE ROUTES
// path: '/procedure/search',
// path: '/procedure/upload',
// path: '/procedure/:procedureId/detail',

export default router;
