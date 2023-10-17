import React, { useEffect, useState } from 'react';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { Box, Container, Typography } from '@mui/material';

const OfflineBar = () => {
	const [online, setOnline] = useState(navigator ? navigator.onLine : true);
	const [savedUsers, setSavedUsers] = useState(false);

	const verifycache = async () => {
		try {
			const cacheName = 'siscap-users-cache';
			const cacheNames = await caches.keys();
			const isInclude = [...cacheNames].includes(cacheName);
			setSavedUsers(isInclude);
		} catch (error) {
			setSavedUsers(false);
		}
	};

	const goOnline = () => {
		verifycache();
		setOnline(true);
	};

	const goOffline = async () => {
		verifycache();
		setOnline(false);
	};

	useEffect(() => {
		if (window) {
			verifycache();
			window.addEventListener('online', goOnline);
			window.addEventListener('offline', goOffline);
		}

		return () => {
			if (window) {
				window.removeEventListener('online', goOnline);
				window.removeEventListener('offline', goOffline);
			}
		};
	}, []);

	return (
		<div>
			{!online && !savedUsers && (
				<Box bgcolor={'orange.main'} paddingY={0.5}>
					<Container>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<WifiOffIcon
								sx={{ color: '#ffffff', marginRight: 1 }}
								fontSize="small"
							/>
							<Typography
								sx={{
									textAlign: 'center',
									fontWeight: 'bold',
								}}
								color="white"
								variant="caption"
							>
								Sin conexión a Internet y no hay datos guardados.
							</Typography>
						</Box>
					</Container>
				</Box>
			)}
		</div>
	);
};
export default OfflineBar;
