import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import * as staffService from '@src/features/staff/service/staff.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';
import Swal from 'sweetalert2';

const helmetList = [
	{ key: 'blue', colorName: 'Azul', colorPrimary: '', colorSecondary: '' },
	{ key: 'yellow', colorName: 'Amarillo', colorPrimary: '', colorSecondary: '' },
	{ key: 'orange', colorName: 'Anaranjado', colorPrimary: '', colorSecondary: '' },
	{ key: 'white', colorName: 'Blanco', colorPrimary: '', colorSecondary: '' },
	{ key: 'gray', colorName: 'Plomo', colorPrimary: '', colorSecondary: '' },
	{ key: 'green', colorName: 'Verde', colorPrimary: '', colorSecondary: '' },
];

const UpdateHelmetDialog = ({ helmetcolor, getCourses, userDocument, serviceCode }) => {
	const [open, setOpen] = useState(false);
	const [helmet, setHelmet] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [helmets, setHelmets] = useState(helmetList);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (_, reason) => {
		if (reason != 'backdropClick') {
			setOpen(false);
		}
	};

	const handleChange = (event) => {
		const helmetKey = event.target.value;
		setHelmet(helmetKey);
	};

	const sendForm = async () => {
		const data = {
			helmet: helmet,
			document: (userDocument || '').trim(),
			service_code: serviceCode,
		};
		try {
			setIsLoading(true);
			await staffService.updateHelmet(data);
			getCourses(userDocument);
			Swal.fire({
				icon: 'success',
				confirmButtonColor: '#0039a6',
				title: '¡Cambio de Color de Casco Exitoso!',
				text: 'El casco ha sido actualizado con el nuevo color seleccionado.',
			});
		} catch (error) {
			showValidationErrors(error);
		} finally {
			handleClose();
			setIsLoading(false);
		}
	};

	const handleBackdropClick = (event) => {
		// Evitar que el diálogo se cierre al hacer clic en el fondo (backdrop).
		event.stopPropagation();
	};

	useEffect(() => {
		const HelmetFiltered = helmetList.filter((item) => item?.key != helmetcolor);
		setHelmets(HelmetFiltered);
	}, [helmetcolor]);

	return (
		<div>
			<Button
				size="small"
				variant="text"
				disabled={!serviceCode}
				onClick={handleClickOpen}
			>
				<EditIcon fontSize="small" /> Cambiar color de casco
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xs'}>
				{isLoading && <LinearProgress />}
				<DialogTitle>Cambiar color de casco</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ marginBottom: 2 }}>
						Elige el color de casco
					</DialogContentText>
					<FormControl fullWidth size="small">
						<InputLabel id="HelmetSelectLabel">Color de casco</InputLabel>
						<Select
							labelId="HelmetSelectLabel"
							id="HelmetSelect"
							value={helmet}
							label="Color de casco"
							onChange={handleChange}
						>
							{helmets.map((item, index) => {
								return (
									<MenuItem value={item?.key} key={index + '-helmet'}>
										{item?.colorName}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} disabled={isLoading}>
						Cancelar
					</Button>
					<Button onClick={sendForm} disabled={isLoading}>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default UpdateHelmetDialog;
