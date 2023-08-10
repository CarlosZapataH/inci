import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';

function useRouteMatch(patterns) {
	const { pathname } = useLocation();

	for (let i = 0; i < patterns.length; i += 1) {
		const pattern = patterns[i];
		const possibleMatch = matchPath(pattern, pathname);
		if (possibleMatch !== null) {
			return possibleMatch;
		}
	}

	return null;
}

const ProcedureTabs = () => {
	const routeMatch = useRouteMatch(['/procedure/search', '/procedure/upload']);
	const currentTab = routeMatch?.pattern?.path;
	return (
		<Box sx={{ bgcolor: 'primary.main' }}>
			<Tabs value={currentTab} indicatorColor="secondary" textColor="secondary">
				<Tab
					label="Búsqueda"
					value="/procedure/search"
					to="/procedure/search"
					component={Link}
				/>
				<Tab
					label="Carga"
					value="/procedure/upload"
					to="/procedure/upload"
					component={Link}
				/>
			</Tabs>
		</Box>
	);
};

export default ProcedureTabs;
