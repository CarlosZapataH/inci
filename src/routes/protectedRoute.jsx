import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '@src/features/auth/authSlice';

const LoadingPage = () => {
	return (
		<div>
			<h1>Cargando...</h1>
		</div>
	);
};

const ProtectedRoute = () => {
	const dispatch = useDispatch();
	const statusAuth = useSelector((state) => state.auth.status);

	useEffect(() => {
		dispatch(checkSession());
	}, []);

	switch (statusAuth) {
		case 'authenticating':
			return <LoadingPage />;
		case 'authenticated':
			return <Outlet />;
		case 'not-authenticated':
			return <Navigate to="/" replace />;
	}
};

export default ProtectedRoute;
