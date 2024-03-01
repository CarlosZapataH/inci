import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useMediaQuery, useTheme } from '@mui/material';
import VerticalTable from '@src/components/search/elements/VerticalTable.jsx';

const QualificationsTable = ({ qualifications }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const getStatusColor = (params)=>{
		let status = 'default';
		if(params.value == 'VIGENTE' && params.row?.alert){
			status = 'warning';
		}
		else if(params.value == 'VIGENTE'){
			status = 'success';
		}
		else if(params.value == 'VENCIDO'){
			status = 'danger';
		}
		return status;
	}

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
		{ 
			field: 'status', 
			headerName: 'Estado', 
			width: 120, 
			sortable: false,
			renderCell: (params) => (
				<span className={'badge-'+getStatusColor(params)}>{params.value}</span>
			),
		},
	];

	return (
		<div id="QualificationsTable" style={{ maxWidth: '100%', overflow: 'auto' }}>
			{isMobile ? (
				<VerticalTable items={qualifications} headers={columns} />
			) : (
				<DataGrid
					rows={qualifications}
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
export default QualificationsTable;
