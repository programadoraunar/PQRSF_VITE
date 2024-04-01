import React from 'react';
import { RiLogoutCircleLine } from '@remixicon/react';

function Header() {
	return (
		<div className='bg-[#00509A] text-textBlank'>
			<div className='flex justify-end py-7 px-5'>
				<form action=''>
					<button type='submit' className='text-lg flex items-center gap-5'>
						<RiLogoutCircleLine
							size={30} // set custom `width` and `height`
							color='white' // set `fill` color
							className='my-icon' // add custom class name
						/>
						Cerrar Session
					</button>
				</form>
			</div>
		</div>
	);
}

export default Header;
