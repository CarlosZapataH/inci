import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountIcon from '@mui/icons-material/Person';
import {
	Autocomplete,
	FormControl,
	InputLabel,
	LinearProgress,
	MenuItem,
	Select,
} from '@mui/material';
import * as staffService from '@src/features/staff/service/staff.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';
import * as securityService from '@src/features/security/service/security.service.js';

const assignMentorDialog = ({ helmetcolor, user, getCourses, userDocument }) => {
	const [open, setOpen] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingUsers, setIsLoadingUsers] = useState(false);
	const [users, setUsers] = useState([]);
	const [selectedMentor, setSelectedMentor] = useState(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (__, newValue) => {
		setSelectedMentor(newValue);
	};

	const sendForm = async () => {
		const data = {
			coach_id: selectedMentor?.id,
			document: userDocument,
		};
		try {
			setIsLoading(true);
			await staffService.assignMentor(data);
			getCourses(userDocument);
		} catch (error) {
			showValidationErrors(error);
		} finally {
			handleClose();
			setIsLoading(false);
		}
	};

	const getUsers = async (filters) => {
		try {
			setIsLoadingUsers(true);
			const response = await securityService.searchUsers(filters);
			setUsers(response?.data);
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
			<Button size="small" variant="text" onClick={handleClickOpen}>
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
						renderInput={(params) => <TextField {...params} label="Mentor" />}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={sendForm}>Guardar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default assignMentorDialog;
