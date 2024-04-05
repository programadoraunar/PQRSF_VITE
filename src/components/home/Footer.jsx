import React from 'react';

function Footer() {
	return (
		<div className='bg-blue-zodiac-900 flex flex-col justify-center items-center py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-7 lg:py-6 lg:px-24 xl:py-7 xl:px-52 2xl:py-7 2xl:px-60'>
			<div className='flex items-center flex-col'>
				<div className='flex justify-center'>
					<img
						src='/logo_aunar2.svg'
						alt='Logo De La Auitonoma'
						className='w-full max-w-[350px] sm:max-w-[400px] md:max-w-[600px]  lg:max-w-[700px] xl:w-[1000px]'
					/>
				</div>
				<div>
					<ul className='text-sm text-center lg:text-start'>
						<li>Corporación Universitaria Autónoma de Nariño</li>
						<li>NIT: 891224762-9</li>
						<li>Código SNIES: 3817</li>
						<li>Carrera 28 No. 19-24</li>
						<li> Número PBX: 7244419</li>
						<li>Pasto (Nariño) Colombia</li>
					</ul>
				</div>
			</div>

			<div className='px-4 py-3 lg:px-44'>
				<p className='text-center text-sm'>
					©Copyright 2024 - Derechos Reservados
				</p>

				<p className='text-center  text-sm py-3'>
					Departamento de Sistemas - AUNAR
				</p>
			</div>
		</div>
	);
}

export default Footer;
