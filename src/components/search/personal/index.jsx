import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import QRCodeReact from 'qrcode.react';
import SearchTabs from '@src/components/search/elements/SearchTabs.jsx';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import { getCourseSiscapByUser } from '@src/features/course/service/course.js';
import TrainingTable from '@src/components/search/elements/TrainingTable.jsx';
import QualificationsTable from '@src/components/search/elements/QualificationsTable.jsx';
import ProceduresTable from '@src/components/search/elements/ProceduresTable.jsx';
import HelmetSvg from '@src/components/search/elements/HelmetSvg.jsx';
import UpdateHelmetDialog from '@src/components/search/elements/UpdateHelmetDialog.jsx';
import DownloadIcon from '@mui/icons-material/Download';
import HelmetTable from '@src/components/search/elements/HelmetTable.jsx';
import UsersDownloadButton from '@src/components/search/elements/UsersDownloadButton.jsx';
import AssignMentorDialog from '@src/components/search/elements/AssignMentorDialog.jsx';
import ServicesSelect from '@src/components/search/elements/ServicesSelect.jsx';
import { listAllUser } from '@src/features/staff/service/staff.service.js';

import { showValidationErrors } from '@src/helpers/listValidation';
import { checkPermissions } from '@src/features/auth/authSelector';
import moment from 'moment';
import TabPanel from '@src/components/global/TabPanel/TabPanel.jsx';
import MentorTable from '../elements/MentorTable';
import { useNavigate } from 'react-router-dom';
import {
	Autocomplete,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Hidden,
	LinearProgress,
	Tab,
	Tabs,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/search/personal', text: 'Búsqueda de Personal' },
];

const PersonalSearch = () => {
	const hasPermissionHelmet = useSelector((state) =>
		checkPermissions(state)(
			'busquedaPersonal',
			'busquedaPersonal',
			'CambiarColorCasco'
		)
	);
	const hasPermissionMentor = useSelector((state) =>
		checkPermissions(state)('busquedaPersonal', 'busquedaPersonal', 'AsignarMentor')
	);

	const theme = useTheme();
	const navigate = useNavigate();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [selectedUser, setSelectedUser] = useState(null);
	const [valueQr, setValueQr] = useState(null);
	const [loadingUser, setLoadingUser] = useState(false);
	const [loadingCourse, setLoadingCourse] = useState(false);
	const [userSiscap, setUserSiscap] = useState(null);
	const [users, setUsers] = useState([]);

	const [trainings, setTrainings] = useState([]);
	const [qualifications, setQualifications] = useState([]);
	const [procedures, setProcedures] = useState([]);
	const [helmetHistory, setHelmetHistory] = useState([]);
	const [currentTab, setCurrentTab] = useState(0);
	const [mentors, setMentors] = useState([]);
	const [services, setServices] = useState([]);
	const [currentService, setCurrentService] = useState(null);

	const handleChangeTab = (event, newValue) => {
		setCurrentTab(newValue);
	};

	const handleAutocompleteChange = (_, value) => {
		if (value && value?.document) {
			setSelectedUser(value);
			setValueQr(window.location.origin + '/guest/personal/' + value?.document);
			getCourses(value?.document);
		}
	};

	const filterOptions = (options, state) => {
		const filteredOptions = options.filter(
			(option) =>
				option?.fullName
					?.toLowerCase()
					.includes(state.inputValue.toLowerCase()) ||
				option?.document?.toLowerCase().includes(state.inputValue.toLowerCase())
		);
		return filteredOptions;
	};

	const checkConnection = () => {
		if (!window.navigator.onLine) {
			navigate('/guest/personal/0');
			return false;
		} else {
			return true;
		}
	};

	const handleOnlineStatusChange = () => {
		navigate('/guest/personal/0');
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

	useEffect(() => {
		const hasConnection = checkConnection();
		if (hasConnection) {
			getUsers();
		}
		window.addEventListener('offline', handleOnlineStatusChange);
		return () => {
			window.removeEventListener('offline', handleOnlineStatusChange);
		};
	}, []);

	const addId = (arr) => {
		if (Array.isArray(arr)) {
			return arr.map((item, id) => {
				return { ...item, id };
			});
		}
	};

	const getUsers = async () => {
		try {
			setLoadingUser(true);
			const { personaLaborals } = await listAllUser();
			if (Array.isArray(personaLaborals)) {
				const parsed = personaLaborals.map((user, index) => {
					return {
						...user,
						fullName: `${user?.nombres} ${user?.apellidoPaterno} ${user?.apellidoMaterno}`,
						document: user?.nroDocumento,
						key: `${user?.nroDocumento}-${index}`,
					};
				});
				setUsers(parsed || []);
			}
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoadingUser(false);
		}
	};

	const getCourses = async (document) => {
		setLoadingCourse(true);
		const data = {
			Personas: [
				{
					Legajo: 0,
					NroDocumento: document,
				},
			],
		};
		try {
			const { personas } = await getCourseSiscapByUser(data);
			if (Array.isArray(personas)) {
				const user = personas.find((user) => {
					return (user?.nroDocumento || '').trim() == (document || '').trim();
				});
				console.log('user', user);
				if (user) {
					const { services, ...currentUser } = user;
					setServices(services);
					setUserSiscap(currentUser);
					if (Array.isArray(services) && services.length === 1) {
						listenServiceChange(services[0]);
					}
				} else {
					cleanTables();
				}
			} else {
				cleanTables();
			}
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoadingCourse(false);
		}
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

	const qrCodeRef = useRef(null);

	const downloadQRCode = () => {
		if (qrCodeRef.current) {
			const canvas = qrCodeRef.current.querySelector('canvas');
			const link = document.createElement('a');

			canvas.toBlob((blob) => {
				link.href = URL.createObjectURL(blob);
				link.download = 'qr-code.png';
				link.click();
			});
		}
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

	return (
		<div id="PesonalSearch">
			<SearchTabs />
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />

			<Container>
				<Box display={'flex'} justifyContent={'flex-end'} marginBottom={2}>
					<UsersDownloadButton />
				</Box>
				<Box
					sx={{
						backgroundColor: 'white.main',
						borderRadius: '10px',
						padding: '0 10px 10px 10px',
						mb: 2,
					}}
				>
					{loadingCourse && <LinearProgress />}

					<Typography
						sx={{
							textAlign: 'center',
							fontWeight: 'bold',
							marginBottom: 4,
							pt: 4,
						}}
						color="primary"
						variant="h6"
						gutterBottom
					>
						Consulta - Sistema de Capacitaciones
					</Typography>
					<Box
						sx={{
							maxWidth: '430px',
							margin: '0 auto 20px',
						}}
					>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={users}
							sx={{ width: '100%', marginBottom: 2 }}
							loading={loadingUser}
							onChange={handleAutocompleteChange}
							filterOptions={filterOptions}
							getOptionLabel={(option) => option?.fullName}
							renderOption={(props, option) => (
								<li {...props} key={option?.key}>
									{option?.fullName}
								</li>
							)}
							renderInput={(params) => (
								<div>
									<TextField
										{...params}
										label="Nombre o documento del usuario"
									/>
									{loadingUser && <LinearProgress />}
								</div>
							)}
						/>
						{Array.isArray(services) && services.length > 1 && (
							<ServicesSelect
								services={services}
								currentService={currentService}
								setCurrentService={listenServiceChange}
							/>
						)}
					</Box>
					{selectedUser && selectedUser?.nroDocumento && (
						<Box
							sx={{
								width: 'fit-content',
								border: (theme) => `1px solid ${theme.palette.divider}`,
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
										ref={qrCodeRef}
										style={{
											height: 'auto',
											margin: '0 auto',
											maxWidth: 190,
											width: '100%',
										}}
									>
										<QRCodeReact
											size={256}
											style={{
												height: 'auto',
												maxWidth: '100%',
												width: '100%',
											}}
											value={valueQr}
										/>
									</div>
									<Box
										display={'flex'}
										justifyContent={'center'}
										minHeight={'initial'}
									>
										<Button
											size="small"
											margin={'auto'}
											variant="text"
											onClick={downloadQRCode}
											startIcon={<DownloadIcon />}
										>
											Descargar QR
										</Button>
									</Box>
								</Grid>
								<Hidden mdDown>
									<Divider orientation="vertical" flexItem></Divider>
								</Hidden>
								<Grid item xs>
									<table
										style={{
											fontSize: 12,
											wordBreak: 'break-word',
										}}
									>
										<tbody>
											<tr>
												<td style={{ color: '#0039a6' }}>
													Nombre Completo:
												</td>
												<td>{selectedUser?.fullName}</td>
											</tr>
											<tr>
												<td style={{ color: '#0039a6' }}>
													Tipo de documento:
												</td>
												<td>{selectedUser?.document_type}</td>
											</tr>
											<tr>
												<td style={{ color: '#0039a6' }}>
													Documento de identidad:
												</td>
												<td>{selectedUser?.document}</td>
											</tr>
											<tr>
												<td style={{ color: '#0039a6' }}>
													Cargo:
												</td>
												<td>{userSiscap?.puesto}</td>
											</tr>
											<tr>
												<td style={{ color: '#0039a6' }}>
													Correo electrónico:
												</td>
												<td>{selectedUser?.email}</td>
											</tr>
											{currentService?.nombreServicio && (
												<tr>
													<td style={{ color: '#0039a6' }}>
														Servicio:
													</td>
													<td>
														{currentService?.nombreServicio}
													</td>
												</tr>
											)}
											{userSiscap?.fechaInicio && (
												<tr>
													<td style={{ color: '#0039a6' }}>
														Fecha de ingreso:
													</td>
													<td>{userSiscap?.fechaInicio}</td>
												</tr>
											)}
											<tr>
												<td style={{ color: '#0039a6' }}>
													Días en la organización:
												</td>
												<td>
													{printDayDiff(
														userSiscap?.fechaInicio
													)}
												</td>
											</tr>
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
									{!!hasPermissionHelmet && currentService && (
										<Box
											height="initial"
											minHeight="initial"
											display={'flex'}
											justifyContent={'flex-end'}
										>
											<UpdateHelmetDialog
												helmetcolor={
													currentService?.helmet || 'green'
												}
												user={userSiscap}
												getCourses={getCourses}
												serviceCode={
													currentService?.codigoServicio
												}
												userDocument={
													userSiscap?.nroDocumento ||
													selectedUser?.document
												}
											/>
										</Box>
									)}
									{!!hasPermissionMentor && currentService && (
										<Box
											height="initial"
											display={'flex'}
											justifyContent={'flex-end'}
										>
											<AssignMentorDialog
												getCourses={getCourses}
												serviceCode={
													currentService?.codigoServicio
												}
												userDocument={
													userSiscap?.nroDocumento ||
													selectedUser?.document
												}
											/>
										</Box>
									)}
								</Grid>
							</Grid>
						</Box>
					)}
				</Box>
				{selectedUser && selectedUser?.nroDocumento && (
					<Box
						sx={{
							backgroundColor: 'white.main',
							borderRadius: '10px',
							mb: 2,
							p: { xs: 2, sm: 2, md: 4 },
						}}
					>
						<Typography marginBottom={2}>
							Registro de cambios en el color del casco
						</Typography>
						<HelmetTable helmets={helmetHistory} />
					</Box>
				)}

				{selectedUser && selectedUser?.nroDocumento && (
					<Box
						sx={{
							backgroundColor: 'white.main',
							borderRadius: '10px',
							mb: 2,
							p: { xs: 2, sm: 2, md: 4 },
						}}
					>
						<Typography marginBottom={2}>Asignaciones de mentor</Typography>
						<MentorTable mentors={mentors} />
					</Box>
				)}

				{selectedUser && selectedUser?.nroDocumento && (
					<Box
						sx={{
							backgroundColor: 'white.main',
							borderRadius: '10px',
							mb: 2,
							p: { xs: 2, sm: 2, md: 4 },
						}}
					>
						<Tabs
							value={currentTab}
							onChange={handleChangeTab}
							orientation={isMobile ? 'vertical' : 'horizontal'}
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
							<QualificationsTable qualifications={qualifications} />
						</TabPanel>
						<TabPanel value={currentTab} index={2}>
							<ProceduresTable procedures={procedures} />
						</TabPanel>
					</Box>
				)}
			</Container>
		</div>
	);
};

export default PersonalSearch;
