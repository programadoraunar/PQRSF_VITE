import { Chart } from 'chart.js';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
let myChart;

function GraficoDistribucionCategoriaPqrsf({ data }) {
	useEffect(() => {
		if (!Array.isArray(data) || data.length === 0) {
			// Si los datos no son un array o están vacíos, no hacemos nada
			return;
		}

		if (myChart) {
			myChart.destroy();
		}

		const ctx = document
			.getElementById('graficoCategoriaTotalPqrsf')
			.getContext('2d');
		const colores = [
			'rgba(75,192,192,1)',
			'rgba(255,99,132,1)',
			'rgba(54,162,235,1)',
			'rgba(255,206,86,1)',
			'rgba(153,102,255,1)',
		];

		myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: data.map(item => item.tipo),
				datasets: [
					{
						label: 'Cantidad',
						data: data.map(item => item.cantidad),
						backgroundColor: colores,
						borderColor: 'rgba(0,0,0,1)',
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
	}, [data]);

	return <canvas id='graficoCategoriaTotalPqrsf' width='400' height='400' />;
}
GraficoDistribucionCategoriaPqrsf.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			tipo: PropTypes.string.isRequired,
			cantidad: PropTypes.number.isRequired,
		}),
	).isRequired,
};

export default GraficoDistribucionCategoriaPqrsf;
