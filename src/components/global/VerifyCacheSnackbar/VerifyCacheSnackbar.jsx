import { Alert, LinearProgress, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as serviceUsers from '@src/features/staff/service/staff.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';

const VerifyCacheSnackbar = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [configSnackbar, setConfigSnackbar] = useState({
		text: '',
		severity: 'success',
	});

	const getUsers = async () => {
		try {
			setLoading(true);
			await serviceUsers.listUsers();
			verifycache();
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoading(false);
		}
	};

	const verifycache = () => {
		caches
			.match('https://hombrenuevo-api.smartrix.pe/api/v1/siscap/users')
			.then((response) => {
				if (response) {
					setConfigSnackbar({
						text: 'La función offline está disponible.',
						severity: 'success',
					});
				} else {
					// 'Función offline no disponible. Por favor, actualiza la página.'
					setConfigSnackbar({
						text: 'Proceso de carga completado.',
						severity: 'info',
					});
				}
			})
			.catch((error) => {
				setConfigSnackbar({
					text: 'Lamentamos informarte que la función offline aún no está disponible',
					severity: 'error',
				});
			})
			.finally(() => {
				setOpen(true);
			});
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div>
			{loading && (
				<>
					<LinearProgress />
					<Typography paddingX={1} variant="caption">
						Cargando recursos Offline
					</Typography>
				</>
			)}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={configSnackbar?.severity}
					sx={{ width: '100%' }}
				>
					{configSnackbar?.text}
				</Alert>
			</Snackbar>
		</div>
	);
};
export default VerifyCacheSnackbar;
