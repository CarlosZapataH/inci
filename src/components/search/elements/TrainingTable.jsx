import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';
import VerticalTable from '@src/components/search/elements/VerticalTable.jsx';

const TrainingTable = ({ trainings }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const columns = [
		{
			field: 'nombreCurso',
			headerName: 'Nombre del curso',
			width: 400,
			sortable: false,
		},
		{ field: 'subArea', headerName: 'Subárea', width: 200, sortable: false },
		{
			field: 'fechaEjecucion',
			headerName: 'Fecha de ejecución',
			width: 170,
			sortable: false,
		},
		{
			field: 'fechaVencimiento',
			headerName: 'Fecha de vencimiento',
			width: 180,
			sortable: false,
		},
		{ field: 'status', headerName: 'Estado', width: 120, sortable: false },
	];

	return (
		<div id="TrainingTable" style={{ maxWidth: '100%', overflow: 'auto' }}>
			{isMobile ? (
				<VerticalTable items={trainings} headers={columns} />
			) : (
				<DataGrid
					rows={trainings}
					columns={columns.map((col) => ({
						...col,
						cellClassName: 'long-text-cell',
					}))}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10, 20]}
					getRowHeight={() => 60}
					localeText={{
						noRowsLabel: 'No hay filas disponibles',
					}}
					autoHeight
				/>
			)}			
		</div>
	);
};
export default TrainingTable;
