import { Chart } from 'chart.js';
import React, { useEffect } from 'react';

function GraficoTotalPorTipoPqrsf({ data }) {
	useEffect(() => {
		const ctx = document.getElementById('graficoTotalPQRSF').getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'doughnut',
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
				scales: {
					y: {
						beginAtZero: true,
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

export default GraficoTotalPorTipoPqrsf;
