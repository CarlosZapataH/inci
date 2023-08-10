import * as React from 'react';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Container, Typography, Breadcrumbs, Link } from '@mui/material';

const CustomBreadcrumbs = (props) => {
	const { breadcrumbs } = props;

	return (
		<div id="custom-breadcrumbs" style={{ padding: '24px 0' }}>
			<Container>
				<Breadcrumbs
					aria-label="breadcrumb"
					separator={<NavigateNextIcon fontSize="small" />}
				>
					{breadcrumbs.map((breadcrumb, index) => {
						const key = `${index}-bread`;
						return index !== breadcrumbs.length - 1 ? (
							<Link
								underline="hover"
								color="primary.main"
								href={breadcrumb?.value}
								key={key}
							>
								{breadcrumb?.text}
							</Link>
						) : (
							<Typography color="text.primary" key={key}>
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
