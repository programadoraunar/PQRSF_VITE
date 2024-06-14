import React, { useState } from 'react';
import { obtenerInformeDependencias } from '../../../supabase/actions/getInformesFuntions';
import GraficoPqrsfporDependencia from './InformesPorDependencia/GraficoPqrsfporDependencia';

function InformePorDependencia() {
	const [tipoGrafico, setTipoGrafico] = useState(null);
	const [dataInforme, setDataInforme] = useState([]);

	const fetchData = async tipo => {
		try {
			const response = await obtenerInformeDependencias(tipo);
			setDataInforme(response[0]);
		} catch (error) {
			console.log(error);
		}
	};
	const handleGenerarGrafico = tipo => {
		fetchData(tipo);
		setTipoGrafico(tipo);
	};
	return (
		<div className='bg-white p-5'>
			<h1>Informes Por Dependencia</h1>
			<div className='flex flex-col gap-3'>
				<button
					className='btn w-full lg:w-1/2 bg-yellowBase text-blue-zodiac-950 hover:bg-[#dcb716]'
					onClick={() => handleGenerarGrafico('pqrsf_por_dependencia')}
				>
					Generar Total de PQRSF por Depenencias
				</button>
				<div className='w-full lg:w-3/5'>
					{tipoGrafico === 'pqrsf_por_dependencia' && (
						<GraficoPqrsfporDependencia data={dataInforme} />
					)}
				</div>
			</div>
		</div>
	);
}

export default InformePorDependencia;
