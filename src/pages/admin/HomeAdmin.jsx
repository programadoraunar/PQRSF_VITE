import React, { useEffect, useState } from 'react';
import CardInfo from '../../components/admin/CardInfo';
import Tabla from '../../components/admin/Profile/Tabla';
import { obtenerNumeroRegistros } from '../../supabase/actions/pqrsfFunctions';
function HomeAdmin() {
	const [dataConsulta, setDataConsulta] = useState();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const datos = await obtenerNumeroRegistros();
				console.log('Datos de los últimos 7 registros:', datos);
				setDataConsulta(datos);
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
						<CardInfo
							solicitud='total'
							totalSolicitudes={dataConsulta}
							text='Total de Solicitudes PQRSF Registradas'
						/>
						<CardInfo
							solicitud='close'
							totalSolicitudes={100}
							text='Total de Solicitudes PQRSF Cerradas'
						/>
					</>
				)}
			</div>
			{/* tabla de prueba */}
			<Tabla />
		</div>
	);
}

export default HomeAdmin;
