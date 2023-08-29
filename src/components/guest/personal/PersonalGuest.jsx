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
import HelmetTable from '@src/components/search/elements/HelmetTable';
import { getCourseSiscapByUser } from '@src/features/course/service/course';

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
	const [helmetHistory, setHelmetHistory] = useState([]);

	const [online, setOnline] = useState(navigator ? navigator.onLine : true);

	function goOnline() {
		setOnline(true);
	}

	function goOffline() {
		setOnline(false);
	}

	useEffect(() => {
		if (window) {
			window.addEventListener('online', goOnline);
			window.addEventListener('offline', goOffline);
		}
		verifyConnection();
		return () => {
			if (window) {
				window.removeEventListener('online', goOnline);
				window.removeEventListener('offline', goOffline);
			}
		};
	}, []);

	const verifyConnection = () => {
		if (online) {
			getUser();
		} else {
			getUsers();
		}
	};

	const addId = (arr) => {
		if (Array.isArray(arr)) {
			return arr.map((item, id) => {
				return { ...item, id };
			});
		}
	};

	const getUser = async () => {
		try {
			setLoadingCourse(true);
			const data = {
				Personas: [
					{
						Legajo: 0,
						NroDocumento: userDocument,
					},
				],
			};
			const response = await getCourseSiscapByUser(data);
			getCourses(response?.personas || null);
		} catch (error) {
			getUsers();
		} finally {
			setLoadingCourse(false);
		}
	};

	const getUsers = async () => {
		try {
			const userDocument = localStorage.getItem('userDocument');
			const response = await serviceUsers.listUsers({ documento: userDocument });
			getCourses(response?.personas || null);
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoadingCourse(false);
		}
	};

	const getCourses = async (personas) => {
		if (Array.isArray(personas) && userDocument) {
			const found = personas.find(
				(personal) => personal?.nroDocumento == userDocument
			);
			if (found) {
				setValueQr(window.location.href);
				const {
					capacitaciones,
					habilitaciones,
					procedimientos,
					helmet_history,
					...currentUser
				} = found;
				if (Array.isArray(capacitaciones))
					setTrainings(addId(capacitaciones || []));
				if (Array.isArray(habilitaciones))
					setQualifications(addId(habilitaciones || []));
				if (Array.isArray(procedimientos))
					setProcedures(addId(procedimientos || []));
				if (Array.isArray(helmet_history))
					setHelmetHistory(addId(helmet_history || []));
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
												{/* <tr>
													<td style={{ color: '#0039a6' }}>
														Días en la organización:
													</td>
													<td>
														{userSiscap?.days_in_organization ||
															0}
													</td>
												</tr> */}
												<tr>
													<td style={{ color: '#0039a6' }}>
														Color de casco:
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
									<Typography>
										Registro de cambios en el color del casco
									</Typography>
									<HelmetTable helmets={helmetHistory} />
								</Grid>
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
