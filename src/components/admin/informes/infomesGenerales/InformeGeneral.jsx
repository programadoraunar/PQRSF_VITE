import React, { useState } from 'react';
import { obtenerInformeGeneral } from '../../../../supabase/actions/getInformesFuntions';
import GraficoTotalPorTipoPqrsf from './GraficoTotalPorTipoPqrsf';
import TotalPqrsf from './TotalPqrsf';
import GraficoDistribucionCategoriaPqrsf from './GraficoDistribucionCategoriaPqrsf';

function InformeGeneral() {
	const [totalData, setTotalData] = useState({ anonymas: 0, normales: 0 });
	const [tipoGrafico, setTipoGrafico] = useState(null);

	const fetchData = async tipo => {
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
		<div className='bg-white p-5'>
			<h1 className='text-lg'>Informes Generales</h1>
			<p>
				Acontinuacion encotraras los garficos generales del sistema, estos
				incluyen el total de Pqrsf registradas, el total de las pqrsf por tipo
				(normal y anonima) y distribucion_tipo
			</p>
			<div className='flex flex-col w-full lg:w-1/2 gap-3'>
				<button
					className='btn bg-yellowBase text-blue-zodiac-950 hover:bg-[#dcb716]'
					onClick={() => handleGenerarGrafico('total')}
				>
					Generar Total de PQRSF
				</button>
				{tipoGrafico === 'total' && <TotalPqrsf data={totalData} />}
				<button
					className='btn bg-yellowBase hover:bg-[#dcb716]'
					onClick={() => handleGenerarGrafico('tipo_pqrsf')}
				>
					Generar Gráfico de Total por categoria de PQRSF
				</button>
				{tipoGrafico === 'tipo_pqrsf' && (
					<GraficoTotalPorTipoPqrsf data={totalData} />
				)}
				<button
					className='btn bg-yellowBase hover:bg-[#dcb716]'
					onClick={() => handleGenerarGrafico('distribucion_tipo')}
				>
					Generar Gráfico segun el Total por tipo PQRSF
				</button>
				{tipoGrafico === 'distribucion_tipo' && (
					<GraficoDistribucionCategoriaPqrsf data={totalData} />
				)}
			</div>
		</div>
	);
}

export default InformeGeneral;
