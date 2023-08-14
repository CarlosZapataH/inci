import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const TemplateDownloadButton = ({ url, label }) => {
	const handleDownloadClick = async () => {
		try {
			const response = await axios.get(url, {
				responseType: 'arraybuffer',
			});

			const pdfData = response.data;
			const blob = new Blob([pdfData], { type: 'application/pdf' });
			const filename = extractFilenameFromUrl(url);
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.target = '_blank';
			link.download = filename;
			link.click();
			URL.revokeObjectURL(link.href);
		} catch (error) {
			console.error('Error al descargar el PDF', error);
		}
	};

	const extractFilenameFromUrl = (url) => {
		const parts = url.split('/');
		return parts[parts.length - 1];
	};

	return (
		<Button
			color="info"
			variant="contained"
			startIcon={<DownloadIcon />}
			onClick={handleDownloadClick}
		>
			{label}
		</Button>
	);
};
export default TemplateDownloadButton;
