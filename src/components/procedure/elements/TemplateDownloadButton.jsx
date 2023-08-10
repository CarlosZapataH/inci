import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const TemplateDownloadButton = ({ url, label }) => {
	return (
		<Button
			sx={{
				m: { xs: '0 14px 14px 0', md: '0 14px 0 0' },
			}}
			color="info"
			variant="contained"
			href={url}
			startIcon={<DownloadIcon />}
			download
		>
			{label}
		</Button>
	);
};
export default TemplateDownloadButton;
