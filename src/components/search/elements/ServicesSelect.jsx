import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ServicesSelect = (props) => {
	const { services, currentService } = props;
	const handleChange = (event) => {
		props.setCurrentService(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="services-Label">Servicios</InputLabel>
				<Select
					labelId="services-Label"
					id="services-select"
					value={currentService || ''}
					label="Servicios"
					onChange={handleChange}
				>
					{services.map((item) => (
						<MenuItem key={item?.codigoServicio} value={item}>
							{item?.nombreServicio}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};
export default ServicesSelect;
