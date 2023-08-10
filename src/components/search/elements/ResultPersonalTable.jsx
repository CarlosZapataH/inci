import * as React from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import statusCourse from '@src/helpers/statusCourse';

const ResultPersonalTable = ({ courses }) => {
	const formatDate = (date) => {
		return moment(date).format('DD-MM-YYYY');
	};
	return (
		<Box sx={{ overflow: 'auto' }}>
			<Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 400 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Curso</TableCell>
								<TableCell align="center">Estado</TableCell>
								<TableCell align="center">Fecha de inicio</TableCell>
								<TableCell align="center">Fecha de fin</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{courses.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="center">
										{statusCourse(row.status_user).label}
									</TableCell>
									<TableCell align="center">
										{formatDate(row.start_date)}
									</TableCell>
									<TableCell align="center">
										{formatDate(row.end_date)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};
export default ResultPersonalTable;
