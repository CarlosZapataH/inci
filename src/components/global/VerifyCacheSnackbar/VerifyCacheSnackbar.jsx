import { Alert, Button, LinearProgress, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as serviceUsers from '@src/features/staff/service/staff.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';
import moment from 'moment';

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
			const userDocument = localStorage.getItem('userDocument');
			const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

			await serviceUsers.listUsers({ documento: userDocument });
			localStorage.setItem('lastUpdate', currentDate);
			localStorage.setItem('lastUpdateDocument', userDocument);
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoading(false);
		}
	};

	const verifyLastUpdate = () => {
		moment.locale('es');
		const lastUpdate = localStorage.getItem('lastUpdate');
		const curretDocument = localStorage.getItem('userDocument');
		const lastUpdateDocumento = localStorage.getItem('lastUpdateDocument');

		if (lastUpdate && curretDocument == lastUpdateDocumento) {
			const currentDate = moment().format('YYYY-MM-DD');
			const lastDate = moment(lastUpdate);
			const same = lastDate.isSame(currentDate, 'day');
			if (same) {
				setConfigSnackbar({
					text: 'Los usuarios se han descargado recientemente. <br> ¿Desea realizar una actualización?',
					severity: 'info',
				});
				setOpen(true);
			} else {
				getUsers();
			}
		} else {
			getUsers();
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
		verifyLastUpdate();
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
			<Snackbar open={open} autoHideDuration={20000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={configSnackbar?.severity}
					sx={{ width: '100%' }}
				>
					<div dangerouslySetInnerHTML={{ __html: configSnackbar?.text }} />
					<Button
						sx={{ marginTop: 1 }}
						variant="outlined"
						onClick={getUsers}
						size="small"
					>
						Actualizar
					</Button>
				</Alert>
			</Snackbar>
		</div>
	);
};
export default VerifyCacheSnackbar;
