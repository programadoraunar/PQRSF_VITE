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
function PQRSFDetails() {
	return (
		<section className='bg-white border-b py-8'>
			<h1 className='w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800'>
				¿Que es PQRSF?
			</h1>
			<div className='w-full mb-4'>
				<div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
			</div>
			<div className='container mx-auto grid grid-cols-3 gap-4 pt-4 pb-12'>
				{data.map(item => (
					<div
						key={item.solicitud}
						className='col-span-3 md:col-span-1 p-6 flex flex-col flex-grow flex-shrink'
					>
						<div className='flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow'>
							<p className='w-full text-gray-600 text-xs md:text-sm px-6'>
								{item.solicitud}
							</p>
							<h2 className='w-full font-bold text-xl text-gray-800 px-6'>
								{item.solicitud}
							</h2>
							<p className='text-gray-800 text-base px-6 mb-5'>{item.text}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default PQRSFDetails;
