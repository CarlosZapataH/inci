import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountIcon from '@mui/icons-material/Person';
import { Autocomplete, LinearProgress } from '@mui/material';
import * as staffService from '@src/features/staff/service/staff.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';
import * as securityService from '@src/features/security/service/security.service.js';
import Swal from 'sweetalert2';

const assignMentorDialog = ({ getCourses, userDocument, serviceCode }) => {
	const [open, setOpen] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingUsers, setIsLoadingUsers] = useState(false);
	const [users, setUsers] = useState([]);
	const [selectedMentor, setSelectedMentor] = useState(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (__, reason) => {
		if (reason != 'backdropClick') {
			setOpen(false);
		}
	};

	const handleChange = (__, newValue) => {
		setSelectedMentor(newValue);
	};

	const sendForm = async () => {
		const data = {
			coach_id: selectedMentor?.id,
			document: (userDocument || '').trim(),
			service_code: serviceCode,
		};
		try {
			setIsLoading(true);
			await staffService.assignMentor(data);
			getCourses(userDocument);
			Swal.fire({
				icon: 'success',
				confirmButtonColor: '#0039a6',
				title: 'Asignación de Mentor Exitosa',
				text: 'La asignación de mentor se ha realizado con éxito.',
			});
		} catch (error) {
			showValidationErrors(error);
		} finally {
			handleClose();
			setIsLoading(false);
		}
	};

	const parseUsers = (users) => {
		if (Array.isArray(users)) {
			let result = users.map((user, index) => {
				const newKey = `${user?.document}-${index}`;
				return { ...user, newKey };
			});

			result = result.filter(item => item.document != userDocument);

			return result;
		}
		return users;
	};

	const getUsers = async (filters) => {
		try {
			setIsLoadingUsers(true);
			const response = await securityService.searchUsers(filters);
			const listUsers = response?.data || [];
			setUsers(parseUsers(listUsers));
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setIsLoadingUsers(true);
		}
	};

	useEffect(() => {
		if (open) {
			getUsers();
		}
	}, [open]);

	return (
		<div>
			<Button
				size="small"
				variant="text"
				onClick={handleClickOpen}
				disabled={!serviceCode}
			>
				<AccountIcon fontSize="small" /> Asignar Mentor
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xs'}>
				{isLoading && <LinearProgress />}
				<DialogTitle>Asignación de Mentor</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ marginBottom: 2 }}>
						Elige el usuario mentor
					</DialogContentText>
					<Autocomplete
						id="combo-mentor"
						options={users}
						getOptionLabel={(user) => user.fullName}
						onChange={handleChange}
						loading={isLoadingUsers}
						renderOption={(props, option) => (
							<li {...props} key={option?.newKey}>
								{`${option?.fullName} - ${option?.document}`}
							</li>
						)}
						renderInput={(params) => <TextField {...params} label="Mentor" />}
					/>
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
export default assignMentorDialog;
