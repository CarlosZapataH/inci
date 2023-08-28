import React from 'react';
import Layout from '../components/layout';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import { Navigate, Link } from 'react-router-dom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VerifyCacheSnackbar from '@src/components/global/VerifyCacheSnackbar/VerifyCacheSnackbar';

const Home = () => {
	return (
		<Layout>
			<VerifyCacheSnackbar />
			<div className="home">
				<Link to="/search" className="box-link">
					<div>
						<PersonSearchIcon fontSize="large" />
						<div>Búsqueda de personal</div>
					</div>
				</Link>
			</div>
		</Layout>
	);
};

export default Home;
