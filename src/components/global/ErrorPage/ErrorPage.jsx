import React from 'react';
import { Button } from '@mui/material';
import { Link, useRouteError } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<h1>
				<i>{error?.status + ' - '}</i>
				<i>{error.statusText || error.message}</i>
			</h1>
			<p>Lo sentimos, ha ocurrido un error inesperado.</p>
			<Button
				component={Link}
				to={`/`}
				color="primary"
				startIcon={<ArrowBackIosIcon fontSize="small" />}
			>
				Regresar a Inicio
			</Button>
		</div>
	);
}
