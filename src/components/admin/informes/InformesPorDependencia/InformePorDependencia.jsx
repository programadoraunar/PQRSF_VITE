import React, { useState } from 'react';
import { obtenerInformeDependencias } from '../../../../supabase/actions/getInformesFuntions';
import GraficoPqrsfporDependencia from './totalPqrsfPorDependencia/GraficoPqrsfporDependencia';
import GraficoTiempoPromedio from './tiempoPromedioRespuesta/GraficoTiempoPromedio';
import TablaTiempoPromedioRespuesta from './tiempoPromedioRespuesta/TablaTiempoPromedioRespuesta';
import GraficoEstadoPorDependencia from './estadosPorDependencia/GraficoEstadoPorDependencia';
import TablaEstadoPorDependencia from './estadosPorDependencia/TablaEstadoPorDependencia';
import Loading from '../../../ui/Loading';
function InformePorDependencia() {
	const [tipoGrafico, setTipoGrafico] = useState(null);
	const [dataInforme, setDataInforme] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async tipo => {
		setLoading(true);
		setError(null);
		try {
			const response = await obtenerInformeDependencias(tipo);
			setDataInforme(response[0]);
		} catch (error) {
			setError('Error al obtener los datos. Inténtelo nuevamente.');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleGenerarGrafico = tipo => {
		if (tipo !== tipoGrafico) {
			setTipoGrafico(tipo);
			fetchData(tipo);
		}
	};

	const renderContent = () => {
		if (loading) {
			return <Loading />;
		}
		if (error) {
			return <p>{error}</p>;
		}
		if (tipoGrafico === 'pqrsf_por_dependencia') {
			return <GraficoPqrsfporDependencia data={dataInforme} />;
		}
		if (tipoGrafico === 'tiempo_promedio_respuesta') {
			return (
				<>
					<div className='p-3'>
						<p>
							Este informe presenta un análisis detallado de las PQRSF
							(Peticiones, Quejas, Reclamos y Sugerencias) gestionadas por cada
							dependencia de nuestra organización. Se han generado dos tipos de
							visualizaciones para proporcionar una visión integral de estos
							datos:
						</p>
						<ul>
							<li>
								<h2 className='font-gothicBold'>
									1. Gráfico de Tiempo Promedio de Respuesta y PQRSF Sin
									Respuesta:
								</h2>
								<p>
									El gráfico de barras representa el tiempo promedio de
									respuesta en días para cada dependencia donde se han
									gestionado PQRSF. Cada barra muestra también la cantidad de
									PQRSF que aún están sin respuesta en cada dependencia. La
									escala izquierda del gráfico muestra la cantidad de PQRSF sin
									respuesta, mientras que la escala derecha muestra el tiempo
									promedio de respuesta en días.
								</p>
							</li>
							<li>
								<h2 className='font-gothicBold'>
									2. Tabla Detallada de Tiempo Promedio de Respuesta:
								</h2>
								<p>
									La tabla proporciona una visión detallada de los datos
									presentados en el gráfico. Muestra el nombre de cada
									dependencia, la cantidad de PQRSF que aún están sin respuesta
									y el tiempo promedio de respuesta en días, cuando está
									disponible.
								</p>
							</li>
						</ul>
					</div>
					<div className='w-full lg:w-3/5'>
						<GraficoTiempoPromedio data={dataInforme} />
						<TablaTiempoPromedioRespuesta data={dataInforme} />
					</div>
				</>
			);
		}
		if (tipoGrafico === 'estado_por_dependencia') {
			return (
				<>
					<div className='p-3'>
						<p>
							Estamos presentando un análisis detallado del estado de las PQRSF
							(Peticiones, Quejas, Reclamos y Sugerencias) en nuestras
							dependencias:
						</p>
						<ul>
							<li>
								<h2 className='font-gothicBold'>1. Gráfico;</h2>
								<p>
									Muestra la distribución de PQRSF por estado (Registradas,
									Asignadas, Respondidas) en cada dependencia.
								</p>
							</li>
							<li>
								<h2 className='font-gothicBold'>2. Tabla:</h2>
								<p>
									Detalla el número de PQRSF según su estado para cada
									dependencia específica.
								</p>
							</li>
						</ul>
					</div>
					<div className='w-full lg:w-3/5'>
						<GraficoEstadoPorDependencia data={dataInforme} />
						<TablaEstadoPorDependencia data={dataInforme} />
					</div>
				</>
			);
		}
		return null;
	};

	return (
		<div className='bg-white p-5'>
			<h1>Informes Por Dependencia</h1>
			<div className='flex flex-col gap-3'>
				<button
					className='btn w-full lg:w-1/2 bg-yellowBase text-blue-zodiac-950 hover:bg-[#dcb716]'
					onClick={() => handleGenerarGrafico('pqrsf_por_dependencia')}
				>
					Generar Total de PQRSF por Dependencias
				</button>
				<button
					className='btn w-full lg:w-1/2 bg-yellowBase text-blue-zodiac-950 hover:bg-[#dcb716]'
					onClick={() => handleGenerarGrafico('tiempo_promedio_respuesta')}
				>
					Tiempo Promedio de Respuesta
				</button>
				<button
					className='btn w-full lg:w-1/2 bg-yellowBase text-blue-zodiac-950 hover:bg-[#dcb716]'
					onClick={() => handleGenerarGrafico('estado_por_dependencia')}
				>
					Total de PQRSF por dependencia según su Estado
				</button>
				<div className='w-'>{renderContent()}</div>
			</div>
		</div>
	);
}

export default InformePorDependencia;
