import React from 'react';
import Footer from '../components/home/Footer';
import FormularioAnonimo from '../components/home/forms/FormularioAnonimo';
import FormularioNormal from '../components/home/forms/FormularioNormal';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ExpandingButton from '../components/home/ui/ExpandingButton';
import Navbar from '../components/home/navigation/Navbar';
import Hero from '../components/home/sections/Hero';
import PqrsfSection from '../components/home/sections/PqrsfSection';
import PQRSFDetails from '../components/home/sections/PQRSFDetails';
function Home() {
	return (
		<div>
			<Navbar />
			<Hero />
			<PqrsfSection />
			<PQRSFDetails />
			<section id='formularios' className='bg-gray-100 py-8'>
				<div className='container mx-auto px-7 xl:px-48 pt-4 pb-12 text-gray-800'>
					<h1 className='w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800'>
						Formularios
					</h1>
					<div className='w-full mb-4'>
						<div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
					</div>
					<div className='container flex flex-col gap-5  py-5 '>
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
							<Link to='https://www.aunar.edu.co/politicas-de-proteccion-de-datos/'>
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
				</div>
			</section>
			<Footer />
		</div>
	);
}

export default Home;
