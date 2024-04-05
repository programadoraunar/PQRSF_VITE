import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer';
function Home() {
	return (
		<div>
			<div className='py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-7 lg:py-6 lg:px-24 xl:py-7 xl:px-52 2xl:py-7 2xl:px-60'>
				<div className='flex justify-center lg:justify-start'>
					<img
						src='/logo-autonoma-de-narino.png'
						alt='Logo De La Auitonoma'
						className='w-full max-w-[8rem] sm:max-w-[7rem] md:max-w-[8rem]  lg:max-w-[9rem] xl:max-w-[10rem]'
					/>
				</div>

				<Link to='/login' className='text-blueBase'>
					ir a login
				</Link>
				<div>
					<p className='text-black'>
						Peticiones, Quejas, Reclamos, Sugerencias y Felicitaciones
						&quot;pqrsf&quot; Radicación de Peticiones, Quejas, Reclamos,
						Sugerencias y Felicitaciones con respecto a algún servicio de
						dependencia académica o administrativa de la Universidad Autónoma de
						Nariño. La Universidad Autónoma de Nariño se compromete a brindar
						una atención adecuada y oportuna a las PQRSF presentadas por los
						estudiantes, docentes, personal administrativo y comunidad en
						general, con el fin de mejorar continuamente la calidad de sus
						servicios y procesos académicos y administrativos. Para presentar
						una PQRSF, los interesados pueden hacerlo a través de los siguientes
						canales: Formulario en línea disponible en la página web de la
						Universidad. Correo electrónico dirigido a la oficina de Atención al
						Ciudadano. Carta física dirigida a la oficina de Atención al
						Ciudadano. Todas las PQRSF serán registradas, atendidas y resueltas
						de acuerdo con los procedimientos establecidos por la Universidad, y
						se dará respuesta a los interesados en un plazo no mayor a quince
						(15) días hábiles contados a partir de la fecha de radicación. La
						Universidad Autónoma de Nariño agradece la confianza depositada en
						sus servicios y reitera su compromiso con la calidad y la mejora
						continua.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
