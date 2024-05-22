import React from 'react';
import {
	RiUserSearchFill,
	RiTimeZoneFill,
	RiListCheck,
	RiProgress1Line,
} from '@remixicon/react';
import Table from '../../components/admin/details/Table';

export const ProductDetails = () => {
	return (
		<div className='flex flex-col lg:flex-row lg:gap-5'>
			<section
				id='infoSolicitante'
				className='mb-5 lg:mb-0 lg:w-[800px] lg:min-h-screen'
			>
				<div className='card bg-white text-black shadow-lg lg:h-full'>
					<div className='card-body flex flex-col justify-center items-center'>
						<RiUserSearchFill className='w-48 h-48 object-cover rounded-full text-blue-zodiac-950' />

						<h2 className='card-title font-gothicBold'>
							Nombre del Solicitante
						</h2>
						<div className='card-body'>
							<p>Detalles sobre el solicitante y sus datos relevantes.</p>
							<p>Tipo de Documento</p>
							<p>Numero de Documento</p>
							<p>Direccion</p>
							<p>Correo</p>
							<p>Celular</p>
							<p>Id Del Usuario</p>
						</div>
					</div>
				</div>
			</section>
			<div className='flex flex-col items-center'>
				<section id='infoSolicitud' className='w-full'>
					<h2 className='text-black text-2xl py-5 lg:p-0 lg:pb-5 font-gothicBold '>
						Detalles de la Solicitud
					</h2>
					<div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
						<div className='card card-side bg-white shadow-xl text-black'>
							<figure className='p-4 bg-blue-zodiac-500/10 text-blue-zodiac-800 '>
								<RiListCheck className='w-20 h-16' />
							</figure>
							<div className='card-body'>
								<div className='flex items-center justify-between mb-4'>
									<h3 className='text-lg'>Tipo de Solicitud</h3>
								</div>
								<p className='text-3xl font-gothicBold'>Peticiones</p>
								<p className='text-blue-500'>Descripción de la solicitud</p>
							</div>
						</div>
						<div className='card card-side bg-white shadow-xl text-black'>
							<figure className='p-4 bg-blue-zodiac-500/10 text-blue-zodiac-800 '>
								<RiProgress1Line className='w-20 h-16' />
							</figure>
							<div className='card-body'>
								<div className='flex items-center justify-between mb-4'>
									<h3 className='text-lg'>Estado de la Solicitud</h3>
								</div>
								<p className='text-3xl font-gothicBold'>Asignada</p>
								<p className='text-blue-500'>Estado Actual de la Solicitud</p>
							</div>
						</div>
						<div className='card card-side bg-white shadow-xl text-black mt-2 lg:mt-0'>
							<figure className='p-4 text-yellowBase bg-yellow-500/10'>
								<RiTimeZoneFill className='w-20 h-16' />
							</figure>
							<div className='card-body'>
								<div className='flex items-center justify-between mb-4'>
									<h3 className='text-lg'>Fecha De Asignacion</h3>
								</div>
								<p className='text-3xl font-gothicBold'> 22/05/2024</p>
								<p className='text-blue-500'>Más detalles sobre la solicitud</p>
							</div>
						</div>
					</div>
					<Table />
				</section>
			</div>
		</div>
	);
};
