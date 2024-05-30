import { RiListCheck, RiProgress1Line, RiTimeZoneFill } from '@remixicon/react';
import React from 'react';
import useObtenerNombre from '../../../utils/useObtenerNombre';
import PropTypes from 'prop-types';

function InfoSolicitud({ data }) {
	const { obtenerNombreEstado } = useObtenerNombre();
	return (
		<section id='infoSolicitud' className='w-full'>
			<h2 className='text-black text-2xl py-5 lg:p-0 lg:pb-5 font-gothicBold '>
				Detalles de la Solicitud
			</h2>
			<div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
				<div className='card card-side bg-white shadow-xl text-black'>
					<figure className='p-4 bg-blue-zodiac-500/10 text-blue-zodiac-800 '>
						<RiListCheck className='w-20 h-16' />
					</figure>
					<div className='card-body p-5'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-lg'>Tipo de Solicitud</h3>
						</div>
						<p className='text-3xl font-gothicBold'>
							{data.tipo_solicitud_pqrs}
						</p>
						<p className='text-blue-500'>¿Que tipo es?</p>
					</div>
				</div>
				<div className='card card-side bg-white shadow-xl text-black'>
					<figure className='p-4 bg-blue-zodiac-500/10 text-blue-zodiac-800 '>
						<RiProgress1Line className='w-20 h-16' />
					</figure>
					<div className='card-body p-5'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-lg'>Estado de la Solicitud</h3>
						</div>
						<p className='text-3xl font-gothicBold'>
							{obtenerNombreEstado(data.id_estado)}
						</p>
						<p className='text-blue-500'>Estado Actual de la Solicitud</p>
					</div>
				</div>
				<div className='card card-side bg-white shadow-xl text-black mt-2 lg:mt-0'>
					<figure className='p-4 text-yellowBase bg-yellow-500/10'>
						<RiTimeZoneFill className='w-20 h-16' />
					</figure>
					<div className='card-body p-5'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-lg'>Fecha De Asignacion</h3>
						</div>
						<p className='text-3xl font-gothicBold'>
							{data.fecha_asignacion || 'Pendiente'}
						</p>

						<p className='text-blue-500'>Fecha cuando se asigno</p>
					</div>
				</div>
			</div>
		</section>
	);
}
InfoSolicitud.propTypes = {
	data: PropTypes.shape({
		tipo_solicitud_pqrs: PropTypes.string.isRequired,
		id_estado: PropTypes.number.isRequired,
		fecha_asignacion: PropTypes.string,
	}).isRequired,
};

export default InfoSolicitud;
