import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { listUsers, listCoursesByUser } from '@src/features/course/courseSlice';
import SearchTabs from '@src/components/search/elements/SearchTabs.jsx';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import ResultPersonalTable from '@src/components/search/elements/ResultPersonalTable.jsx';

import {
	Autocomplete,
	Box,
	Container,
	Divider,
	Grid,
	Hidden,
	TextField,
	Typography,
} from '@mui/material';

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
	};

	useEffect(() => {
		dispatch(listUsers());
	}, []);

	useEffect(() => {
		if (filters?.user_id) {
			dispatch(listCoursesByUser(filters));
		}
	}, [filters]);

	return (
		<div id="PesonalSearch">
			<SearchTabs />
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />

			<Container>
				<Box
					sx={{
						minHeight: '100%',
						padding: '24px',
						backgroundColor: 'white.main',
						borderRadius: '10px',
					}}
				>
					<div>
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
								onChange={handleAutocompleteChange}
								getOptionLabel={(option) => option?.fullName}
								renderInput={(params) => (
									<TextField {...params} label="Usuario" />
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
											</tbody>
										</table>
									</Grid>
								</Grid>
							</Box>
						)}
						{selectedUser && selectedUser?.id && (
							<ResultPersonalTable courses={courses} />
						)}
					</div>
				</Box>
			</Container>
		</div>
	);
};

export default PesonalSearch;
