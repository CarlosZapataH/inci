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

const helmetList = [
	{ key: 'blue', colorName: 'Azul', colorPrimary: '', colorSecondary: '' },
	{ key: 'yellow', colorName: 'Amarillo', colorPrimary: '', colorSecondary: '' },
	{ key: 'orange', colorName: 'Anaranjado', colorPrimary: '', colorSecondary: '' },
	{ key: 'white', colorName: 'Blanco', colorPrimary: '', colorSecondary: '' },
	{ key: 'gray', colorName: 'Plomo', colorPrimary: '', colorSecondary: '' },
	{ key: 'green', colorName: 'Verde', colorPrimary: '', colorSecondary: '' },
];

const UpdateUserDialog = ({ helmetcolor, user, getCourses, userDocument }) => {
	const [open, setOpen] = useState(false);
	const [helmet, setHelmet] = useState(helmetcolor || '');
	const [isLoading, setIsLoading] = useState(false);
	const [helmets, setHelmets] = useState(helmetList);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		const helmetKey = event.target.value;
		setHelmet(helmetKey);
	};

	const sendForm = async () => {
		const data = {
			helmet: helmet,
			document: userDocument,
		};
		try {
			setIsLoading(true);
			await staffService.updateHelmet(data);
			getCourses(userDocument);			
		} catch (error) {
			showValidationErrors(error);
		} finally {
			handleClose();
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const HelmetFiltered = helmetList.filter((item) => item?.key != helmetcolor);
		setHelmets(HelmetFiltered);
	}, [helmetcolor]);

	return (
		<div>
			<Button size="small" variant="text" onClick={handleClickOpen}>
				<EditIcon fontSize="small" /> Cambiar color de casco
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xs'}>
				{isLoading && <LinearProgress />}
				<DialogTitle>Editar Usuario</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ marginBottom: 2 }}>
						Elige el color de tu casco
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
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={sendForm}>Guardar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default UpdateUserDialog;
