import React, { useState } from 'react';
import SearchHeaderWithTable from '../../components/admin/SolicitudesAnonimas/SearchHeaderWithTable';
import Tabla from '../../components/admin/SolicitudesAnonimas/Tabla';

/**
 * Componentes SolicitudesAnonimas para gestionar y mostrar solicitudes anónimas.
 *
 * @returns {JSX.Element} The rendered component.
 */
function SolicitudesAnonimas() {
	const [datosSolicitudes, setDatosSolicitudes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	return (
		<div>
			<h1 className='text-gray-700 font-gothicBold text-2xl lg:text-3xl text-center py-9'>
				Consultar Solicitudes Anonimas
			</h1>
			<div className=''>
				<SearchHeaderWithTable
					setDatosSolicitudes={setDatosSolicitudes}
					setIsLoading={setIsLoading}
				/>
				<Tabla datosSolicitudes={datosSolicitudes} isLoading={isLoading} />
			</div>
		</div>
	);
}

export default SolicitudesAnonimas;
