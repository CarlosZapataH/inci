import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import QRCode from 'react-qr-code';
import QRCodeReact from 'qrcode.react';
import { listUsers } from '@src/features/course/courseSlice';
import SearchTabs from '@src/components/search/elements/SearchTabs.jsx';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import { getCourseSiscapByUser } from '@src/features/course/service/course.js';
import TrainingTable from '@src/components/search/elements/TrainingTable.jsx';
import QualificationsTable from '@src/components/search/elements/QualificationsTable.jsx';
import ProceduresTable from '@src/components/search/elements/ProceduresTable.jsx';
import HelmetSvg from '@src/components/search/elements/HelmetSvg.jsx';
import UpdateUserDialog from '@src/components/search/elements/UpdateUserDialog.jsx';
import DownloadIcon from '@mui/icons-material/Download';
import HelmetTable from '@src/components/search/elements/HelmetTable.jsx';
import UsersDownloadButton from '@src/components/search/elements/UsersDownloadButton.jsx';
import AssignMentorDialog from '@src/components/search/elements/AssignMentorDialog.jsx';

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
import { showValidationErrors } from '@src/helpers/listValidation';
import { checkPermissions } from '@src/features/auth/authSelector';
import moment from 'moment';
import TabPanel from '@src/components/global/TabPanel/TabPanel.jsx';
import MentorTable from '../elements/MentorTable';
import { useNavigate } from 'react-router-dom';
//import { TabContext, TabList, TabPanel } from '@mui/lab';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/search/personal', text: 'Búsqueda de Personal' },
];

const PesonalSearch = () => {
	const dispatch = useDispatch();

	const hasPermission = useSelector((state) =>
		checkPermissions(state)(
			'busquedaPersonal',
			'busquedaPersonal',
			'CambiarColorCasco'
		)
	);

	const theme = useTheme();
	const navigate = useNavigate();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const users = useSelector((state) => state.course.users);
	const courses = useSelector((state) => state.course.coursesByUser);
	const userSession = useSelector((state) => state.auth.user);
	const [selectedUser, setSelectedUser] = useState(null);
	const [valueQr, setValueQr] = useState(null);
	const [loadingUser, setLoadingUser] = useState(false);
	const [loadingCourse, setLoadingCourse] = useState(false);
	const [userSiscap, setUserSiscap] = useState(null);

	const [trainings, setTrainings] = useState([]);
	const [qualifications, setQualifications] = useState([]);
	const [procedures, setProcedures] = useState([]);
	const [helmetHistory, setHelmetHistory] = useState([]);
	const [currentTab, setCurrentTab] = useState(0);
	const [mentors, setMentors] = useState([]);

	const [filters, setFilters] = useState({
		page: 1,
		pagination: true,
		user_id: null,
		per_page: process.env.REACT_APP_PAGINATION_PER_PAGE || 10,
	});

	const handleChangeTab = (event, newValue) => {
		setCurrentTab(newValue);
	};

	const handleAutocompleteChange = (event, value) => {
		setSelectedUser(value);
		setFilters({ ...filters, user_id: value?.id || null });
		setValueQr(window.location.origin + '/guest/personal/' + value?.document);
		if (value && value?.document) {
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
			navigate('/guest/personal/' + (userSession?.document || '0'));
		}
	};

	const handleOnlineStatusChange = () => {
		navigate('/guest/personal/' + (userSession?.document || '0'));
	};

	useEffect(() => {
		checkConnection();
		getUsers();
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
		setLoadingUser(true);
		await dispatch(listUsers());
		setLoadingUser(false);
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
			const response = await getCourseSiscapByUser(data);
			if (response && response?.personas && response?.personas[0]) {
				const {
					capacitaciones,
					habilitaciones,
					procedimientos,
					helmet_history,
					coach_history,
					...currentUser
				} = response?.personas[0];
				setUserSiscap(currentUser);
				if (Array.isArray(capacitaciones)) setTrainings(addId(capacitaciones));
				if (Array.isArray(habilitaciones))
					setQualifications(addId(habilitaciones));
				if (Array.isArray(procedimientos))
					setProcedures(addId(procedimientos || []));
				if (Array.isArray(helmet_history || []))
					setHelmetHistory(addId(helmet_history));
				if (Array.isArray(coach_history)) setMentors(addId(coach_history || []));
			} else {
				setUserSiscap(null);
				setTrainings([]);
				setQualifications([]);
				setProcedures([]);
				setHelmetHistory([]);
				setMentors([]);
			}
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoadingCourse(false);
		}
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
			const startDate = moment(date, 'DD-MM-YYYY');
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
							sx={{ width: '100%' }}
							loading={loadingUser}
							onChange={handleAutocompleteChange}
							filterOptions={filterOptions}
							getOptionLabel={(option) => option?.fullName}
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
					</Box>
					{selectedUser && selectedUser?.id && (
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
											{userSiscap?.servicio && (
												<tr>
													<td style={{ color: '#0039a6' }}>
														Servicio:
													</td>
													<td>{userSiscap?.servicio}</td>
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
																userSiscap?.helmet ||
																'green'
															}
														/>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
									{!!hasPermission && (
										<Box
											height="initial"
											minHeight="initial"
											display={'flex'}
											justifyContent={'flex-end'}
										>
											<UpdateUserDialog
												helmetcolor={
													userSiscap?.helmet || 'green'
												}
												user={userSiscap}
												getCourses={getCourses}
												userDocument={
													userSiscap?.nroDocumento ||
													selectedUser?.document
												}
											/>
										</Box>
									)}
									{!!hasPermission && (
										<Box
											height="initial"
											display={'flex'}
											justifyContent={'flex-end'}
										>
											<AssignMentorDialog
												getCourses={getCourses}
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
				{selectedUser && selectedUser?.id && (
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

				{selectedUser && selectedUser?.id && (
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

				{selectedUser && selectedUser?.id && (
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

export default PesonalSearch;
