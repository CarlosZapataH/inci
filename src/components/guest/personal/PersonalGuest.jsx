import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import TrainingTable from '@src/components/search/elements/TrainingTable.jsx';
import QualificationsTable from '@src/components/search/elements/QualificationsTable.jsx';
import ProceduresTable from '@src/components/search/elements/ProceduresTable.jsx';
import HelmetSvg from '@src/components/search/elements/HelmetSvg.jsx';
import * as serviceUsers from '@src/features/staff/service/staff.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';
import { useParams } from 'react-router-dom';

import {
	Box,
	Container,
	Divider,
	Grid,
	Hidden,
	LinearProgress,
	Typography,
} from '@mui/material';

const breadcrumbs = [
	{ value: '/login', text: 'Inicio' },
	{ value: '', text: 'Personal' },
];

const PesonalSearch = () => {
	const { userDocument } = useParams();
	const [valueQr, setValueQr] = useState(null);
	const [loadingCourse, setLoadingCourse] = useState(false);
	const [userSiscap, setUserSiscap] = useState(null);
	const [trainings, setTrainings] = useState([]);
	const [qualifications, setQualifications] = useState([]);
	const [procedures, setProcedures] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			setLoadingCourse(true);
			const response = await serviceUsers.listUsers();
			const personas = response?.personas || null;
			getCourses(personas);
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoadingCourse(false);
		}
	};

	const addId = (arr) => {
		if (Array.isArray(arr)) {
			return arr.map((item, id) => {
				return { ...item, id };
			});
		}
	};

	const getCourses = async (personas) => {
		if (Array.isArray(personas) && userDocument) {
			const found = personas.find(
				(personal) => personal?.nroDocumento == userDocument
			);
			if (found) {
				setValueQr(window.location.href);
				const { capacitaciones, habilitaciones, procedimientos, ...currentUser } =
					found;
				if (Array.isArray(capacitaciones))
					setTrainings(addId(capacitaciones || []));
				if (Array.isArray(habilitaciones))
					setQualifications(addId(habilitaciones || []));
				if (Array.isArray(procedimientos))
					setProcedures(addId(procedimientos || []));
				setUserSiscap(currentUser);
			}
		}
	};

	return (
		<div id="PesonalSearch">
			<Box bgcolor={'primary.main'} paddingY={2}>
				<Container>
					<Typography
						sx={{
							textAlign: 'center',
							fontWeight: 'bold',
						}}
						color="white"
						variant="h6"
					>
						Consulta - Sistema de Capacitaciones
					</Typography>
				</Container>
			</Box>
			{loadingCourse && <LinearProgress />}
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />

			<Container>
				<Box
					sx={{
						minHeight: '100%',
						paddingBottom: 1,
					}}
				>
					{userSiscap && userSiscap?.nroDocumento && (
						<div>
							<Box
								sx={{
									width: 'fit-content',
									border: (theme) =>
										`1px solid ${theme.palette.divider}`,
									borderRadius: 1,
									bgcolor: 'background.paper',
									color: 'text.secondary',
									padding: '24px',
									margin: '0 auto 24px',
									'& hr': {
										mx: '20px',
									},
								}}
							>
								<Grid container>
									<Grid item xs={12} md={'auto'}>
										<div
											style={{
												height: 'auto',
												margin: '0 auto',
												maxWidth: 190,
												width: '100%',
											}}
										>
											<QRCode
												size={256}
												style={{
													height: 'auto',
													maxWidth: '100%',
													width: '100%',
												}}
												value={valueQr}
												viewBox={`0 0 256 256`}
											/>
										</div>
									</Grid>
									<Hidden mdDown>
										<Divider
											orientation="vertical"
											flexItem
										></Divider>
									</Hidden>
									<Grid item xs>
										<table style={{ fontSize: 12 }}>
											<tbody>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Nombre Completo:
													</td>
													<td>
														{userSiscap?.apellidosNombres}
													</td>
												</tr>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Documento de identidad:
													</td>
													<td>{userSiscap?.nroDocumento}</td>
												</tr>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Cargo:
													</td>
													<td>{userSiscap?.puesto}</td>
												</tr>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Servicio:
													</td>
													<td>{userSiscap?.servicio}</td>
												</tr>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Días en la organización:
													</td>
													<td>
														{userSiscap?.days_in_organization ||
															0}
													</td>
												</tr>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Casco:
													</td>
													<td>
														<div>
															<HelmetSvg
																fillColor={
																	userSiscap?.helmet
																}
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</Grid>
								</Grid>
							</Box>
							<Grid spacing={4} container>
								<Grid xs={12} item>
									<Typography gutterBottom>Capacitaciones</Typography>
									<TrainingTable trainings={trainings} />
								</Grid>
								<Grid xs={12} item>
									<Typography gutterBottom>Habilitaciones</Typography>
									<QualificationsTable
										qualifications={qualifications}
									/>
								</Grid>
								<Grid xs={12} item>
									<Typography gutterBottom>Procedimientos</Typography>
									<ProceduresTable procedures={procedures} />
								</Grid>
							</Grid>
						</div>
					)}
					{!loadingCourse && !userSiscap?.nroDocumento && (
						<div>Usuario no encontrado</div>
					)}
				</Box>
			</Container>
		</div>
	);
};

export default PesonalSearch;
