import React from 'react';
import Tabla from '../../components/admin/Tabla';
import SearchHeader from '../../components/admin/SolicitudesNormales/SearchHeader';

function SolicitudesAnonimas() {
	return (
		<div>
			<h1 className='text-gray-700 font-bold text-xl md:text-2xl lg:text-3xl text-center'>
				Consultar Solicitudes Anonimas
			</h1>
			<SearchHeader />
			<Tabla />
		</div>
	);
}

export default SolicitudesAnonimas;
