import React from 'react';
import CardInfo from '../../components/admin/CardInfo';
import Tabla from '../../components/admin/Profile/Tabla';
function HomeAdmin() {
	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				<CardInfo
					solicitud='total'
					totalSolicitudes={25}
					text='Total de Solicitudes PQRSF Registradas'
				/>
				<CardInfo
					solicitud='close'
					totalSolicitudes={100}
					text='Total de Solicitudes PQRSF Cerradas'
				/>
			</div>
			{/* tabla de prueba */}
			<Tabla />
		</div>
	);
}

export default HomeAdmin;
