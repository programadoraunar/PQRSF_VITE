import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Asegúrate de importar motion desde framer-motion
import { fadeIn } from '../../../utils/variants';
import { Link } from 'react-router-dom';

function Navbar() {
	// Estado para controlar si el menú está abierto o cerrado
	const [isOpen, setIsOpen] = useState(false);

	// Función para alternar el estado del menú
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<nav
			id='header'
			className='fixed w-full z-30 top-0 text-white  bg-blue-zodiac-950'
		>
			<div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2'>
				<div className='pl-4 flex items-center'>
					<a
						className='toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl'
						href='/'
					>
						<img src='/logo_aunar2.svg' width={300} alt='logo' />
					</a>
				</div>
				<div className='block lg:hidden pr-4'>
					<button
						id='nav-toggle'
						className='flex items-center p-1  hover:text-blue-zodiac-100 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer'
						onClick={toggleMenu}
					>
						<svg
							className='fill-current h-6 w-6'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title>Menu</title>
							<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
						</svg>
					</button>
				</div>
				<motion.div
					className={`w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0  lg:bg-transparent text-black p-4 lg:p-0 z-20 ${isOpen ? '' : 'hidden'}`}
					id='nav-content'
					initial={false}
					animate={{ height: isOpen ? 'auto' : 0 }}
					variants={fadeIn('down', 0.2)} // Aplicamos la animación fadeIn al contenido del menú
				>
					<motion.ul
						className='list-reset lg:flex justify-end flex-1 items-center '
						initial={false}
						animate={{ height: isOpen ? 'auto' : 0 }}
						variants={fadeIn('down', 0.2)}
					>
						<li className='mr-3'>
							<Link
								className='inline-block py-2 px-4 text-white hover:text-yellowBase no-underline'
								to='https://www.aunar.edu.co/politicas-de-proteccion-de-datos/'
							>
								Politica Datos Personales
							</Link>
						</li>
						<li className='mr-3'>
							<a
								className='inline-block text-white no-underline hover:text-yellowBase hover:text-underline py-2 px-4'
								href='/#queEs'
							>
								¿Que es PQRSF?
							</a>
						</li>
						<li className='mr-3'>
							<a
								className='inline-block text-white no-underline hover:text-yellowBase hover:text-underline py-2 px-4'
								href='/#formularios'
							>
								Formulario
							</a>
						</li>
						<li className='mr-3'>
							<a
								className='inline-block text-white no-underline hover:text-yellowBase hover:text-underline py-2 px-4'
								href='/consulta'
							>
								Consultar
							</a>
						</li>
					</motion.ul>
				</motion.div>
			</div>
			<hr className='border-b border-black opacity-25 my-0 py-0' />
		</nav>
	);
}

export default Navbar;
