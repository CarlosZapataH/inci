import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const customCellClassName = (params) => {
	if (params.value && params.value.length > 20) {
		return 'long-text-cell';
	}
	return '';
};

const getRowHeight = (params) => {
	if (params?.model?.nombreCurso && params?.model?.nombreCurso?.length > 20) {
		return 60;
	}
	return 52;
};

const ProceduresTable = ({ procedures }) => {
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
		{ field: 'estado', headerName: 'Estado', width: 120, sortable: false },
	];

	return (
		<div id="ProceduresTable" style={{ maxWidth: '100%', overflow: 'auto' }}>
			<DataGrid
				autoHeight
				rows={procedures}
				columns={columns.map((col) => ({
					...col,
					cellClassName: customCellClassName,
				}))}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10, 20]}
				getRowHeight={getRowHeight}
			/>
		</div>
	);
};
export default ProceduresTable;
