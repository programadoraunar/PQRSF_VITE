import React from 'react';
import CardInfo from '../../components/dependencia/CardInfo';
import AsignacionPorFechas from '../../components/dependencia/graficos/AsignacionPorFechas';
import Tabla from '../../components/dependencia/graficos/ui/Tabla';
import UseProfile from '../../hooks/UseProfile';
function HomeAdminDependencia() {
	const userProfile = UseProfile();
	return (
		<>
			{userProfile && userProfile.idDependencia && (
				<>
					<div className='text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
						<CardInfo solicitud={'Asignadas'} totalSolicitudes={15} />
						<CardInfo solicitud={'total'} totalSolicitudes={15} />
						<CardInfo solicitud={'Cerradas'} totalSolicitudes={0} />
					</div>
					<div className='text-black my-10'>
						<h2 className='text-center text-3xl my-3 font-gothicBold'>
							Solicitudes Por Responder
						</h2>
						<Tabla idDependencia={userProfile.idDependencia} />
					</div>
					<div className='flex justify-around'>
						<AsignacionPorFechas />

						<p>parrafo</p>
					</div>
				</>
			)}
		</>
	);
}

export default HomeAdminDependencia;
