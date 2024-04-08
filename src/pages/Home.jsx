import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer';
import CardsInfo from '../components/home/CardsInfo';
function Home() {
	return (
		<div>
			<div className='py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-7 lg:py-6 lg:px-16 xl:py-7 xl:px-36 2xl:py-7 2xl:px-60'>
				<div className='flex flex-col lg:flex-row items-center justify-between'>
					<div className='flex justify-center lg:justify-start'>
						<img
							src='/logo-autonoma-de-narino.png'
							alt='Logo De La Auitonoma'
							className='w-full max-w-[8rem] sm:max-w-[7rem] md:max-w-[8rem]  lg:max-w-[9rem] xl:max-w-[10rem]'
						/>
					</div>

					<Link to='/login' className='text-blueBase text-sm lg:text-xl'>
						ir a login
					</Link>
				</div>

				<section id='informacion'>
					<p className='text-black text-base md:text-lg lg:text-xl'>
						La Universidad Autónoma de Nariño ha establecido una alternativa
						para facilitar la radicación de Peticiones, Quejas, Reclamos,
						Sugerencias y Felicitaciones (PQRSF), a través de su sitio web
						institucional. Este canal dispone de un formulario con indicaciones
						claras para su diligenciamiento, así como las definiciones y la
						política de tratamiento de datos personales. Esta iniciativa se
						extiende a cualquier servicio de dependencia académica o
						administrativa de la universidad. La Universidad Autónoma de Nariño
						se compromete a brindar una atención adecuada y oportuna a las PQRSF
						presentadas por los estudiantes, docentes, personal administrativo y
						comunidad en general. Este compromiso tiene como objetivo mejorar
						continuamente la calidad de sus servicios y procesos académicos y
						administrativos. La Universidad Autónoma de Nariño agradece la
						confianza depositada en sus servicios y reitera su compromiso con la
						calidad y la mejora continua.
					</p>
				</section>
				<section id='definiciones'>
					<CardsInfo />
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
