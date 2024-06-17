import React, { useEffect } from 'react';
import useObtenerNombre from '../../../../../utils/useObtenerNombre';
import { Chart } from 'chart.js';
import PropTypes from 'prop-types';

function GraficoTiempoPromedio({ data }) {
	const { obtenerNombreDependencia } = useObtenerNombre();
	console.log(data);
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
		const ctx = document
			.getElementById('graficoTiempoPromedio')
			.getContext('2d');
		myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: data.resultado.map(item =>
					obtenerNombreDependencia(item.dependencia),
				),
				datasets: [
					{
						label: 'Cantidad De PQRSF Sin Respuesta',
						data: data.resultado.map(item => item.sin_respuesta),
						backgroundColor: 'rgba(255, 99, 132, 0.6)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
						yAxisID: 'y-sin-respuesta',
					},
					{
						label: 'Tiempo Promedio de Respuesta (días)',
						data: data.resultado.map(item =>
							item.tiempo_promedio_respuesta
								? parseFloat(item.tiempo_promedio_respuesta)
								: 0,
						),
						backgroundColor: 'rgba(54, 162, 235, 0.6)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						yAxisID: 'y-tiempo-promedio',
					},
				],
			},
			options: {
				scales: {
					'y-sin-respuesta': {
						beginAtZero: true,
						position: 'left',
						title: {
							display: true,
							text: 'Cantidad Sin Respuesta',
						},
					},
					'y-tiempo-promedio': {
						beginAtZero: true,
						position: 'right',
						title: {
							display: true,
							text: 'Tiempo Promedio de Respuesta (días)',
						},
					},
				},
			},
		});
		return () => {
			if (myChart) {
				myChart.destroy();
			}
		};
	}, [data]);
	return <canvas id='graficoTiempoPromedio' width='500' height='400'></canvas>;
}
GraficoTiempoPromedio.propTypes = {
	data: PropTypes.shape({
		resultado: PropTypes.arrayOf(
			PropTypes.shape({
				dependencia: PropTypes.number.isRequired,
				sin_respuesta: PropTypes.number.isRequired,
				tiempo_promedio_respuesta: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number,
					PropTypes.oneOf([null]),
				]).isRequired,
			}),
		).isRequired,
	}).isRequired,
};
export default GraficoTiempoPromedio;
