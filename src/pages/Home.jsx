import React from 'react';
import Footer from '../components/home/Footer';
import CardsInfo from '../components/home/CardsInfo';
import Header from '../components/home/Header';
import FormularioAnonimo from '../components/home/FormularioAnonimo';
import FormularioNormal from '../components/home/FormularioNormal';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ExpandingButton from '../components/home/ExpandingButton';
function Home() {
	return (
		<div className='bg-white'>
			<div className='py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-7 lg:py-6 lg:px-16 xl:py-7 xl:px-36 2xl:py-7 2xl:px-60'>
				<Header />
				<section id='titulo'>
					<h1 className='text-black font-gothicBold pt-5 text-xl md:text-xl lg:text-xl 2xl:text-2xl'>
						Peticiones Quejas, Reclamos, Sugerencias, Felicitaciones{' '}
					</h1>
				</section>
				<section id='informacion'>
					<p className='text-black py-10'>
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
					<div className='flex flex-col gap-5  py-5'>
						<div className='text-black py-5'>
							<h2 className='font-gothicBold text-xl md:text-xl lg:text-xl 2xl:text-2xl py-3'>
								Formularios y Consultas
							</h2>
							<p>
								Aquí encontrarás dos opciones para diligenciar tu solicitud.
								Puedes seleccionar el formulario anónimo si prefieres no
								identificarte o el formulario normal si deseas incluir tu
								información personal, adicionalmente esta la opcion de consultar
								la solicitud una vez generada.
							</p>
						</div>
						<div className='flex flex-col justify-center'>
							<ExpandingButton
								buttonText='Formulario Anonimo'
								expandedContent={<FormularioAnonimo />}
							/>
						</div>

						<div className='flex flex-col justify-center'>
							<ExpandingButton
								buttonText='Formulario Normal'
								expandedContent={<FormularioNormal />}
							/>
						</div>

						<div className='flex flex-col justify-center'>
							<Link to='/consulta'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									onHoverStart={e => {}}
									onHoverEnd={e => {}}
									className='flex items-center justify-center gap-3 py-4 px-10 rounded-b-lg bg-blue-zodiac-950 cursor-pointer w-full lg:w-80'
								>
									Consultar Estado Solicitud
								</motion.button>
							</Link>
						</div>
						<div className='flex flex-col justify-center'>
							<Link to='/consulta'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									onHoverStart={e => {}}
									onHoverEnd={e => {}}
									className='flex items-center justify-center gap-3 py-4 px-10 rounded-b-lg bg-blue-zodiac-950 cursor-pointer w-full lg:w-80'
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
