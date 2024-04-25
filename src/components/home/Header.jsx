import React from 'react';
function Header() {
	return (
		<div className='bg-blue-zodiac-950 flex flex-col lg:flex-row justify-around items-center fixed w-full top-0 z-30'>
			<div className='flex items-center justify-center '>
				<img src='/SistemaP.png' alt='logoSistemas' width={200} />
			</div>
			<div className='absolute bottom-[-50px] left-1/2 transform -translate-x-1/2'>
				<img src='/logo-autonoma-de-narino.svg ' width={70} />
			</div>
			<div className='hidden lg:visible'>
				<img src='/logo_aunar2.svg' width={500} />
			</div>
		</div>
	);
}

export default Header;
