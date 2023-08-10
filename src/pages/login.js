import React from 'react';
import PublicLayout from '@src/components/layout/PublicLayout.js';
import Login from '../components/auth/login/index.js';

const LoginPage = () => {
	return (
		<PublicLayout>
			<Login />
		</PublicLayout>
	);
};

export default LoginPage;
