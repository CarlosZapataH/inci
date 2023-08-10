import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImportedProceduresTable from '@src/components/procedure/elements/ImportedProceduresTable.jsx';
import { createProcedures } from '@src/features/procedure/procedureSlice.js';
import { useState } from 'react';
import { LinearProgress } from '@mui/material';

const ImportedProceduresDialog = ({ open, setOpen, procedures, setProcedures }) => {
	const dispatch = useDispatch();
	const [isLoadingSave, setIsLoadingSave] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const updateProcedureStatus = (proceduresApi) => {
		setProcedures(proceduresApi);
	};

	const sendProcedures = async () => {
		const data = {
			company_id: parseInt(localStorage.getItem('company_id')),
			procedures: procedures,
		};
		setIsLoadingSave(true);
		const response = await dispatch(createProcedures(data));
		const { payload = {}, meta = {} } = response;
		if (meta?.requestStatus === 'fulfilled') {
			updateProcedureStatus(payload?.data || []);
		} else if (meta?.requestStatus === 'rejected') {
			console.log(response);
		}
		setIsLoadingSave(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{isLoadingSave && <LinearProgress />}
			<DialogTitle id="alert-dialog-title">Procedimientos</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description"></DialogContentText>
				<div style={{ width: '100%' }}>
					<ImportedProceduresTable procedures={procedures} />
				</div>
			</DialogContent>
			<DialogActions sx={{ padding: '24px' }}>
				<Button variant="outlined" onClick={handleClose} disabled={isLoadingSave}>
					Cerrar
				</Button>
				<Button
					variant="contained"
					onClick={sendProcedures}
					disabled={isLoadingSave}
					autoFocus
				>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

ImportedProceduresDialog.propTypes = {
	procedures: PropTypes.array,
	open: PropTypes.bool,
	setOpen: PropTypes.func,
};

export default ImportedProceduresDialog;
