import React from 'react';
const data = [
	{
		solicitud: 'Peticion',
		text: 'Solicitud formal a la universidad para intervenir en un asunto específico. Puede ser para solicitar una acción o información. Tiempo de Respuesta: 10 días.',
	},
	{
		solicitud: 'Queja',
		text: 'Manifestación de descontento con un proceso, servicio o personal universitario. Tiempo de Respuesta: 15 días',
	},
	{
		solicitud: 'Reclamo',
		text: 'Demanda de servicio debido al incumplimiento de un derecho. Tiempo de Respuesta: 15 días',
	},
	{
		solicitud: 'Sugerencia',
		text: ' Recomendación para mejorar los servicios universitarios. Tiempo de Respuesta: 15 días',
	},
	{
		solicitud: 'Felicitacion',
		text: 'Expresión de satisfacción con un funcionario, proceso o servicio universitario. Tiempo de Respuesta: 15 días.',
	},
];
function CardsInfo() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
			{data.map(item => (
				<div key={item.solicitud} className='block max-w-sm p-6'>
					<h2 className='mb-2 text-2xl lg:text-3xl  font-bold tracking-tight text-gray-900'>
						{item.solicitud}
					</h2>
					<p className='font-normal text-gray-700 dark:text-gray-500 text-base lg:text-xl'>
						{item.text}
					</p>
				</div>
			))}
		</div>
	);
}

export default CardsInfo;
