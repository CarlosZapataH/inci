import Swal from 'sweetalert2';

const validateFileExtension = ({ file = null, allowedExtensions = [] }) => {
	let result = false;
	if (file && Array.isArray(allowedExtensions)) {
		const fileNameParts = file.name.split('.');
		const fileExtension = '.' + fileNameParts[fileNameParts.length - 1].toLowerCase();
		result = allowedExtensions.includes(fileExtension);
	} else {
		result = false;
	}
	if (!result) {
		Swal.fire({
			title: 'Extensión no válida',
			text:
				'Solo se admiten archivos con las extensiones ' +
				allowedExtensions?.join(' '),
			icon: 'warning', // 'success', 'error', 'warning', 'info'
			confirmButtonColor: '#0039a6',
		});
	}
	return result;
};

const validateFileSize = ({ file = null, maxSizeMb = 0 }) => {
	let result = false;
	if (file && maxSizeMb) {
		const maxSize = maxSizeMb * 1024 * 1024;
		result = file.size <= maxSize;
	}
	if (!result) {
		Swal.fire({
			title: 'El archivo es demasiado grande',
			text: `El tamaño máximo permitido es ${maxSizeMb} MB.`,
			icon: 'warning',
			confirmButtonColor: '#0039a6',
		});
	}
	return result;
};

const showValidationErrors = (error) => {
	const { message } = error?.response?.data || {};
	let errorTitle = 'Validación fallida';
	let errorMessage = '';

	if (Array.isArray(message)) {
		for (const item of message) {
			errorMessage += `${item}\n`;
		}
	} else if (typeof message === 'string') {
		errorMessage = message;
	} else if (error?.message) {
		errorTitle = 'Error en la solicitud';
		errorMessage = error?.message;
	} else {
		errorTitle = 'Error en la solicitud';
		errorMessage =
			'Hubo un problema con la solicitud que enviaste. Por favor, verifica los datos e intenta nuevamente.';
	}
	console.error(error);

	Swal.fire({
		icon: 'warning',
		confirmButtonColor: '#0039a6',
		title: errorTitle,
		text: errorMessage,
	});
};

export { validateFileExtension, validateFileSize, showValidationErrors };
