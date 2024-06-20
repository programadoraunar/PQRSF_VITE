import React, { useEffect, useState } from 'react';
import { obtenerPqrsPorDependencia } from '../../../../supabase/actions/getPqrsfFuntionsDepen';
import { useNavigate } from 'react-router-dom';
import { formatearFecha } from '../../../../utils/dateUtils';

function Tabla({ idDependencia }) {
	const navigate = useNavigate();
	const [datos, setDatos] = useState([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const nuevosDatos = await obtenerPqrsPorDependencia(idDependencia);
				setDatos(nuevosDatos.data);
			} catch (error) {
				console.error(
					'Error al obtener los últimos 7 registros:',
					error.message,
				);
			}
		}
		fetchData();
	}, []);

	return (
		<div className='overflow-x-auto '>
			<table className='table'>
				{/* Cabecera */}
				<thead>
					<tr className='bg-blue-zodiac-950 text-white text-base'>
						<th>Id Radicado</th>
						<th>Tipo de Solicitud</th>
						<th>Fecha de Asignación</th>
						<th>Descripción</th>
						<th>Categoría de Solicitud</th>
						<th>Detalles</th>
					</tr>
				</thead>
				<tbody className='bg-white'>
					{/* Filas */}
					{datos.map((item, index) => (
						<tr key={index} className=' hover:bg-blue-zodiac-100'>
							<td>{item.id_radicado}</td>
							<td>{item.tipo_solicitud_pqrs}</td>
							<td>{formatearFecha(item.fecha_asignacion)}</td>
							<td>{item.descripcion}</td>
							<td>{item.esanonima ? 'Anónima' : 'Normal'}</td>
							<td>
								<button
									className='btn'
									onClick={() =>
										navigate(
											`/AdminDependencia/solicitudDetailsDependencia/${item.id_radicado}`,
										)
									}
								>
									Detalles
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Tabla;
