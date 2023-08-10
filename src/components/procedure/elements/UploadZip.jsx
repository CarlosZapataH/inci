import React, { useState, useRef } from 'react';
import { Button, Input } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import {
	showValidationErrors,
	validateFileExtension,
	validateFileSize,
} from '@src/helpers/listValidation.js';
import ImportedDocumentsDialog from '@src/components/procedure/elements/ImportedDocumentsDialog.jsx';
import * as procedureService from '@src/features/procedure/service/procedure.service.js';
import { LoadingButton } from '@mui/lab';

const UploadZip = () => {
	const [open, setOpen] = useState(false);
	const [isloading, setIsLoading] = useState(false);
	const [procedures, setProcedures] = useState([]);
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (
			selectedFile &&
			validateFileExtension({ file: selectedFile, allowedExtensions: ['.zip'] }) &&
			validateFileSize({ file: selectedFile, maxSizeMb: 50 })
		) {
			sendFile(selectedFile);
		}
		resetInputFile();
	};

	const sendFile = async (zipFile) => {
		try {
			setIsLoading(true);
			const formData = new FormData();
			const company_id = parseInt(localStorage.getItem('company_id'));
			formData.append('file', zipFile, zipFile?.name);
			formData.append('company_id', company_id);
			const response = await procedureService.createProceduresDocument(formData);
			setProcedures(response?.data || []);
			setOpen(true);
		} catch (error) {
			showValidationErrors(error);
		} finally {
			resetInputFile();
			setIsLoading(false);
		}
	};

	const handleUploadButtonClick = () => {
		fileInputRef.current.click();
	};

	const resetInputFile = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div id="UploadZip">
			<Input
				type="file"
				inputProps={{
					accept: '.zip',
				}}
				inputRef={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			{/* <Button
				color="primary"
				variant="contained"
				startIcon={<UploadIcon />}
				onClick={handleUploadButtonClick}
			>
				Subir archivo
			</Button> */}
			<LoadingButton
				loading={isloading}
				color="primary"
				variant="contained"
				startIcon={<UploadIcon />}
				onClick={handleUploadButtonClick}
			>
				Subir archivo
			</LoadingButton>
			<ImportedDocumentsDialog
				open={open}
				setOpen={setOpen}
				procedures={procedures}
			/>
		</div>
	);
};

export default UploadZip;
