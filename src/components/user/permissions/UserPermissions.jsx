import React from 'react';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs';
import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/user/permissions', text: 'Permisos' },
];

const UserPermissions = () => {
	const permissions = useSelector((state) => state?.auth?.permissions || []);

	return (
		<div id="UserPermissions">
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
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Módulo</TableCell>
									<TableCell align="center">Página</TableCell>
									<TableCell align="center">Actividad</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{permissions.map((row, index) => (
									<TableRow
										key={index + '-permission'}
										sx={{
											'&:last-child td, &:last-child th': {
												border: 0,
											},
										}}
									>
										<TableCell component="th" scope="row">
											{row.module_name}
										</TableCell>
										<TableCell align="center">
											{row.page_name}
										</TableCell>
										<TableCell align="center">
											{row.activity_name}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</div>
	);
};
export default UserPermissions;
