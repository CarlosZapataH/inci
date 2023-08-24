import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const TrainingTable = ({ trainings }) => {
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
		{ field: 'estado', headerName: 'Estado', width: 100, sortable: false },
	];

	return (
		<div id="TrainingTable" style={{ maxWidth: '100%', overflow: 'auto' }}>
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
				autoHeight
			/>
		</div>
	);
};
export default TrainingTable;
