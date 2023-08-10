const statusList = [
	{ value: 'REPEAT', label: 'Registro se repite en el array enviado', color: 'orange' },
	{ value: 'ERROR', label: 'Error al guardar el registro en la BD', color: 'red' },
	{ value: 'REGISTERED', label: 'El registro se hizo exitosamente', color: 'green' },
	{ value: 'COMPLETE', label: 'Completo', color: 'green' },
	{ value: 'UPDATED', label: 'Actualizado', color: 'light-green darken-2' },
	{
		value: 'EXIST-FILE',
		label: 'El procedimiento ya cuenta con un archivo asignado',
		color: 'orange',
	},
	{
		value: 'NOT-EXIST-SERVICE',
		label: 'El servicio no existe en seguridad',
		color: 'orange',
	},
	{
		value: 'EXIST',
		label: 'El procedimiento y asignación de servicio ya existe',
		color: 'orange',
	},
	{
		value: 'NOT-EXIST-PROCEDURE',
		label: 'El procedimiento no existe',
		color: 'orange',
	},
	{
		value: 'NOT-EXIST-ASSIGN',
		label: 'El procedimiento existe, pero no existe la asignación al servicio indicado',
		color: 'orange',
	},
	{
		value: 'NOT-EXIST-SERVICE-CHARGE',
		label: 'No existe servicio y cargo',
		color: 'orange',
	},
	{
		value: 'NOT-EXIST-CHARGE',
		label: 'No existe cargo',
		color: 'orange',
	},
	{
		value: 'EXIST-PROCEDURE-ASSIGN',
		label: 'Ya existe asignacion',
		color: 'orange',
	},
	{
		value: 'NOT-EXIST-PROCEDURE-ASSIGN',
		label: 'El procedimiento existe, pero no existe la asignación al servicio indicado',
		color: 'orange',
	},
	
];

const getStatus = (status = '') => {
	let find = statusList.filter((s) => s.value == status);
	return find.length > 0 ? find[0] : { value: '', label: status, color: 'grey' };
};

export { getStatus };
