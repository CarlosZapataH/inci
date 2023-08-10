import React, { useState, useRef } from 'react';
import readXlsxFile from 'read-excel-file';
import { Button, Input } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import ImportedProceduresDialog from '@src/components/procedure/elements/ImportedProceduresDialog.jsx';
import { validateFileExtension } from '@src/helpers/listValidation';

const FileUpload = () => {
	const [open, setOpen] = useState(false);
	const [procedures, setProcedures] = useState([]);
	const fileInputRef = useRef(null); // Referencia al campo de carga de archivos

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (
			selectedFile &&
			validateFileExtension({ file: selectedFile, allowedExtensions: ['.xlsx'] })
		) {
			readFile(selectedFile);
		}
	};

	const isDuplicateProcedure = (items = [], procedure) => {
		if (Array.isArray(items) && procedure) {
			return items.some((item) => item?.procedure == procedure);
		}
		return false;
	};

	const readFile = async (xlsxfile) => {
		try {
			let procedures = [];
			const rows = await readXlsxFile(xlsxfile);
			if (Array.isArray(rows)) {
				rows.forEach((row, index) => {
					if (index > 0 && row[0] && row[1] && row[2]) {
						procedures.push({
							charge: row[0],
							service: row[1],
							procedure: row[2],
							status: !isDuplicateProcedure(procedures, row[2]),
						});
					}
				});
				if (procedures?.length > 0) {
					setProcedures(procedures);
					setOpen(true);
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			resetInputFile();
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
		<div id="UploadXlsx">
			<Input
				type="file"
				inputRef={fileInputRef}
				style={{ display: 'none' }} // Ocultamos el campo de carga de archivos
				onChange={handleFileChange}
				inputProps={{
					accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
				}}
			/>
			<Button
				color="primary"
				variant="contained"
				startIcon={<UploadIcon />}
				onClick={handleUploadButtonClick}
			>
				Subir archivo
			</Button>
			<ImportedProceduresDialog
				open={open}
				setOpen={setOpen}
				procedures={procedures}
				setProcedures={setProcedures}
			/>
		</div>
	);
};

export default FileUpload;
