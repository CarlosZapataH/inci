import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ConfipetrolLogo from '@src/images/confipetrol-logo.png';
import { Link } from 'react-router-dom';
import { esES } from '@mui/material/locale';

const defaultTheme = createTheme(
	{
		palette: {
			primary: {
				main: '#0039a6',
			},
			secondary: {
				main: '#edf2ff',
			},
			white: {
				main: '#ffffff',
			},
			orange: {
				main: '#ff7900',
			},
			customColor: {
				main: '#0000ff', // Nuevo color personalizado
				light: 'rgb(51, 96, 183)',
				dark: 'rgb(0, 39, 116)',
				contrastText: '#fff',
			},
		},
	},
	esES
);
// const drawerWidth = 240;
const drawerWidth = 0;

function ResponsiveDrawer(props) {
	const { window, children } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div className="hello">
			<Toolbar />
			<Divider />
			<List>
				{['Búsqueda'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['Procedimiento'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<ThemeProvider theme={defaultTheme}>
			<Box sx={{ display: 'flex', backgroundColor: '#ebf1f4' }}>
				<CssBaseline />
				<AppBar
					color="white"
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
					}}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						{/* <Typography variant="h6" noWrap component="div">
							Confipetrol
						</Typography> */}
						<Link to="/dashboard">
							<img
								style={{ height: '50px' }}
								className="confi-logo"
								src={ConfipetrolLogo}
								alt="confipetrol-logo"
							/>
						</Link>
					</Toolbar>
				</AppBar>
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: 240,
							},
						}}
					>
						{drawer}
					</Drawer>
					{/* <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer> */}
				</Box>
				<Box
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flex: '1 1 auto',
						overflow: 'auto',
						// flexGrow: 1,
						//p: 3,
						//width: { sm: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					{children}
				</Box>
			</Box>
		</ThemeProvider>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default ResponsiveDrawer;
