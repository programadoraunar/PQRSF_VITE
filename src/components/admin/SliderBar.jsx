import React, { useState } from 'react';
import {
	RiCloseLine,
	RiMenu3Line,
	RiQuestionAnswerFill,
	RiQuestionMark,
	RiLogoutCircleLine,
	RiHome2Line,
} from '@remixicon/react';
import { Link } from 'react-router-dom';
function SliderBar() {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<>
			<div
				className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-blue-zodiac-950 p-4 flex flex-col justify-between z-50 ${
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
					<ul>
						<li>
							<Link
								to='/AdminProfile'
								className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-xl'
							>
								<RiHome2Line className='text-blue-zodiac-400' /> Inicio
							</Link>
						</li>
						<li>
							<Link
								to='/AdminProfile/SolicitudesAnonimas'
								className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-xl'
							>
								<RiQuestionMark className='text-blue-zodiac-400' /> Solicitudes
								Anonimas
							</Link>
						</li>
						<li>
							<Link
								to='/AdminProfile/SolicitudesNormales'
								className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-zodiac-950 transition-colors lg:text-xl'
							>
								<RiQuestionAnswerFill className='text-blue-zodiac-400' />
								Solicitudes Normales
							</Link>
						</li>
					</ul>
				</div>
				<nav>
					<Link
						to='/'
						className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-950 transition-colors lg:text-xl'
					>
						<RiLogoutCircleLine className='text-blue-zodiac-400' /> Cerrar
						sesión
					</Link>
				</nav>
			</div>
			<button
				onClick={() => setShowMenu(!showMenu)}
				className='xl:hidden fixed bottom-4 right-4 bg-blue-zodiac-700 text-blue-zodiac-50 p-3 rounded-full z-50'
			>
				{showMenu ? <RiCloseLine /> : <RiMenu3Line />}
			</button>
		</>
	);
}

export default SliderBar;
