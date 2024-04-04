import React from 'react';
import {
	RiLogoutCircleLine,
	RiSettings3Line,
	RiNotification3Line,
	RiArrowDownSLine,
} from '@remixicon/react';

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../supabase/actions/auth';
import UseProfile from '../../hooks/UseProfile';
function Header() {
	const userProfile = UseProfile();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await signOut(); // Llama a la función para cerrar sesión
			// Aquí puedes redirigir al usuario a la página de inicio o realizar cualquier otra acción después de cerrar sesión
			navigate('/');
		} catch (error) {
			console.error('Error al cerrar sesión:', error.message);
			// Puedes mostrar un mensaje de error al usuario si el cierre de sesión falla
		}
	};

	return (
		<header className='h-[7vh] md:h-[10vh] border-b border-blue-zodiac-950 p-8 flex items-center justify-end bg-blue-zodiac-900'>
			<nav className='flex items-center gap-2'>
				<Menu
					menuButton={
						<MenuButton className='relative hover:bg-blue-zodiac-950 p-2 rounded-lg transition-colors'>
							<RiNotification3Line
								className='hover:text-blue-zodiac-100'
								size={30}
							/>
							<span className='absolute -top-0.5 right-0 bg-blue-zodiac-700 py-0.5 px-[5px] box-content text-blue-zodiac-50 rounded-full text-[13px] font-bold'>
								2
							</span>
						</MenuButton>
					}
					align='end'
					transition
					menuClassName='bg-blue-zodiac-900 p-4'
				>
					<h1 className='text-blue-zodiac-100 text-xl text-center font-medium lg:text-2xl'>
						Notificaciones (1)
					</h1>
					<hr className='my-6 border-red-50' />
					<MenuItem className='p-0 hover:bg-transparent'>
						<Link
							to='/'
							className='text-blue-zodiac-100 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-blue-zodiac-950 transition-colors rounded-lg'
						>
							<img
								src='https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg'
								className='w-8 h-8 object-cover rounded-full'
							/>
							<div className='text-base flex flex-col'>
								<div className='flex items-center justify-between gap-4'>
									<span className='text-lg'>Jorge Luis Trejo</span>{' '}
									<span className='text-lg'>21/10/2022</span>
								</div>
								<p className='text-blue-zodiac-100 text-xs lg:text-lg'>
									Lorem ipsum dolor sit amet...
								</p>
							</div>
						</Link>
					</MenuItem>
					<hr className='my-6 border-blue-zodiac-50' />
					<MenuItem className='p-0 hover:bg-transparent flex justify-center cursor-default'>
						<Link
							to='/'
							className='text-blue-zodiac-200 text-sm lg:text-lg hover:text-white transition-colors'
						>
							Todas las notificaciones
						</Link>
					</MenuItem>
				</Menu>
				<Menu
					menuButton={
						<MenuButton className='flex items-center gap-x-2 hover:bg-blue-zodiac-950 p-2 rounded-lg transition-colors'>
							<img
								src='https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg'
								className='w-7 h-7 object-cover rounded-full'
							/>
							<span className='text-md lg:text-2xl'>Adminstrador</span>
							<RiArrowDownSLine />
						</MenuButton>
					}
					align='end'
					transition
					menuClassName='bg-blue-zodiac-900 p-4'
				>
					<MenuItem className='p-0 hover:bg-transparent'>
						<Link
							to='/perfil'
							className='rounded-lg transition-colors text-gray-300 hover:bg-blue-zodiac-950 flex items-center gap-x-4 py-2 px-6 flex-1'
						>
							<img
								src='https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg'
								className='w-8 h-8 object-cover rounded-full'
							/>
							<div className='flex flex-col text-xl'>
								<span className='text-xl lg:text-2xl text-blue-zodiac-50'>
									{userProfile ? userProfile.username : 'Sin Datos'}
								</span>
								<span className='text-xs lg:text-base text-blue-zodiac-50'>
									{userProfile ? userProfile.email : 'Sin Datos'}
								</span>
							</div>
						</Link>
					</MenuItem>
					<hr className='my-6 border-blue-zodiac-50' />
					<MenuItem className='p-0 hover:bg-transparent'>
						<Link
							to='/configuracion'
							className='rounded-lg transition-colors text-blue-zodiac-50 hover:bg-blue-zodiac-950 flex items-center gap-x-4 py-2 px-6 flex-1'
						>
							<RiSettings3Line />
							<span className='text-lg'>Configuración</span>
						</Link>
					</MenuItem>
					<MenuItem className='p-0 hover:bg-transparent'>
						<button
							onClick={handleLogout}
							className='rounded-lg transition-colors text-blue-zodiac-50 hover:bg-blue-zodiac-950 flex items-center gap-x-4 py-2 px-6 flex-1'
						>
							<RiLogoutCircleLine />
							<span className='text-lg'>Cerrar sesión</span>
						</button>
					</MenuItem>
				</Menu>
			</nav>
		</header>
	);
}

export default Header;
