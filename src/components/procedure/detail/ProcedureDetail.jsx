import React, { useEffect, useState } from 'react';
import { Box, Button, Container, LinearProgress, Typography } from '@mui/material';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import * as procedureService from '@src/features/procedure/service/procedure.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import PdfPreview from '@src/components/procedure/elements/PdfPreview.jsx';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/procedure/search', text: 'Procedimientos' },
	{ value: null, text: 'Detalle' },
];

const ProcedureDetail = () => {
	const { procedureId } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [procedure, setProcedure] = useState({});
	const [pdfData, setPdfData] = useState(null);

	useEffect(() => {
		getProcedureById(procedureId);
	}, []);

	const getProcedureById = async (procedureId) => {
		try {
			setIsLoading(true);
			const response = await procedureService.getProcedureSiscap({
				code: procedureId,
			});
			setProcedure(response?.procedimiento || {});
			loadPdfUrl(response?.data || {});
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setIsLoading(false);
		}
	};

	const printItems = (procedure, property = '') => {
		let ìtems = [];
		const assigns = Array.isArray(procedure?.assigns) ? procedure?.assigns : [];
		assigns.forEach((assign) => {
			if (property === 'services') {
				ìtems.push(assign?.costCenter?.name);
			} else if (property === 'charges') {
				ìtems.push(assign?.charge?.name);
			}
		});
		return ìtems.join(', ');
	};

	const printDate = (procedure) => {
		if (Array.isArray(procedure?.assigns)) {
			const date = procedure?.assigns[0]?.last_upload_file || null;
			return date ? formatDate(date) : '';
		}
	};

	const loadPdfUrl = (procedure) => {
		if (Array.isArray(procedure?.assigns)) {
			const url = procedure?.assigns[0]?.file || null;
			if (url) setPdfData(url);
		}
	};

	const formatDate = (date) => {
		if (date) {
			moment.locale('es');
			return moment(date).format('LLL');
		}
	};

	return (
		<div>
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />
			<Container>
				<Box
					sx={{
						borderRadius: '10px',
						overflow: 'hidden',
						backgroundColor: '#ffffff',
						mb: 2,
					}}
				>
					{isLoading && <LinearProgress />}
					<Box sx={{ bgcolor: 'primary.main', px: 2, py: 1 }}>
						<Typography variant="body1" color="#ffffff">
							Detalle del procedimiento
						</Typography>
					</Box>
					<Box p={2} fontSize={14}>
						<table className="th-left">
							<tbody>
								<tr>
									<th>Código de Procedimiento: </th>
									<td>{procedure?.codigoProcedimiento}</td>
								</tr>
								<tr>
									<th>Procedimiento: </th>
									<td>{procedure?.nombreProcedimiento}</td>
								</tr>
								<tr>
									<th>Registrado por: </th>
									<td>{procedure?.user?.fullName}</td>
								</tr>
								<tr>
									<th>Fecha creación: </th>
									<td>{formatDate(procedure?.created_at)}</td>
								</tr>
								<tr>
									<th>Cargo: </th>
									<td>{printItems(procedure, 'charges')}</td>
								</tr>
								<tr>
									<th>Gerencia: </th>
									<td>{procedure?.nombreGerencia}</td>
								</tr>
								<tr>
									<th>Servicio: </th>
									<td>{procedure?.nombreServicio}</td>
								</tr>
								<tr>
									<th>Fecha asociación PDF: </th>
									<td>{printDate(procedure)}</td>
								</tr>
							</tbody>
						</table>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						mb: 2,
					}}
				></Box>
				<Box
					sx={{
						borderRadius: '10px',
						overflow: 'hidden',
						mb: 1,
					}}
				>
					<PdfPreview urlPdf={pdfData} />
				</Box>
			</Container>
		</div>
	);
};
export default ProcedureDetail;
