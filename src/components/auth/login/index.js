import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setToken } from '@src/features/auth/authSlice';
import { listGeneralGuestCourses } from '@src/features/course/courseSlice';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import './styles.scss';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const isMobile = useMediaQuery('(max-width: 900px)');
	const url = process.env.REACT_APP_API + '/auth/login';

	useEffect(() => {
		//verifycache()
		setTokenSap();
		dispatch(listGeneralGuestCourses());
	}, []);

	const setTokenSap = () => {
		const tokenSap = searchParams.get('token');
		if (tokenSap) {
			localStorage.setItem('token', tokenSap);
			dispatch(setToken(tokenSap));
			navigate('/dashboard');
		}
	};

	const verifycache = () => {
		caches
			.match('https://hombrenuevo-api.smartrix.pe/api/v1/course/guest/general')
			.then((response) => {
				if (response) {
					// The route is in the cache. You can use it if needed.
					//console.log('Route is in cache:', response);
					alert('Api "/general" is in cache');
				} else {
					// The route is not in the cache.
					//alert('Route is not in cache.')
					//console.log('Route is not in cache.');
				}
			})
			.catch((error) => {
				// An error occurred while trying to check the cache.
				console.error('Error checking cache:', error);
			});
	};

	return (
		<div className="sectionLogin">
			<Grid container alignItems="center">
				<Grid item xs={12} md={8}>
					<div className="banner"></div>
				</Grid>

				<Grid item xs={12} md={4}>
					<div className={`caption ${isMobile ? 'caption-center' : ''}`}>
						<Typography sx={{ fontWeight: 'bold' }} variant="h4">
							Identificarse
						</Typography>
						<Typography sx={{ mb: 2 }} variant="subtitle1" gutterBottom>
							Bienvenido
						</Typography>
						<Button
							variant="contained"
							color="orange"
							rel="noopener noreferrer"
							href={url}
							disableElevation
						>
							Iniciar de sesión
						</Button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
