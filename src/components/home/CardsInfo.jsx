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
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4'>
			{data.map(item => (
				<div key={item.solicitud} className='block p-6 bg-white'>
					<h2 className='mb-2 text-base lg:text-lg  font-gothicBold tracking-tight text-gray-900'>
						{item.solicitud}
					</h2>
					<p className='font-normal text-gray-700 dark:text-gray-500 text-sm lg:text-base'>
						{item.text}
					</p>
				</div>
			))}
		</div>
	);
}

export default CardsInfo;
