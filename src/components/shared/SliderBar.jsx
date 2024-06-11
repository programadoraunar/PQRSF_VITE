import React, { useState } from 'react';
import {
	RiCloseLine,
	RiMenu3Line,
	RiQuestionAnswerFill,
	RiQuestionMark,
	RiLogoutCircleLine,
	RiHome2Line,
	RiLineChartLine
} from '@remixicon/react';
import { Link } from 'react-router-dom';
import UseProfile from '../../hooks/UseProfile';
import useObtenerNombre from '../../utils/useObtenerNombre';
function SliderBar() {
	const [showMenu, setShowMenu] = useState(false);

	const userProfile = UseProfile();
	const { obtenerNombreRole } = useObtenerNombre();

	const renderAdminMenu = () => (
		<ul>
			<li>
				<Link
					to='/AdminProfile'
					className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-sm xl:text-lg'
				>
					<RiHome2Line className='text-yellowBase' /> Inicio
				</Link>
			</li>
			<li>
				<Link
					to='/AdminProfile/SolicitudesAnonimas'
					className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-sm xl:text-lg'
				>
					<RiQuestionMark className='text-yellowBase' /> Solicitudes Anonimas
				</Link>
			</li>
			<li>
				<Link
					to='/AdminProfile/SolicitudesNormales'
					className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-sm xl:text-lg'
				>
					<RiQuestionAnswerFill className='text-yellowBase' /> Solicitudes
					Normales
				</Link>
			</li>
			<li>
				<Link
					to='/AdminProfile/Informes'
					className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-sm xl:text-lg'
				>
					<RiLineChartLine className='text-yellowBase' /> Informes
				</Link>
			</li>
		</ul>
	);
	const renderDependenciaMenu = () => (
		<ul>
			<li>
				<Link
					to='/AdminDependencia'
					className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-sm xl:text-lg'
				>
					<RiHome2Line className='text-yellowBase' /> Inicio
				</Link>
			</li>
			<li>
				<Link
					to='/AdminDependencia/SolicitudesAnonimasDependencia'
					className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-sm xl:text-lg'
				>
					<RiQuestionMark className='text-yellowBase' /> Solicitudes Anonimas
				</Link>
			</li>
			<li>
				<Link
					to='/AdminProfile/SolicitudesNormales'
					className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-sm xl:text-lg'
				>
					<RiQuestionAnswerFill className='text-yellowBase' /> Solicitudes
					Normales
				</Link>
			</li>
		</ul>
	);

	return (
		<>
			<div
				className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-blue-zodiac-950 p-4 flex flex-col justify-between z-50 slider-bar-container ${
					showMenu ? 'left-0' : '-left-full'
				} transition-all`}
			>
				<div>
					<div className='flex justify-center py-7'>
						<img
							src='/logo-autonoma-de-narino.png'
							alt='Logo autónoma'
							className='max-w-full h-auto w-[150px]'
						/>
					</div>
					<div className='flex justify-center'>
						<span className='text-base gap-4 py-2 px-4 lg:text-sm text-blue-zodiac-50'>
							{' — '}
							{userProfile ? obtenerNombreRole(userProfile.role) : 'Sin Datos'}
							{' — '}
						</span>
					</div>

					{userProfile && userProfile.role === 1
						? renderAdminMenu()
						: renderDependenciaMenu()}
				</div>

				<nav>
					<Link
						to='/'
						className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-950 transition-colors lg:text-sm xl:text-lg'
					>
						<RiLogoutCircleLine className='text-yellowBase' /> Cerrar sesión
					</Link>
				</nav>
			</div>
			<button
				onClick={() => setShowMenu(!showMenu)}
				className='xl:hidden fixed bottom-4 right-4 bg-yellowBase text-blue-zodiac-950 p-3 rounded-full z-50'
			>
				{showMenu ? <RiCloseLine /> : <RiMenu3Line />}
			</button>
		</>
	);
}

export default SliderBar;
