import React from 'react';
import { RiListView, RiAddLine, RiHistoryLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardInfo(props) {
	const { solicitud, totalSolicitudes, text } = props;
	let status = '';
	let textColor = '';
	let icon = '';
	let title = '';
	let borderColor = '';
	switch (solicitud) {
		case 'pending':
			status = 'bg-yellow-500/10 text-yellow-500';
			textColor = 'text-yellow-500';
			break;
		case 'inProcess':
			status = 'bg-blue-500/10 text-blue-500';
			textColor = 'text-blue-500';
			break;
		case 'close':
			borderColor = 'border-t-4 border-green-500';
			title = 'Solicitudes Cerradas';
			icon = <RiHistoryLine className='w-20 h-16' />;
			status = 'bg-green-500/10 text-green-500';
			textColor = 'text-green-500';
			break;
		case 'total':
			borderColor = 'border-t-4 border-red-500';
			title = 'Total de Solicitudes';
			icon = <RiListView className='w-20 h-16' />;
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
				<p className='text-3xl font-gothicBold '>{totalSolicitudes}</p>
				<p className={textColor}>Total de Solicitudes registradas</p>
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
