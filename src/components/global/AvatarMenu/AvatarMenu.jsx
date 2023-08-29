import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { PersonAdd, AdminPanelSettings } from '@mui/icons-material';
import Logout from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Link, redirect, useNavigate } from 'react-router-dom';

export default function AccountMenu() {
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/login');
		handleClose();
	};

	const printAvataName = () => {
		const firstLetter = (user?.name || '').charAt(0);
		const secondLetter = (user?.last_name_father || '').charAt(0);
		return (firstLetter + secondLetter).toLocaleUpperCase();
	};
	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title="Perfil">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 40, height: 40, bgcolor: 'orange.main' }}>
							{printAvataName()}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<Box
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					padding={1}
				>
					<Typography variant="body2">{user?.name}</Typography>
					<Typography variant="body2" gutterBottom>
						{user?.last_name_father}
					</Typography>
					<Typography variant="caption" display="block">
						{user?.email_corp}
					</Typography>
				</Box>
				<Divider />
				<MenuItem
					component={Link}
					to={'/user/permissions'}
					sx={{ paddingY: 1.5 }}
				>
					<ListItemIcon>
						<AdminPanelSettings fontSize="small" />
					</ListItemIcon>
					<Typography variant="body2">Ver Permisos</Typography>
				</MenuItem>
				<MenuItem onClick={logout} sx={{ paddingY: 1.5 }}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					<Typography variant="body2">Logout</Typography>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
