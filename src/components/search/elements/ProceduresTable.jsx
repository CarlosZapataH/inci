import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ProceduresTable = ({ procedures }) => {
	const columns = [
		// { field: 'id', headerName: 'ID', sortable: false },
		// { field: 'periodo', headerName: 'Período', sortable: false },
		// { field: 'area', headerName: 'Área', width: 130, sortable: false },

		{
			field: 'nombreCurso',
			headerName: 'Nombre del  curso',
			width: 300,
			sortable: false,
		},
		{ field: 'subArea', headerName: 'Subárea', width: 250, sortable: false },
		// { field: 'horas', headerName: 'Horas', width: 130, sortable: false },
		// { field: 'tipo', headerName: 'Tipo', width: 130, sortable: false },
		// {
		// 	field: 'planificación',
		// 	headerName: 'Planificación',
		// 	width: 130,
		// 	sortable: false,
		// },
		{
			field: 'fechaVencimiento',
			headerName: 'Fecha de vencimiento',
			width: 250,
			sortable: false,
		},
		{ field: 'estado', headerName: 'Estado', width: 100, sortable: false },
	];

	return (
		<div
			id="ProceduresTable"
			style={{ height: 400, maxWidth: '100%', overflow: 'auto' }}
		>
			<DataGrid
				rows={procedures}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10, 20]}
			/>
		</div>
	);
};
export default ProceduresTable;
