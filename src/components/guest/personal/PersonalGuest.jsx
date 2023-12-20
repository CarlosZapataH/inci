import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import moment from 'moment';

import * as serviceUsers from '@src/features/staff/service/staff.service.js';
import QualificationsTable from '@src/components/search/elements/QualificationsTable.jsx';
import OfflineUsersSelect from '@src/components/search/elements/OfflineUsersSelect.jsx';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import ProceduresTable from '@src/components/search/elements/ProceduresTable.jsx';
import TrainingTable from '@src/components/search/elements/TrainingTable.jsx';
import ServicesSelect from '@src/components/search/elements/ServicesSelect';
import HelmetSvg from '@src/components/search/elements/HelmetSvg.jsx';
import MentorTable from '@src/components/search/elements/MentorTable';
import HelmetTable from '@src/components/search/elements/HelmetTable';
import OfflineBar from '@src/components/global/OfflineBar/OfflineBar';
import TabPanel from '@src/components/global/TabPanel/TabPanel';

import { useSnackbar } from '@src/components/global/SnackbarHelper/SnackbarHelper.js';
import { getCourseSiscapByUser } from '@src/features/course/service/course';
import { showValidationErrors } from '@src/helpers/listValidation';
import { useParams } from 'react-router-dom';
import {
	Box,
	Container,
	Divider,
	Grid,
	Hidden,
	LinearProgress,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';

const breadcrumbs = [
	{ value: '/login', text: 'Inicio' },
	{ value: '', text: 'Personal' },
];

const PesonalSearch = () => {
	const theme = useTheme();
	const { userDocument } = useParams();
	const { showSnackbar, SnackbarComponent } = useSnackbar();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [valueQr, setValueQr] = useState(null);
	const [userSiscap, setUserSiscap] = useState(null);
	const [loadingCourse, setLoadingCourse] = useState(false);

	const [users, setUsers] = useState([]);
	const [mentors, setMentors] = useState([]);
	const [trainings, setTrainings] = useState([]);
	const [procedures, setProcedures] = useState([]);
	const [helmetHistory, setHelmetHistory] = useState([]);
	const [qualifications, setQualifications] = useState([]);

	const [currentTab, setCurrentTab] = useState(0);
	const [services, setServices] = useState([]);
	const [currentService, setCurrentService] = useState(null);
	const [online, setOnline] = useState(navigator ? navigator.onLine : true);

	function goOnline() {
		setOnline(true);
	}

	function goOffline() {
		setOnline(false);
		getUsers();
	}

	useEffect(() => {
		if (window) {
			window.addEventListener('online', goOnline);
			window.addEventListener('offline', goOffline);
		}

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

	const handleChangeTab = (event, newValue) => {
		setCurrentTab(newValue);
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
			filterUserDetails(response?.personas || null);
		} catch (error) {
			getUsers();
		} finally {
			setLoadingCourse(false);
		}
	};

	const getUsers = async () => {
		try {
			if (await verifycache()) {
				const response = await serviceUsers.listUsers();
				setUsers(response?.personas || []);
				filterUserDetails(response?.personas || null);
			}
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoadingCourse(false);
		}
	};

	const filterUserDetails = async (personas) => {
		if (Array.isArray(personas) && userDocument && userDocument != 0) {
			const user = personas.find((personal) => {
				return (
					(personal?.nroDocumento || '').trim() == (userDocument || '').trim()
				);
			});
			cleanTables();
			if (user) {
				const { services, ...currentUser } = user;
				setServices(services);
				setUserSiscap(currentUser);
				setValueQr(window.location.href);
				if (Array.isArray(services) && services.length === 1) {
					listenServiceChange(services[0]);
				}
			} else {
				cleanTables();
				showSnackbar('Usuario no encontrado', 'warning');
			}
		} else {
			cleanTables();
		}
	};

	const listenServiceChange = (value) => {
		setCurrentService(value);

		const {
			capacitaciones,
			habilitaciones,
			procedimientos,
			helmet_history,
			coach_history,
		} = value;

		setTrainings(Array.isArray(capacitaciones) ? addId(capacitaciones) : []);
		setProcedures(Array.isArray(procedimientos) ? addId(procedimientos) : []);
		setQualifications(Array.isArray(habilitaciones) ? addId(habilitaciones) : []);
		setHelmetHistory(Array.isArray(helmet_history) ? addId(helmet_history) : []);
		setMentors(Array.isArray(coach_history) ? addId(coach_history) : []);
	};

	const cleanTables = () => {
		setUserSiscap(null);
		setTrainings([]);
		setProcedures([]);
		setQualifications([]);
		setHelmetHistory([]);
		setMentors([]);
		setServices([]);
		setCurrentService(null);
	};

	const printEntryDate = (date) => {
		if (date) {
			try {
				moment.locale('es');
				const length = (date || '').length;
				const formatDate = length > 10 ? 'M/D/YYYY h:mm:ss A' : 'DD-MM-YYYY';
				return moment(date, formatDate).format('L');
			} catch (error) {
				return date || '';
			}
		}
		return date || '';
	};

	const printDayDiff = (date) => {
		if (date) {
			moment.locale('es');
			const length = (date || '').length;
			const formatDate = length > 10 ? 'M/D/YYYY h:mm:ss A' : 'DD-MM-YYYY';
			const startDate = moment(date, formatDate);
			const currentDate = moment();
			return currentDate.diff(startDate, 'days');
		}
		return 0;
	};

	const verifycache = async () => {
		try {
			const cacheName = 'siscap-users-cache';
			const cacheNames = await caches.keys();
			return [...cacheNames].includes(cacheName);
		} catch (error) {
			return false;
		}
	};

	useEffect(() => {
		verifyConnection();
	}, [location.pathname]);

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
			<OfflineBar online={online} />
			{loadingCourse && <LinearProgress />}
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />

			<Container>
				<Box
					sx={{
						minHeight: '100%',
						paddingBottom: 1,
					}}
				>
					{!online && <OfflineUsersSelect users={users} getUsers={getUsers} />}
					{userSiscap && userSiscap?.nroDocumento && (
						<div>
							{Array.isArray(services) && services.length > 1 && (
								<Box
									sx={{
										maxWidth: '430px',
										margin: '0 auto 20px',
									}}
								>
									<ServicesSelect
										services={services}
										currentService={currentService}
										setCurrentService={listenServiceChange}
									/>
								</Box>
							)}

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
										<Box
											sx={{
												height: 'auto',
												maxWidth: 190,
												width: '100%',
												margin: {
													xs: '0 auto 10px',
													md: '0 auto',
												},
											}}
										>
											<QRCode
												size={256}
												style={{
													height: 'auto',
													maxWidth: '100%',
													width: '100%',
												}}
												value={valueQr || ''}
												viewBox={`0 0 256 256`}
											/>
										</Box>
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
														Legajo:
													</td>
													<td>{userSiscap?.legajo}</td>
												</tr>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Cargo:
													</td>
													<td>
														{userSiscap?.nombrePuesto ||
															userSiscap?.puesto}
													</td>
												</tr>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Servicio:
													</td>
													<td>
														{currentService?.nombreServicio}
													</td>
												</tr>
												{currentService?.fechaIniServicioActual && (
													<tr>
														<td style={{ color: '#0039a6' }}>
															Fecha de ingreso:
														</td>
														<td>
															{printEntryDate(
																currentService?.fechaIniServicioActual
															)}
														</td>
													</tr>
												)}
												{currentService?.diasServicio && (
													<tr>
														<td style={{ color: '#0039a6' }}>
															Días en la organización:
														</td>
														<td>
															{currentService?.diasServicio}
														</td>
													</tr>
												)}
												<tr>
													<td style={{ color: '#0039a6' }}>
														Color de casco:
													</td>
													<td>
														<div>
															<HelmetSvg
																fillColor={
																	currentService?.helmet ||
																	'green'
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
									<Typography>Asignaciones de mentores</Typography>
									<MentorTable mentors={mentors} />
								</Grid>
								<Grid xs={12} item>
									{userSiscap && userSiscap?.nroDocumento && (
										<Box
											sx={{
												backgroundColor: 'white.main',
												borderRadius: '10px',
												mb: 2,
											}}
										>
											<Tabs
												value={currentTab}
												onChange={handleChangeTab}
												orientation={
													isMobile ? 'vertical' : 'horizontal'
												}
											>
												<Tab
													label="Capacitaciones"
													sx={{
														borderBottom: isMobile ? 1 : 0,
														borderColor: 'divider',
													}}
												/>
												<Tab
													label="Habilitaciones"
													sx={{
														borderBottom: isMobile ? 1 : 0,
														borderColor: 'divider',
													}}
												/>
												<Tab label="Procedimientos" />
											</Tabs>

											<TabPanel value={currentTab} index={0}>
												<TrainingTable trainings={trainings} />
											</TabPanel>
											<TabPanel value={currentTab} index={1}>
												<QualificationsTable
													qualifications={qualifications}
												/>
											</TabPanel>
											<TabPanel value={currentTab} index={2}>
												<ProceduresTable
													procedures={procedures}
												/>
											</TabPanel>
										</Box>
									)}
								</Grid>
							</Grid>
						</div>
					)}
				</Box>
			</Container>
			{SnackbarComponent}
		</div>
	);
};

export default PesonalSearch;
