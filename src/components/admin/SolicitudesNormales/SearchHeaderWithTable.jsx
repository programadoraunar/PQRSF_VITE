import React from 'react';

import Tabla from '../Tabla';
import Formulario from '../Formulario';

function SearchHeaderWithTable() {
	return (
		<div className='text-black'>
			<div className='flex flex-col md:flex-row w-auto bg-blue-zodiac-950 py-3 px-4 mt-7 justify-between'>
				gola
			</div>
			<Tabla />

			<Formulario />
		</div>
	);
}

export default SearchHeaderWithTable;
