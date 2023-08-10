import React from 'react';
import Layout from '../components/layout';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import { Navigate, Link } from 'react-router-dom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Home = () => {
	return (
		<Layout>
			<div className="home">
				<Link to="/search" className="box-link">
					<div>
						<PersonSearchIcon fontSize="large" />
						<div>Busqueda de personal</div>
					</div>
				</Link>
				<Link to="/procedure/search" className="box-link">
					<div>
						<ListAltIcon fontSize="large" />
						<div>Procedimientos</div>
					</div>
				</Link>
			</div>
		</Layout>
	);
};

export default Home;
