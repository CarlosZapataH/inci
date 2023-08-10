const statusList = [
	{ value: 'REGISTERED', label: 'Registrado', color: 'green' },
	{ value: 'ERROR', label: 'Error', color: 'red' },
	{ value: 'EXIST', label: 'Existente', color: 'blue' },
	{ value: 'REPEAT', label: 'Repetido', color: 'orange' },
	{ value: 'COMPLETED', label: 'Completado', color: 'green' },
	{ value: 'PENDING', label: 'Pendiente', color: 'orange' },
	{ value: 'NOT-EXIST-CHARGE', label: 'No existe cargo', color: 'orange' },
	
];

const statusCourse = (status = '') => {
	let find = statusList.filter((s) => s.value == status);
	return find.length > 0 ? find[0] : { value: '', label: 'Sin datos', color: 'grey' };
};

export default statusCourse;
