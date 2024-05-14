import React, { useState } from 'react';
import SearchHeaderWithTable from '../../components/admin/SolicitudesAnonimas/SearchHeaderWithTable';
import Tabla from '../../components/admin/SolicitudesAnonimas/Tabla';

function SolicitudesAnonimas() {
	const [datosSolicitudes, setDatosSolicitudes] = useState([]);
	return (
		<div>
			<h1 className='text-gray-700 font-gothicBold text-2xl lg:text-3xl text-center py-9'>
				Consultar Solicitudes Anonimas
			</h1>
			<div className=''>
				<SearchHeaderWithTable setDatosSolicitudes={setDatosSolicitudes} />
				<Tabla datosSolicitudes={datosSolicitudes} />
			</div>
		</div>
	);
}

export default SolicitudesAnonimas;
