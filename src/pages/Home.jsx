import React, { useState } from 'react';
import Footer from '../components/home/Footer';
import CardsInfo from '../components/home/CardsInfo';
import Header from '../components/home/Header';
import Buttons from '../components/ui/Buttons';
import FormularioAnonimo from '../components/home/FormularioAnonimo';
import { motion } from 'framer-motion';

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
		<div>
			<div className='py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-7 lg:py-6 lg:px-16 xl:py-7 xl:px-36 2xl:py-7 2xl:px-60'>
				<Header />
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
				<section id='formularios'>
					<div>
						<Buttons onClick={handleMostrarComponente}>
							Solicitudes Anónimas
						</Buttons>
						<motion.div
							initial={{ opacity: 0, y: 50 }} // Animación inicial: invisible y desplazada hacia abajo
							animate={{
								opacity: mostrarFormularioAnonimo ? 1 : 0,
								y: mostrarFormularioAnonimo ? 0 : 50,
							}} // Animación al mostrar/ocultar
							transition={{ duration: 0.6 }} // Duración de la animación
						>
							{mostrarFormularioAnonimo && <FormularioAnonimo />}
						</motion.div>
						{mostrarFormularioAnonimo && (
							<Buttons onClick={handleCerrarComponente}>Cerrar</Buttons>
						)}
					</div>
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
