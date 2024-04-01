import React, { useState } from 'react';

function SliderBar() {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<>
			<div
				className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0  p-4 flex flex-col justify-between z-50 ${
					showMenu ? 'left-0' : '-left-full'
				} transition-all`}
			>
				<div className='flex justify-center py-7'>
					<img
						src='/logo-autonoma-de-narino.webp'
						width={179.5}
						height={0}
						alt='Logo autónoma'
						style={{ width: '200px', height: 'auto' }}
					/>
				</div>
			</div>
		</>
	);
}

export default SliderBar;
