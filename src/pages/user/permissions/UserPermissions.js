import React from 'react';
import Layout from '@src/components/layout';
import UserPermissions from '@src/components/user/permissions/UserPermissions.jsx';

const UserPermissionsPage = () => {
	return (
		<Layout>
			<UserPermissions />
		</Layout>
	);
};

export default UserPermissionsPage;
