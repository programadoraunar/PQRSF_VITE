import React, { useState } from 'react';
import { obtenerInformeGeneral } from '../../../../supabase/actions/getInformesFuntions';
import GraficoTotalPorTipoPqrsf from './GraficoTotalPorTipoPqrsf';
import TotalPqrsf from './TotalPqrsf';

function InformeGeneral() {
	const [totalData, setTotalData] = useState({ anonymas: 0, normales: 0 });
	const [tipoGrafico, setTipoGrafico] = useState(null);

	const fetchData = async tipo => {
		console.log(tipo);
		try {
			const response = await obtenerInformeGeneral(tipo);
			console.log(response);
			setTotalData(response[0].resultado);
		} catch (error) {
			console.error('Error al obtener los datos del informe:', error);
		}
	};

	const handleGenerarGrafico = tipo => {
		fetchData(tipo);
		setTipoGrafico(tipo);
	};

	return (
		<div>
			<h1 className='text-lg'>Informes Generales</h1>
			<p>
				Acontinuacion encotraras los garficos generales del sistema, estos
				incluyen el total de Pqrsf registradas, el total de las pqrsf por tipo
				(normal y anonima) y distribucion_tipo
			</p>
			<div className='flex flex-col w-1/2'>
				<button className='btn' onClick={() => handleGenerarGrafico('total')}>
					Generar Total de PQRSF
				</button>
				{tipoGrafico === 'total' && <TotalPqrsf data={totalData} />}
				<button
					className='btn'
					onClick={() => handleGenerarGrafico('tipo_pqrsf')}
				>
					Generar Gráfico de Total por Tipo de PQRSF
				</button>
				{tipoGrafico === 'tipo_pqrsf' && (
					<GraficoTotalPorTipoPqrsf data={totalData} />
				)}
			</div>
		</div>
	);
}

export default InformeGeneral;
