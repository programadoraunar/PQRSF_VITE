import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDetallesPqrsfDependencia } from '../../supabase/actions/getPqrsfFuntionsDepen';

function SolicitudDetailsDependencia() {
	const { id } = useParams();
	useEffect(() => {
		async function fetchData() {
			try {
				const nuevosDatos = await obtenerDetallesPqrsfDependencia(id);
				console.log(nuevosDatos);
			} catch (error) {
				console.error(
					'Error al obtener los últimos 7 registros:',
					error.message,
				);
			}
		}
		fetchData();
	}, []);
	return <div>SolicitudDetailsDependencia</div>;
}

export default SolicitudDetailsDependencia;
