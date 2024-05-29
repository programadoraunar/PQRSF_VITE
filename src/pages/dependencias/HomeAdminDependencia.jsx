import React from 'react';
import CardInfo from '../../components/dependencia/CardInfo';
import AsignacionPorFechas from '../../components/dependencia/graficos/AsignacionPorFechas';

function HomeAdminDependencia() {
	return (
		<>
			<div className='text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				<CardInfo solicitud={'Asignadas'} totalSolicitudes={15} />
				<CardInfo solicitud={'total'} totalSolicitudes={15} />
				<CardInfo solicitud={'Cerradas'} totalSolicitudes={15} />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
				<AsignacionPorFechas />
				<p>parrafo</p>
			</div>
		</>
	);
}

export default HomeAdminDependencia;
