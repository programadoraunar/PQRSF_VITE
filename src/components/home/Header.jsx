import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
	return (
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
	);
}

export default Header;
