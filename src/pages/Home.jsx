import React, { useState } from 'react';
import Footer from '../components/home/Footer';
import CardsInfo from '../components/home/CardsInfo';
import Header from '../components/home/Header';
import FormularioAnonimo from '../components/home/FormularioAnonimo';
import { motion, AnimatePresence } from 'framer-motion';
import { RiFileUserFill } from '@remixicon/react';
import { Link } from 'react-router-dom';
function Home() {
	const [mostrarFormularioAnonimo, setMostrarFormularioAnonimo] =
		useState(false);

	const handleMostrarComponente = () => {
		setMostrarFormularioAnonimo(true);
	};

	const handleCerrarComponente = () => {
		setMostrarFormularioAnonimo(false);
	};

	return (
		<div className='bg-white'>
			<div className='py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-7 lg:py-6 lg:px-16 xl:py-7 xl:px-36 2xl:py-7 2xl:px-72'>
				<Header />
				<section id='titulo'>
					<h1 className='text-black px-10 pt-5 text-lg md:text-xl lg:text-3xl 2xl:text-3xl'>
						Peticiones Quejas, Reclamos, Sugerencias, Felicitaciones{' '}
					</h1>
				</section>
				<section id='informacion'>
					<p className='text-black text-base md:text-lg lg:text-xl 2xl:text-2xl px-10 py-10'>
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
				<section id='formularios'>
					<div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 lg:gap-20 px-0 lg:px-10 py-16'>
						<div className='flex flex-col justify-center'>
							<motion.button
								whileHover={{ scale: 1.1 }}
								className='flex items-center justify-center gap-3 py-4 px-10 rounded-b-lg bg-blue-zodiac-900 cursor-pointer text-base lg:text-lg 2xl:text-xl hover:bg-blue-zodiac-950'
								onClick={handleMostrarComponente}
							>
								<RiFileUserFill />
								Formulario Aninimo
							</motion.button>

							<AnimatePresence>
								{mostrarFormularioAnonimo && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.6 }}
									>
										<FormularioAnonimo onClose={handleCerrarComponente} />
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						<div className='flex flex-col justify-center'>
							<motion.button
								whileHover={{ scale: 1.1 }}
								onHoverStart={e => {}}
								onHoverEnd={e => {}}
								className='flex items-center justify-center gap-3 py-4 px-10 rounded-b-lg bg-blue-zodiac-900 cursor-pointer text-base lg:text-lg 2xl:text-xl'
								onClick={handleMostrarComponente}
							>
								Solicitudes Normales
							</motion.button>
						</div>

						<div className='flex flex-col justify-center'>
							<Link to='/consulta'>
								<motion.button
									whileHover={{ scale: 1.1 }}
									onHoverStart={e => {}}
									onHoverEnd={e => {}}
									className='flex items-center justify-center gap-3 py-4 px-10 rounded-b-lg bg-blue-zodiac-900 cursor-pointer text-base lg:text-lg 2xl:text-xl w-full'
								>
									Consultar Estado Solicitud
								</motion.button>
							</Link>
						</div>
						<div className='flex flex-col justify-center'>
							<Link to='/consulta'>
								<motion.button
									whileHover={{ scale: 1.1 }}
									onHoverStart={e => {}}
									onHoverEnd={e => {}}
									className='flex items-center justify-center gap-3 py-4 px-10 rounded-b-lg bg-blue-zodiac-900 cursor-pointer text-base lg:text-lg 2xl:text-xl w-full'
								>
									Politica de Tratamiento de Datos
								</motion.button>
							</Link>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
