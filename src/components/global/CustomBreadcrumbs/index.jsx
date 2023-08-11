import * as React from 'react';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Container, Typography, Breadcrumbs, Link as LinkMui } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomBreadcrumbs = (props) => {
	const { breadcrumbs } = props;

	return (
		<div id="custom-breadcrumbs" style={{ padding: '18px 0' }}>
			<Container>
				<Breadcrumbs
					aria-label="breadcrumb"
					separator={<NavigateNextIcon fontSize="small" />}
				>
					{breadcrumbs.map((breadcrumb, index) => {
						const key = `${index}-bread`;
						return index !== breadcrumbs.length - 1 ? (
							<LinkMui
								underline="hover"
								color="primary.main"
								to={breadcrumb?.value}
								key={key}
								variant="body2"
								component={Link}
							>
								{breadcrumb?.text}
							</LinkMui>
						) : (
							<Typography variant="body2" color="text.primary" key={key}>
								{breadcrumb?.text}
							</Typography>
						);
					})}
				</Breadcrumbs>
			</Container>
		</div>
	);
};

CustomBreadcrumbs.propTypes = {
	breadcrumbs: PropTypes.array,
};
export default CustomBreadcrumbs;
