import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import HelmetSvg from '@src/components/search/elements/HelmetSvg.jsx';

const CustomCellRendererColor = ({ value }) => {
	return (
		<div>
			<HelmetSvg fillColor={value} />
		</div>
	);
};

const CustomCellRendererDate = ({ value }) => {
	moment.locale('es');
	const date = moment(value).format('LLL');
	return <div>{date}</div>;
};

const CustomCellRendererUser = ({ value }) => {
	return <div>{value?.fullName + ' - ' + value?.document}</div>;
};

const HelmetTable = ({ helmets }) => {
	const columns = [
		{
			field: 'created_at',
			headerName: 'Fecha de cambio',
			width: 230,
			sortable: false,
			renderCell: CustomCellRendererDate,
		},
		{
			field: 'helmet_old',
			headerName: 'Color de casco anterior',
			width: 200,
			sortable: false,
			renderCell: CustomCellRendererColor,
		},
		{
			field: 'helmet_new',
			headerName: 'Color de casco',
			width: 160,
			sortable: false,
			renderCell: CustomCellRendererColor,
		},
		{
			field: 'user_create',
			headerName: 'Personal que realizó el cambio',
			width: 300,
			sortable: false,
			renderCell: CustomCellRendererUser,
		},
	];

	return (
		<div id="QualificationsTable" style={{ maxWidth: '100%', overflow: 'auto' }}>
			<DataGrid
				rows={helmets}
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
		</div>
	);
};
export default HelmetTable;
