import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Chip } from '@mui/material';

const columns = [
	{ id: 'procedure', label: 'Procedimiento', minWidth: 170, align: 'left' },
	{ id: 'service', label: 'Servicio', minWidth: 100 },
	{ id: 'charge', label: 'Cargo', minWidth: 100 },
	{ id: 'status', label: 'Estado', minWidth: 100 },
];

const ImportedDocumentsTable = ({ procedures }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const getIconStatus = (registro) => {
		if (registro?.status && registro?.message) {
			return (
				<Chip
					variant="outlined"
					color="primary"
					size="small"
					label={registro?.message}
				></Chip>
			);
		} else if (registro?.status == true) {
			return <CheckCircleOutlineIcon color="success" />;
		} else if (registro?.status == false) {
			return <HighlightOffIcon color="error" />;
		}
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column?.align || 'center'}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{procedures
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={index + '-TableRow'}
									>
										<TableCell>{row?.procedure}</TableCell>
										<TableCell align="center">
											{row?.service}
										</TableCell>
										<TableCell align="center">
											{row?.charge}
										</TableCell>
										<TableCell align="center">
											{getIconStatus(row)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={procedures.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default ImportedDocumentsTable;
