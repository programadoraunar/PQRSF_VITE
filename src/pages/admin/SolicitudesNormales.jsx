import React, { useState } from 'react';
import SearchHeaderWithTable from '../../components/admin/SolicitudesNormales/SearchHeaderWithTable';

function SolicitudesNormales() {
	const [datosSolicitudes, setDatosSolicitudes] = useState([]);
	console.log(datosSolicitudes);
	return (
		<div>
			<h1 className='text-gray-700 font-bold text-2xl lg:text-3xl text-center'>
				Consultar Solicitudes Normales
			</h1>
			<SearchHeaderWithTable setDatosSolicitudes={setDatosSolicitudes} />
		</div>
	);
}

export default SolicitudesNormales;
