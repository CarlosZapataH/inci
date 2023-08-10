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

const SearchTabs = () => {
	const routeMatch = useRouteMatch(['/search/personal', '/search/general']);
	const currentTab = routeMatch?.pattern?.path;
	return (
		<Box sx={{ bgcolor: 'primary.main', minHeight: 0 }}>
			<Tabs
				value={currentTab}
				indicatorColor="secondary"
				textColor="secondary"
				centered
			>
				<Tab
					label="Búsqueda de Personal"
					value="/search/personal"
					to="/search/personal"
					component={Link}
				/>
				<Tab
					label="Búsqueda General"
					value="/search/general"
					to="/search/general"
					component={Link}
				/>
			</Tabs>
		</Box>
	);
};

export default SearchTabs;
