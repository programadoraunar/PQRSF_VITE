import React, { useState } from 'react';
import SearchHeaderWithTable from '../../components/admin/SolicitudesNormales/SearchHeaderWithTable';
import Tabla from '../../components/admin/SolicitudesNormales/Tabla';
function SolicitudesNormales() {
	const [datosSolicitudes, setDatosSolicitudes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	return (
		<div>
			<h1 className='text-gray-700 font-gothicBold text-2xl lg:text-3xl text-center py-9'>
				Consultar Solicitudes Normales
			</h1>
			<SearchHeaderWithTable
				setDatosSolicitudes={setDatosSolicitudes}
				setIsLoading={setIsLoading}
			/>
			<Tabla
				datosSolicitudes={datosSolicitudes}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
		</div>
	);
}

export default SolicitudesNormales;
