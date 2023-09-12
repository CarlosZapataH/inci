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
			const { personas } = await serviceUsers.listUsers();
			const persons = Array.isArray(personas) ? personas : [];
			if (persons.length > 0) {
				showSnackbar(
					`Hemos guardado exitosamente ${persons.length} trabajadores.`,
					'success'
				);
				localStorage.setItem('lastUpdate', currentDate);
				localStorage.setItem('lastUpdateDocument', userDocument);
			} else {
				showSnackbar(
					'¡Ups! No se pudo guardar la información de los trabajadores. <br> Por favor, inténtalo de nuevo más tarde.',
					'warning'
				);
			}
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoading(false);
		}
	};

	const showSnackbar = (text = '', severity = 'info') => {
		setOpen(false);
		setConfigSnackbar({ text, severity });
		setOpen(true);
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
		const cacheName = 'siscap-users-cache';
		try {
			caches.keys().then((cacheNames) => {
				if ([...cacheNames].includes(cacheName)) {
					console.log('SISCAP	está en caché');
				} else {
					localStorage.removeItem('lastUpdate');
					localStorage.removeItem('lastUpdateDocument');
					console.log('La respuesta de la API no está en caché');
				}
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	useEffect(() => {
		verifycache();
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
					{configSnackbar?.severity === 'info' && (
						<Button
							sx={{ marginTop: 1 }}
							variant="outlined"
							onClick={getUsers}
							size="small"
						>
							Actualizar
						</Button>
					)}
				</Alert>
			</Snackbar>
		</div>
	);
};
export default VerifyCacheSnackbar;
