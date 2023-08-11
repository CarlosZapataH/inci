import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import * as procedureService from '@src/features/procedure/service/procedure.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/procedure/search', text: 'Procedimientos' },
	{ value: null, text: 'Detalle' },
];

const ProcedureSearch = () => {
	const dispatch = useDispatch();
	const { procedureId } = useParams();
	const charges = useSelector((state) => state.security.charges);
	const [isLoading, setIsLoading] = useState(false);
	const [procedure, setProcedure] = useState({});

	useEffect(() => {
		getProcedureById(procedureId);
	}, []);

	const getProcedureById = async (procedureId) => {
		try {
			setIsLoading(true);
			const response = await procedureService.getProcedure({ procedureId });
			setProcedure(response?.data || []);
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

	const getPdfUrl = (procedure) => {
		if (Array.isArray(procedure?.assigns)) {
			const url = procedure?.assigns[0]?.file || null;
			return url || '';
		}
	};

	const formatDate = (date) => {
		moment.locale('es');
		return moment(date).format('LLL');
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
					}}
				>
					{isLoading && <LinearProgress />}
					<Box sx={{ bgcolor: 'primary.main', px: 2, py: 1 }}>
						<Typography variant="body1" color="#ffffff">
							Detalle del procedimiento
						</Typography>
					</Box>
					<Box p={2} fontSize={14}>
						<table>
							<tbody>
								<tr>
									<th>Procedimiento: </th>
									<td>{procedure?.name}</td>
								</tr>
								<tr>
									<th>Registrado por: </th>
									<td>{procedure?.user?.fullName}</td>
								</tr>
								<tr>
									<th>Fecha creación: </th>
									<td>{procedure?.created_at}</td>
								</tr>
								<tr>
									<th>Cargo: </th>
									<td>{printItems(procedure, 'charges')}</td>
								</tr>
								<tr>
									<th>Servicio: </th>
									<td>{printItems(procedure, 'services')}</td>
								</tr>
								<tr>
									<th>Fecha asociación PDF: </th>
									<td>{printDate(procedure)}</td>
								</tr>
							</tbody>
						</table>
					</Box>
				</Box>
			</Container>
		</div>
	);
};
export default ProcedureSearch;
