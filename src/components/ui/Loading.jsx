import React from 'react';

function Loading() {
	return (
		<div>
			<div className='relative flex justify-center items-center py-28'>
				<div className='absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-zodiac-900'></div>
				<img
					src='/logo-autonoma-de-narino.png'
					className='rounded-full'
					width={100}
					height={30}
					alt='avatar'
				/>
			</div>
		</div>
	);
}

export default Loading;
