import React from 'react';
import { RiListView, RiHistoryLine, RiProgress1Line } from '@remixicon/react';
import PropTypes from 'prop-types';

function CardInfo(props) {
	const { solicitud, totalSolicitudes } = props;
	let status = '';
	let textColor = '';
	let icon = '';
	let title = '';
	let borderColor = '';
	let description = '';
	switch (solicitud) {
		case 'register':
			borderColor = 'border-t-4 border-blue-zodiac-800';
			title = 'Solicitudes En Estado Registradas';
			icon = <RiProgress1Line className='w-20 h-16' />;
			status = 'bg-blue-zodiac-500/10 text-blue-zodiac-800';
			description = 'Estado Actual';
			textColor = 'text-blue-zodiac-800';
			break;
		case 'inProcess':
			borderColor = 'border-t-4 border-yellow-500';
			title = 'Solicitudes En Estado Proceso';
			icon = <RiProgress1Line className='w-20 h-16' />;
			status = 'bg-yellow-500/10 text-yellow-500';
			description = 'Solicitudes que estan asignadas';
			textColor = 'text-yellow-600';
			break;
		case 'close':
			borderColor = 'border-t-4 border-green-500';
			title = 'Solicitudes en Estado Cerradas';
			icon = <RiHistoryLine className='w-20 h-16' />;
			status = 'bg-green-500/10 text-green-500';
			description = 'Solicitudes que estan cerradas';
			textColor = 'text-green-500';
			break;
		case 'total':
			borderColor = 'border-t-4 border-red-500';
			title = 'Total de Solicitudes';
			icon = <RiListView className='w-20 h-16' />;
			description = 'Total de solicitudes registradas';
			status = 'bg-pink-500/10 text-pink-500';
			textColor = 'text-blue-zodiac-950';
			break;
	}
	return (
		<div
			className={`card card-side bg-white shadow-xl text-black ${borderColor} mt-2`}
		>
			<figure className={`${status}`}>{icon}</figure>
			<div className='card-body'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg'>{title}</h3>
					<i className='fas fa-user-graduate'>👌</i>
				</div>
				<p className='text-3xl font-gothicBold'>{totalSolicitudes}</p>
				<p className={textColor}>{description}</p>
			</div>
		</div>
	);
}

CardInfo.propTypes = {
	solicitud: PropTypes.string, // ajusta el tipo según lo que esperas para solicitud
	totalSolicitudes: PropTypes.number,
	text: PropTypes.string.isRequired,
};

export default CardInfo;
