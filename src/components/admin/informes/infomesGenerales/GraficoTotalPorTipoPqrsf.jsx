import { Chart } from 'chart.js';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function GraficoTotalPorTipoPqrsf({ data }) {
	useEffect(() => {
		const ctx = document.getElementById('graficoTotalPQRSF').getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'doughnut', // Utiliza 'doughnut' para un gráfico circular
			data: {
				labels: ['Anónimas', 'Normales'],
				datasets: [
					{
						label: 'Cantidad',
						data: [data.anonymas, data.normales],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)', // Color para "anónimas"
							'rgba(54, 162, 235, 0.2)', // Color para "normales"
						],
						borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
						borderWidth: 1,
					},
				],
			},
			options: {
				plugins: {
					legend: {
						position: 'right', // Posición de la leyenda
						labels: {
							generateLabels: function (chart) {
								const data = chart.data;
								if (data.labels.length && data.datasets.length) {
									return data.labels.map((label, i) => {
										const meta = chart.getDatasetMeta(0);
										const ds = data.datasets[0];
										const total = ds.data[i];
										return {
											text: `${label}: ${total}`, // Agrega el total al label
											fillStyle: ds.backgroundColor[i],
											hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
											index: i,
										};
									});
								}
								return [];
							},
						},
					},
				},
			},
		});

		// Limpiar el gráfico al desmontar el componente para evitar fugas de memoria
		return () => {
			myChart.destroy();
		};
	}, [data]);
	return <canvas id='graficoTotalPQRSF' width='400' height='400'></canvas>;
}
GraficoTotalPorTipoPqrsf.propTypes = {
	data: PropTypes.shape({
		anonymas: PropTypes.number.isRequired,
		normales: PropTypes.number.isRequired,
		labels: PropTypes.arrayOf(PropTypes.string).isRequired,
		datasets: PropTypes.arrayOf(
			PropTypes.shape({
				data: PropTypes.arrayOf(PropTypes.number).isRequired,
				backgroundColor: PropTypes.arrayOf(PropTypes.string).isRequired,
			}),
		).isRequired,
	}).isRequired,
};
export default GraficoTotalPorTipoPqrsf;
