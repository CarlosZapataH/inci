import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme({
	palette: {
		primary: {
			main: '#0039a6',
		},
		orange: {
			main: '#fb8c00',
			contrastText: 'white',
		},
	},
});

function PublicLayout({ children }) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

PublicLayout.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default PublicLayout;
