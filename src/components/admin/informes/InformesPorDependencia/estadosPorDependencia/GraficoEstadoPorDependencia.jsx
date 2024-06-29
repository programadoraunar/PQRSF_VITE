import React, { useEffect } from 'react';
import useObtenerNombre from '../../../../../utils/useObtenerNombre';
import PropTypes from 'prop-types';
import { Chart } from 'chart.js';

function GraficoEstadoPorDependencia({ data }) {
	const { obtenerNombreDependencia, obtenerNombreEstado } = useObtenerNombre();
	let myChart = null;

	useEffect(() => {
		if (
			!data ||
			!Array.isArray(data.resultado) ||
			data.resultado.length === 0
		) {
			return;
		}

		if (myChart) {
			myChart.destroy();
		}

		// Agrupar los datos por dependencia
		const groupedData = data.resultado.reduce((acc, item) => {
			const dependencia = obtenerNombreDependencia(item.dependencia);
			if (!acc[dependencia]) {
				acc[dependencia] = { 1: 0, 2: 0, 3: 0 };
			}
			acc[dependencia][item.estado] += item.total_pqrsf;
			return acc;
		}, {});

		const labels = Object.keys(groupedData);
		const datasetRegistrada = labels.map(label => groupedData[label][1]);
		const datasetAsignada = labels.map(label => groupedData[label][2]);
		const datasetRespondida = labels.map(label => groupedData[label][3]);

		const ctx = document
			.getElementById('graficoEstadoPorDependencia')
			.getContext('2d');
		myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						// Estado Registrada
						label: obtenerNombreEstado(1),
						data: datasetRegistrada,
						backgroundColor: 'rgba(255, 99, 132, 0.6)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
					},
					{
						// Estado Asignada
						label: obtenerNombreEstado(2),
						data: datasetAsignada,
						backgroundColor: 'rgba(54, 162, 235, 0.6)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
					},
					{
						// Estado respondida
						label: obtenerNombreEstado(3),
						data: datasetRespondida,
						backgroundColor: 'rgba(75, 192, 192, 0.6)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Total PQRSF segun su Estado',
						},
					},
				},
			},
		});

		// Limpiar el gráfico al desmontar el componente
		return () => {
			if (myChart) {
				myChart.destroy();
			}
		};
	}, [data, obtenerNombreDependencia]);

	return (
		<canvas id='graficoEstadoPorDependencia' width='500' height='400'></canvas>
	);
}

GraficoEstadoPorDependencia.propTypes = {
	data: PropTypes.shape({
		resultado: PropTypes.arrayOf(
			PropTypes.shape({
				estado: PropTypes.number.isRequired,
				dependencia: PropTypes.number.isRequired,
				total_pqrsf: PropTypes.number.isRequired,
			}),
		).isRequired,
	}).isRequired,
};
export default GraficoEstadoPorDependencia;
