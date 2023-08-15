import * as React from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProcedureTable = ({ procedures }) => {
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
								<TableCell>Código</TableCell>
								<TableCell>Procedimiento</TableCell>
								<TableCell>Servicio</TableCell>
								<TableCell align="center">Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{procedures.map((row, index) => (
								<TableRow
									key={index + '-procedure'}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}
								>
									<TableCell component="th" scope="row">
										{row?.codigoProcedimiento}
									</TableCell>
									<TableCell>{row?.nombreProcedimiento}</TableCell>
									<TableCell>{row?.nombreServicio}</TableCell>
									<TableCell align="center">
										<Button
											component={Link}
											to={`/procedure/${row?.codigoProcedimiento}/detail`}
											color="primary"
											size="small"
										>
											Ir a procedimiento
										</Button>
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
export default ProcedureTable;
