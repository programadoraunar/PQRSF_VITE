import React from 'react';
import PropTypes from 'prop-types';
import { RiUserSearchFill } from '@remixicon/react';

function InfoSolicitante({ data }) {
	return (
		<section
			id='infoSolicitante'
			className='mb-5 lg:mb-0 lg:w-[800px] xl:w-[450px] lg:min-h-screen'
		>
			<div className='card bg-white text-black shadow-lg lg:h-full '>
				<div className='card-body flex flex-col justify-center items-center'>
					<RiUserSearchFill className='w-48 h-48 object-cover rounded-full text-blue-zodiac-950' />
					<h2 className='card-title font-gothicBold'>
						{`${data.nombres} ${data.primer_apellido} ${data.segundo_apellido}`}
					</h2>
					<div className='card-body '>
						<p>Detalles sobre el solicitante y sus datos relevantes.</p>
						<span className='font-gothicBold'>Tipo de Documento</span>
						<p>{data.tipo_documento}</p>
						<span className='font-gothicBold'>Numero de Documento</span>
						<p>{data.numero_documento}</p>
						<span className='font-gothicBold'>Direccion</span>
						<p>{data.direccion}</p>
						<span className='font-gothicBold'>Correo</span>
						<p>{data.correo_electronico}</p>
						<span className='font-gothicBold'>Celular</span>
						<p>{data.celular}</p>
						<span className='font-gothicBold'>Id Del Usuario</span>
						<p>{data.id_usuario}</p>
						{data.programa && data.semestre ? (
							<>
								<span className='font-gothicBold'>Programa</span>
								<p>{data.programa}</p>
								<span className='font-gothicBold'>Semestre</span>
								<p>{data.semestre}</p>
							</>
						) : (
							<>
								<span className='font-gothicBold'>Facultad</span>
								<p>{data.facultad}</p>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
InfoSolicitante.propTypes = {
	data: PropTypes.shape({
		nombres: PropTypes.string.isRequired,
		primer_apellido: PropTypes.string.isRequired,
		segundo_apellido: PropTypes.string.isRequired,
		tipo_documento: PropTypes.string.isRequired,
		numero_documento: PropTypes.string.isRequired,
		direccion: PropTypes.string.isRequired,
		correo_electronico: PropTypes.string.isRequired,
		celular: PropTypes.string.isRequired,
		id_usuario: PropTypes.string.isRequired,
		programa: PropTypes.string,
		semestre: PropTypes.number,
		facultad: PropTypes.string,
	}).isRequired,
};
export default InfoSolicitante;
