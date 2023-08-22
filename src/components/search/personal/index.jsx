import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { listUsers, listCoursesByUser } from '@src/features/course/courseSlice';
import SearchTabs from '@src/components/search/elements/SearchTabs.jsx';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import ResultPersonalTable from '@src/components/search/elements/ResultPersonalTable.jsx';
import { getCourseSiscapByUser } from '@src/features/course/service/course.js';

import TrainingTable from '@src/components/search/elements/TrainingTable.jsx';
import QualificationsTable from '@src/components/search/elements/QualificationsTable.jsx';
import ProceduresTable from '@src/components/search/elements/ProceduresTable.jsx';
import HelmetSvg from '@src/components/search/elements/HelmetSvg.jsx';
import UpdateUserDialog from '@src/components/search/elements/UpdateUserDialog.jsx';

import {
	Autocomplete,
	Box,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Hidden,
	LinearProgress,
	TextField,
	Typography,
} from '@mui/material';
import { showValidationErrors } from '@src/helpers/listValidation';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/search/personal', text: 'Búsqueda Personal' },
];

const PesonalSearch = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.course.users);
	const courses = useSelector((state) => state.course.coursesByUser);
	const [selectedUser, setSelectedUser] = useState(null);
	const [valueQr, setValueQr] = useState(null);
	const [loadingUser, setLoadingUser] = useState(false);
	const [loadingCourse, setLoadingCourse] = useState(false);
	const [userSiscap, setUserSiscap] = useState(null);

	const [trainings, setTrainings] = useState([]);
	const [qualifications, setQualifications] = useState([]);
	const [procedures, setProcedures] = useState([]);

	const [filters, setFilters] = useState({
		page: 1,
		pagination: true,
		user_id: null,
		per_page: process.env.REACT_APP_PAGINATION_PER_PAGE || 10,
	});

	const handleAutocompleteChange = (event, value) => {
		setSelectedUser(value);
		setFilters({ ...filters, user_id: value?.id || null });
		setValueQr(window.location.href + '?userid=' + value?.id);
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

	useEffect(() => {
		getUsers();
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
			const { capacitaciones, habilitaciones, procedimientos, ...currentUser } =
				response?.personas[0];
			setUserSiscap(currentUser);
			if (Array.isArray(capacitaciones)) setTrainings(addId(capacitaciones));
			if (Array.isArray(habilitaciones)) setQualifications(addId(habilitaciones));
			if (Array.isArray(procedimientos)) setProcedures(addId(procedimientos));
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoadingCourse(false);
		}
	};

	return (
		<div id="PesonalSearch">
			<SearchTabs />
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />

			<Container>
				<Box
					sx={{
						minHeight: '100%',
						backgroundColor: 'white.main',
						borderRadius: '10px',
						overflow: 'hidden',
						mb: 2,
					}}
				>
					{loadingCourse && <LinearProgress />}
					<Box padding={4}>
						<Typography
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
								marginBottom: 4,
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
										<TextField {...params} label="Usuario" />
										{loadingUser && <LinearProgress />}
									</div>
								)}
							/>
						</Box>
						{selectedUser && selectedUser?.id && (
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
													<td>
														{Array.isArray(
															selectedUser?.charges
														) &&
															selectedUser?.charges[0]
																?.name}
													</td>
												</tr>
												<tr>
													<td style={{ color: '#0039a6' }}>
														Correo electrónico:
													</td>
													<td>{selectedUser?.email}</td>
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

										<Box display={'flex'} justifyContent={'flex-end'}>
											<UpdateUserDialog
												helmetcolor={userSiscap?.helmet}
												user={userSiscap}
												getCourses={getCourses}
											/>
										</Box>
									</Grid>
								</Grid>
							</Box>
						)}
						{selectedUser && selectedUser?.id && (
							<Grid spacing={4} container>
								<Grid xs={12} item>
									<Typography>Capacitaciones</Typography>
									<TrainingTable trainings={trainings} />
								</Grid>
								<Grid xs={12} item>
									<Typography>Habilitaciones</Typography>
									<QualificationsTable
										qualifications={qualifications}
									/>
								</Grid>
								<Grid xs={12} item>
									<Typography>Procedimientos</Typography>
									<ProceduresTable procedures={procedures} />
								</Grid>
							</Grid>
						)}
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default PesonalSearch;
