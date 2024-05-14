import React from 'react';
import Tabla from '../../components/admin/Tabla';
import SearchHeaderWithTable from '../../components/admin/SolicitudesNormales/SearchHeaderWithTable';

function SolicitudesNormales() {
	return (
		<div>
			<h1 className='text-gray-700 font-bold text-2xl lg:text-3xl text-center'>
				Consultar Solicitudes Normales
			</h1>
			<SearchHeaderWithTable />
		</div>
	);
}

export default SolicitudesNormales;
