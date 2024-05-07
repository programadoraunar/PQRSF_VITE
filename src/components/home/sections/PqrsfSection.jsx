import React from 'react';
import home2 from '../../../assets/img/home2.svg';

function PqrsfSection() {
	return (
		<section className='bg-white border-b py-8'>
			<div className='container max-w-6xl mx-auto m-8'>
				<h1 className='w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800'>
					Sistema PQRSF
				</h1>
				<div className='w-full mb-4'>
					<div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
				</div>
				<div className='flex flex-wrap'>
					<div className='w-5/6 sm:w-1/2 p-6'>
						<p className='text-gray-600 mb-8'>
							La Universidad Autónoma de Nariño ha establecido una alternativa
							para facilitar la radicación de Peticiones, Quejas, Reclamos,
							Sugerencias y Felicitaciones (PQRSF). Este canal dispone de un
							formulario con indicaciones claras para su diligenciamiento, así
							como las definiciones y la política de tratamiento de datos
							personales. Esta iniciativa se extiende a cualquier servicio de
							dependencia académica o administrativa de la universidad. La
							Universidad Autónoma de Nariño se compromete a brindar una
							atención adecuada y oportuna a las PQRSF presentadas por los
							estudiantes, docentes, personal administrativo y comunidad en
							general. Este compromiso tiene como objetivo mejorar continuamente
							la calidad de sus servicios y procesos académicos y
							administrativos. La Universidad Autónoma de Nariño agradece la
							confianza depositada en sus servicios y reitera su compromiso con
							la calidad y la mejora continua.
							<br />
							<br />
							Images from:
							<a className='text-pink-500 underline' href='https://undraw.co/'>
								undraw.co
							</a>
						</p>
					</div>
					<div className='w-full sm:w-1/2 p-6'>
						<img src={home2} />
					</div>
				</div>
			</div>
		</section>
	);
}

export default PqrsfSection;
