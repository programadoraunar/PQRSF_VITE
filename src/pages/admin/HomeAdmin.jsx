import React, { useEffect, useState } from 'react';
import CardInfo from '../../components/admin/CardInfo';
import Tabla from '../../components/admin/Profile/Tabla';
import {
	countPqrsfByStatus,
	obtenerNumeroRegistros,
} from '../../supabase/actions/pqrsfFunctions';
function HomeAdmin() {
	const [dataConsulta, setDataConsulta] = useState();
	const [pqrsfCounts, setPqrsfCounts] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const datos = await obtenerNumeroRegistros();
				setDataConsulta(datos);
				// Obtener los conteos de PQRSF por estado
				const { data: counts, error } = await countPqrsfByStatus();
				if (error) {
					console.error('Error fetching PQRSF counts:', error.message);
				} else {
					setPqrsfCounts(counts[0]);
				}
			} catch (error) {
				console.error(
					'Error al obtener los últimos 7 registros:',
					error.message,
				);
			} finally {
				setIsLoading(false); // Establecer isLoading como falso una vez que se obtengan los datos o haya ocurrido un error
			}
		}
		fetchData();
	}, []);
	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				{isLoading ? (
					<div>Cargando...</div> // Mostrar un mensaje de carga mientras isLoading es true
				) : (
					<>
						<CardInfo solicitud={'total'} totalSolicitudes={dataConsulta} />
						{pqrsfCounts && (
							<>
								<CardInfo
									solicitud={'register'}
									totalSolicitudes={pqrsfCounts.total_registrado}
								/>
								<CardInfo
									solicitud={'close'}
									totalSolicitudes={pqrsfCounts.total_cerrado}
								/>
								<CardInfo
									solicitud={'inProcess'}
									totalSolicitudes={pqrsfCounts.total_en_proceso}
								/>
							</>
						)}
					</>
				)}
			</div>
			{/* tabla ultimas solicitudes */}
			<h2 className='text-black font-gothicBold text-2xl py-8'>
				Ultimas Solicitudes
			</h2>
			<Tabla />
		</div>
	);
}

export default HomeAdmin;
