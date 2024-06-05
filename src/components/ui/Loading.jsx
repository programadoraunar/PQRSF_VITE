import React from 'react';
import PropTypes from 'prop-types';

function Loading({ loadingClassName }) {
	return (
		<div className={`${loadingClassName}`}>
			<div className='relative flex justify-center items-center py-28'>
				<div className='absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-zodiac-900'></div>
				<img
					src='/logo-autonoma-de-narino.png'
					className='rounded-full'
					width={110}
					height={30}
					alt='avatar'
				/>
			</div>
		</div>
	);
}
Loading.propTypes = {
	loadingClassName: PropTypes.string,
};

export default Loading;
