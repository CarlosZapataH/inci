import { Box, Button, Pagination } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import PdfDownloadButton from '@src/components/procedure/elements/PdfDownloadButton.jsx';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PdfPreview = ({ urlPdf }) => {
	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const [pdfWidth, setPdfWidth] = useState(380);

	const warpperRef = useRef(null);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const handleChange = (__, value) => {
		setPageNumber(value);
	};

	useEffect(() => {
		const handleResize = () => {
			if (warpperRef?.current) setPdfWidth(warpperRef?.current?.offsetWidth);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
	}, []);

	return (
		<div
			id="PdfPreview"
			ref={warpperRef}
			style={{
				maxWidth: '93vw',
				overflow: 'auto',
				backgroundColor: 'white',
				marginBottom: 4,
			}}
		>
			{urlPdf && (
				<div>
					<Box display={'flex'} justifyContent={'flex-end'} padding={2}>
						<PdfDownloadButton url={urlPdf} label={'Descargar documento'} />
					</Box>

					<Document file={urlPdf} onLoadSuccess={onDocumentLoadSuccess}>
						<Page pageNumber={pageNumber} width={pdfWidth} />
					</Document>
					<Box padding={2} display={'flex'} justifyContent={'center'}>
						<Pagination
							count={numPages}
							page={pageNumber}
							onChange={handleChange}
						/>
					</Box>
				</div>
			)}
		</div>
	);
};
export default PdfPreview;
