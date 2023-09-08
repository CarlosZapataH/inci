import React, { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { LoadingButton } from '@mui/lab';
import * as staffService from '@src/features/staff/service/staff.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';

const UserDownloadButton = () => {
	const [isLoading, setIsLoading] = useState(false);
	const handleButtonClick = () => {
		getProceduresBase64();
	};

	function downloadBase64File(base64Data) {
		const a = document.createElement('a');
		a.href = 'data:' + base64Data;
		a.download = 'Usuarios.xlsx';
		a.click();
	}

	const getProceduresBase64 = async () => {
		try {
			setIsLoading(true);
			const response = await staffService.getUsersFile();
			downloadBase64File(response?.data);
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<LoadingButton
				loading={isLoading}
				color="info"
				variant="contained"
				startIcon={<DownloadIcon />}
				onClick={handleButtonClick}
				size="small"
				sx={{ textTransform: 'initial' }}
			>
				Usuarios (xlsx)
			</LoadingButton>
		</div>
	);
};
export default UserDownloadButton;
