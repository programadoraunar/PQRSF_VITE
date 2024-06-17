import React from 'react';
import ExpandingButton from '../../components/home/ui/ExpandingButton';
import InformeGeneral from '../../components/admin/informes/infomesGenerales/InformeGeneral';
import InformePorDependencia from '../../components/admin/informes/InformesPorDependencia/InformePorDependencia';
function Informes() {
	return (
		<div className='text-black'>
			<h1 className='text-2xl font-gothicBold text-gray-700 pb-5'>Informes</h1>
			<p>
				Bienvenido. A continuación, encontrarás diferentes opciones para generar
				informes sobre el sistema PQRSF.
			</p>
			<div className='flex flex-col justify-center gap-3 py-5'>
				<ExpandingButton
					buttonText='Informes Generales'
					expandedContent={<InformeGeneral />}
				/>
				<ExpandingButton
					buttonText='Informe por Dependencia'
					expandedContent={<InformePorDependencia />}
				/>
			</div>
		</div>
	);
}

export default Informes;
