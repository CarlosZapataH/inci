import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useMediaQuery, useTheme } from '@mui/material';
import VerticalTable from '@src/components/search/elements/VerticalTable.jsx';
import moment from 'moment';

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

const CustomrDate = ({ value }) => {
	moment.locale('es');
	const date = moment(value).format('LLL');
	return <div>{date}</div>;
};

const MentorTable = ({ mentors }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const columns = [
		{
			field: 'user_coach_new',
			headerName: 'Nombre del mentor',
			width: 300,
			sortable: false,
		},
		{
			field: 'user_coach_new_charge',
			headerName: 'Cargo del mentor',
			width: 300,
			sortable: false,
		},
		{
			field: 'user_create',
			headerName: 'Registrado por',
			width: 300,
			sortable: false,
		},
		{
			field: 'created_at',
			headerName: 'Fecha de registro',
			width: 230,
			renderCell: CustomrDate,
		},
	];

	const joinCharge = (coach) => {
		const charges = Array.isArray(coach.charges) ? coach.charges : [];
		const result = charges.map((charge) => charge.name);
		return Array.isArray(result) ? result.join(', ') || '-' : '-';
	};

	const customMentor = mentors.map((e) => {
		return {
			...e,
			user_coach_new: e?.user_coach_new?.fullName,
			user_coach_new_charge: joinCharge(e?.user_coach_new),
			user_create: e?.user_create?.fullName,
		};
	});

	return (
		<div id="ProceduresTable" style={{ maxWidth: '100%', overflow: 'auto' }}>
			{isMobile ? (
				<VerticalTable items={customMentor} headers={columns} />
			) : (
				<DataGrid
					autoHeight
					rows={customMentor}
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
					localeText={{
						noRowsLabel: 'No hay filas disponibles',
					}}
				/>
			)}
		</div>
	);
};
export default MentorTable;
