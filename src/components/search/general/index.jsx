import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCharges, listCostCenter } from '@src/features/security/securitySlice';
import { listCourses, listGeneralCourses } from '@src/features/course/courseSlice';
import SearchTabs from '@src/components/search/elements/SearchTabs.jsx';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import CoursesUserTable from '@src/components/search/elements/CoursesUserTable.jsx';
import {
	Autocomplete,
	Box,
	Container,
	Divider,
	Grid,
	TextField,
	Typography,
} from '@mui/material';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/search/personal', text: 'Búsqueda General' },
];

const GeneralSearch = () => {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.course.courses);
	const charges = useSelector((state) => state.security.charges);
	const costCenter = useSelector((state) => state.security.costCenter);
	const coursesUser = useSelector((state) => state.course.coursesUsers);

	const [filters, setFilters] = useState({
		page: 1,
		charge_id: null,
		cost_center_id: null,
		pagination: true,
		per_page: process.env.REACT_APP_PAGINATION_PER_PAGE || 10,
	});

	const handleAutocompleteChange = (event, selectedOptions, property) => {
		const ids = joinIds(selectedOptions);
		setFilters({ ...filters, [property]: ids });
	};

	const joinIds = (arr) => {
		let ids = [];
		if (Array.isArray(arr)) {
			arr.forEach((element) => {
				ids.push(element?.id);
			});
		}
		return ids.join(',');
	};

	useEffect(() => {
		dispatch(listCharges());
		dispatch(listCostCenter());
		dispatch(listCourses());
	}, []);

	useEffect(() => {
		dispatch(listGeneralCourses(filters));
	}, [filters]);

	return (
		<div id="PesonalGeneral">
			<SearchTabs />
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />

			<Container>
				<Box
					sx={{
						padding: '24px',
						backgroundColor: 'white.main',
						borderRadius: '10px',
					}}
				>
					<Grid spacing={2} sx={{ mb: 4 }} container>
						<Grid xs={12} md={4} item>
							<Autocomplete
								size="small"
								options={charges}
								getOptionLabel={(option) => option.name}
								onChange={(e, value) =>
									handleAutocompleteChange(e, value, 'charge_id')
								}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Cargos"
										placeholder="Cargo"
									/>
								)}
								filterSelectedOptions
								multiple
							/>
						</Grid>
						<Grid xs={12} md={4} item>
							<Autocomplete
								multiple
								size="small"
								options={courses}
								getOptionLabel={(option) => option.name}
								onChange={(event, value, reason) =>
									handleAutocompleteChange(event, value, 'course_id')
								}
								filterSelectedOptions
								renderInput={(params) => (
									<TextField
										{...params}
										label="Cursos"
										placeholder="Curso"
									/>
								)}
							/>
						</Grid>
						<Grid xs={12} md={4} item>
							<Autocomplete
								multiple
								size="small"
								options={costCenter}
								getOptionLabel={(option) => option.name}
								onChange={(event, value, reason) =>
									handleAutocompleteChange(
										event,
										value,
										'cost_center_id'
									)
								}
								filterSelectedOptions
								renderInput={(params) => (
									<TextField
										{...params}
										label="Servicios"
										placeholder="Servicio"
									/>
								)}
							/>
						</Grid>
					</Grid>

					<CoursesUserTable courses={coursesUser} />
				</Box>
			</Container>
		</div>
	);
};

export default GeneralSearch;
