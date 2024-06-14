import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'chart.js';
import useObtenerNombre from '../../../../utils/useObtenerNombre';
const GraficoPqrsfporDependencia = ({ data }) => {
	const { obtenerNombreDependencia } = useObtenerNombre(); // Asegúrate de usar la función correcta del hook personalizado
	let myChart = null; // Declaración de la variable del gráfico fuera del useEffect

	useEffect(() => {
		if (
			!data ||
			!Array.isArray(data.resultado) ||
			data.resultado.length === 0
		) {
			return; // No hacemos nada si no hay datos válidos
		}

		if (myChart) {
			myChart.destroy(); // Destruir el gráfico si ya existe
		}

		const ctx = document
			.getElementById('graficoTotalDependencias')
			.getContext('2d');
		myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: data.resultado.map(item =>
					obtenerNombreDependencia(item.dependencia),
				),
				datasets: [
					{
						label: 'Cantidad De PQRSF por Dependencias',
						data: data.resultado.map(item => item.total_pqrsf),
						backgroundColor: 'rgba(255, 206, 86, 0.6)',
						borderColor: 'rgba(0, 0, 0, 1)',
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
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
	}, [data, obtenerNombreDependencia]); // Dependencias del useEffect

	return (
		<canvas id='graficoTotalDependencias' width='600' height='600'></canvas>
	);
};

GraficoPqrsfporDependencia.propTypes = {
	data: PropTypes.shape({
		resultado: PropTypes.arrayOf(
			PropTypes.shape({
				dependencia: PropTypes.number.isRequired,
				total_pqrsf: PropTypes.number.isRequired,
			}),
		).isRequired,
	}).isRequired,
};
export default GraficoPqrsfporDependencia;
