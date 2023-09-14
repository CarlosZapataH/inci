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
			if (persons.length > 0 && (await verifycache())) {
				localStorage.setItem('lastUpdate', currentDate);
				localStorage.setItem('lastUpdateDocument', userDocument);
				showSnackbar(
					`Hemos guardado exitosamente ${persons.length} ${
						persons.length === 1 ? 'registro' : 'registros'
					}.`,
					'success'
				);
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

	const verifyLastUpdate = async () => {
		moment.locale('es');
		const lastUpdate = localStorage.getItem('lastUpdate');
		const curretDocument = localStorage.getItem('userDocument');
		const lastUpdateDocumento = localStorage.getItem('lastUpdateDocument');

		if (
			lastUpdate &&
			curretDocument == lastUpdateDocumento &&
			(await verifycache())
		) {
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

	const verifycache = async () => {
		try {
			const cacheName = 'siscap-users-cache';
			const cacheNames = await caches.keys();
			const isRegistered = [...cacheNames].includes(cacheName);
			if (isRegistered) {
				return true;
			} else {
				localStorage.removeItem('lastUpdate');
				localStorage.removeItem('lastUpdateDocument');
				return false;
			}
		} catch (error) {
			return false;
		}
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
