import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImportedDocumentsTable from '@src/components/procedure/elements/ImportedDocumentsTable.jsx';

const ImportedDocumentsDialog = ({ open, setOpen, procedures }) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Procedimientos</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description"></DialogContentText>
				<div style={{ width: '100%' }}>
					<ImportedDocumentsTable procedures={procedures} />
				</div>
			</DialogContent>
			<DialogActions sx={{ padding: '24px' }}>
				<Button variant="contained" onClick={handleClose}>
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

ImportedDocumentsDialog.propTypes = {
	procedures: PropTypes.array,
	open: PropTypes.bool,
	setOpen: PropTypes.func,
};

export default ImportedDocumentsDialog;
