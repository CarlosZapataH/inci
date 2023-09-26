import React, { useState } from 'react';
import { Box, Card, Pagination, useMediaQuery, useTheme } from '@mui/material';

const VerticalTable = ({ items, headers }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const theme = useTheme();
	const itemsPerPage = process.env.REACT_APP_PAGINATION_PER_PAGE;
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentData = items.slice(startIndex, endIndex);
	const totalPages = Math.ceil(items.length / itemsPerPage);
	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<Box>
			{currentData.map((item, index) => (
				<Card
					sx={{ my: 1, marginBottom: 2, marginTop: 2, p: 2 }}
					variant="outlined"
					key={index}
				>
					<table className="custom-vertical-table">
						<tbody>
							{headers.map((header, headerInd) => (
								<tr key={headerInd + '-tr'}>
									<td>{header?.headerName}</td>
									<td>{item[header?.field]}</td>
								</tr>
							))}
						</tbody>
					</table>
				</Card>
			))}
			<Box display={'flex'} justifyContent={'center'}>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					variant={isMobile ? 'outlined' : 'outlined'}
					shape="rounded"
				/>
			</Box>
		</Box>
	);
};
export default VerticalTable;
