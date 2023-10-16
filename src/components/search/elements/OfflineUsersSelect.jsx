import { Autocomplete, Box, LinearProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OfflineUsersSelect = (props) => {
	const { users } = props;
	const navigate = useNavigate();
	const [loadingUser, setLoadingUser] = useState(false);
	const [hasCacheUsers, setHasCacheUsers] = useState(false);
	const handleAutocompleteChange = async (_, value) => {
		if (value && value?.nroDocumento) {
			navigate('/guest/personal/' + value?.nroDocumento);
		}
	};

	const filterOptions = (options, state) => {
		const filteredOptions = options.filter(
			(option) =>
				option?.apellidosNombres
					?.toLowerCase()
					.includes(state.inputValue.toLowerCase()) ||
				option?.nroDocumento
					?.toLowerCase()
					.includes(state.inputValue.toLowerCase())
		);
		return filteredOptions;
	};

	const verifycache = async () => {
		try {
			const cacheName = 'siscap-users-cache';
			const cacheNames = await caches.keys();
			setHasCacheUsers([...cacheNames].includes(cacheName));
		} catch (error) {
			setHasCacheUsers(false);
		}
	};

	useEffect(() => {
		verifycache();
	}, []);

	return (
		<Box
			sx={{
				maxWidth: '430px',
				margin: '0 auto 20px',
			}}
		>
			{hasCacheUsers && (
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={users}
					sx={{ width: '100%' }}
					loading={loadingUser}
					onChange={handleAutocompleteChange}
					filterOptions={filterOptions}
					getOptionLabel={(option) => option?.user_update_information?.fullName}
					renderInput={(params) => (
						<div>
							<TextField
								{...params}
								label="Nombre o documento del usuario"
							/>
							{loadingUser && <LinearProgress />}
						</div>
					)}
				/>
			)}
		</Box>
	);
};
export default OfflineUsersSelect;
