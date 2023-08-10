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

export { validateFileExtension, validateFileSize };
