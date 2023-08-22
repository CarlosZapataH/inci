import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import ProcedureTabs from '@src/components/procedure/elements/ProcedureTabs.jsx';
import UploadXlsx from '@src/components/procedure/elements/UploadXlsx.jsx';
import UploadZip from '@src/components/procedure/elements/UploadZip.jsx';
import TemplateDownloadButton from '@src/components/procedure/elements/TemplateDownloadButton.jsx';
import ProcedureDownloadButton from '@src/components/procedure/elements/ProcedureDownloadButton.jsx';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/procedure/search', text: 'Procedimientos' },
];

const excelTemplateDownloadUrl = `${process.env.REACT_APP_API}/procedure/format/download`;
const zipTemplateDownloadUrl = `${process.env.REACT_APP_API}/procedure/format/zip/download`;

const ProcedureUpload = () => {
	return (
		<div>
			<Container>
				<Box
					sx={{
						display: 'flex',
						minHeight: 'initial',
						flexWrap: 'wrap',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<CustomBreadcrumbs breadcrumbs={breadcrumbs} />
					<ProcedureDownloadButton />
				</Box>
				<Box
					sx={{
						borderRadius: '10px',
						overflow: 'hidden',
						backgroundColor: '#ffffff',
					}}
				>
					<ProcedureTabs />
					<Box p={2}>
						<Grid container spacing={2}>
							{/* <Grid item xs={12} md={6}>
								<Box
									p={2}
									border={1}
									borderRadius={2}
									borderColor={'rgba(0,0,0,.12)'}
								>
									<Typography
										variant="subtitle1"
										display={'block'}
										color={'primary'}
										mb={1}
									>
										Cargar archivo excel:
									</Typography>
									<Typography
										variant="caption"
										display={'block'}
										mb={7}
									>
										- Descarga la plantilla excel para subir los
										procedimientos <br />- Sube tu archivo con los
										procedimientos <br />
									</Typography>
									<Box display={'flex'} flexWrap={'wrap'}>
										<TemplateDownloadButton
											url={excelTemplateDownloadUrl}
											label={'Descargar Plantilla'}
											color=""
										/>
										<UploadXlsx />
									</Box>
								</Box>
							</Grid> */}
							<Grid item xs={12}>
								<Box
									p={2}
									//border={1}
									//borderRadius={2}
									//borderColor={'rgba(0,0,0,.12)'}
								>
									<Typography
										variant="subtitle1"
										display={'block'}
										color={'primary'}
										mb={1}
									>
										Cargar archivo zip:
									</Typography>
									<Typography
										variant="caption"
										display={'block'}
										mb={2}
									>
										- Sube tu archivo con los procedimientos <br />
										- El archivo debe tener un máximo de 50MB
										<br />- El archivo zip debe contener unicamente
										archivos .pdf con el siguiente formato
										codigoProcedimiento + codigoGerencia +
										codigoServicio.pdf
									</Typography>
									<Box display={'flex'} flexWrap={'wrap'}>
										<TemplateDownloadButton
											url={zipTemplateDownloadUrl}
											label={'Descargar Plantilla'}
											color=""
										/>
										<UploadZip />
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</div>
	);
};
export default ProcedureUpload;
