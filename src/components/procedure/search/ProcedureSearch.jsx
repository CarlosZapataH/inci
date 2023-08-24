import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Autocomplete,
	Box,
	Container,
	Grid,
	LinearProgress,
	TextField,
} from '@mui/material';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs/index.jsx';
import ProcedureTabs from '@src/components/procedure/elements/ProcedureTabs.jsx';
import { listCharges, listCostCenter } from '@src/features/security/securitySlice';
import { listProcedures } from '@src/features/procedure/procedureSlice';
import ProcedureTable from '@src/components/procedure/elements/ProcedureTable.jsx';
import { getProceduresSiscap } from '@src/features/procedure/service/procedure.service.js';
import { showValidationErrors } from '@src/helpers/listValidation';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/procedure/search', text: 'Procedimientos' },
];

const ProcedureSearch = () => {
	const dispatch = useDispatch();
	const charges = useSelector((state) => state.security.charges);
	const costCenter = useSelector((state) => state.security.costCenter);
	const [procedures, setProcedures] = useState([]);
	const [isMounted, setIsMounted] = useState(true);
	const [loadingProcedures, setLoadingProcedures] = useState(false);

	const [filters, setFilters] = useState({
		q: null,
		page: 1,
		charge_id: null,
		pagination: true,
		cost_center_id: null,
		per_page: process.env.REACT_APP_PAGINATION_PER_PAGE || 10,
	});

	const joinIds = (arr) => {
		let ids = [];
		if (Array.isArray(arr)) {
			arr.forEach((element) => {
				ids.push(element?.id);
			});
		}
		return ids.join(',');
	};

	const handleAutocompleteChange = (event, selectedOptions, property) => {
		if (property === 'q') {
			console.log(selectedOptions);
			setFilters({ ...filters, [property]: event.target.value });
		} else {
			const ids = joinIds(selectedOptions);
			setFilters({ ...filters, [property]: ids });
		}
	};

	const getProcedures = async () => {
		try {
			setLoadingProcedures(true);
			const response = await getProceduresSiscap();
			let { procedimientos } = response;
			if (Array.isArray(procedimientos)) {
				procedimientos = procedimientos.map((procedure) => ({
					...procedure,
					codigoProcedimiento: (procedure?.codigoProcedimiento || '').trim(),
				}));
			}
			if (isMounted) setProcedures(procedimientos);
		} catch (error) {
			showValidationErrors(error);
		} finally {
			setLoadingProcedures(false);
		}
	};

	useEffect(() => {
		dispatch(listCharges());
		dispatch(listCostCenter());
		getProcedures();
		return () => {
			setIsMounted(false);
		};
	}, []);

	return (
		<div>
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />
			<Container>
				<Box
					sx={{
						borderRadius: '10px',
						overflow: 'hidden',
						backgroundColor: '#ffffff',
					}}
				>
					<ProcedureTabs />
					{loadingProcedures && <LinearProgress />}
					<Box
						sx={{
							padding: 2,
							border: '1px solid lightgray',
							borderRadius: '0 0 10px 10px',
						}}
					>
						{/* <Grid spacing={2} sx={{ mb: 4 }} container>
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
											name="select-charge"
											autoComplete="off"
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
							<Grid xs={12} md={4} item>
								<TextField
									size="small"
									label="Nombre del Procedimiento"
									variant="outlined"
									onChange={(event, value) =>
										handleAutocompleteChange(event, value, 'q')
									}
									fullWidth
								/>
							</Grid>
						</Grid> */}
						<ProcedureTable procedures={procedures} />
					</Box>
				</Box>
			</Container>
		</div>
	);
};
export default ProcedureSearch;
