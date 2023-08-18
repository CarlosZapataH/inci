import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';

const CompanySelect = () => {
	const [company, setCompany] = React.useState('');
	const companies = useSelector((state) => state.auth.companies);

	const handleChange = (event) => {
		const companyId = event.target.value;
		setCompany(companyId);
		localStorage.setItem('company_id', companyId);
		location.reload();
	};

	React.useEffect(() => {
		setCompanybyLocal();
	}, []);

	const setCompanybyLocal = () => {
		if (typeof Storage !== 'undefined') {
			const company_id = localStorage.getItem('company_id');
			setCompany(company_id);
		}
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth size="small">
				<InputLabel id="CompanySelectLabel">Compañia</InputLabel>
				<Select
					labelId="CompanySelectLabel"
					id="CompanySelect"
					value={company}
					label="Compañia"
					onChange={handleChange}
				>
					{companies.map((item, index) => {
						return (
							<MenuItem value={item?.id} key={item?.id + '-CompanySelect'}>
								{item?.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
};

export default CompanySelect;
