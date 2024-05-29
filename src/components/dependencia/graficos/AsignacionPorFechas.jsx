import React, { useEffect, useRef, useState } from 'react';
import UseProfile from '../../../hooks/UseProfile';
import { obtenerPqrsfPorFechaGrafica } from '../../../supabase/actions/getGraphicsPqrsf';
import Chart from 'chart.js/auto';
import Loading from '../../ui/Loading';
function AsignacionPorFechas() {
	const userProfile = UseProfile();
	const chartRef = useRef(null); // Referencia al gráfico
	const [loading, setLoading] = useState(); // Estado de carga

	useEffect(() => {
		if (userProfile && userProfile.idDependencia) {
			// Realizar la petición con userProfile.idDependencia
			const fetchData = async () => {
				setLoading(true);
				try {
					const response = await obtenerPqrsfPorFechaGrafica(
						userProfile.idDependencia,
					);
					console.log(response.data);
					setLoading(false);
					// Llamar a la función para generar el gráfico
					generarGrafico(response.data);
				} catch (err) {
					console.error('Error fetching dependencia data:', err);
				}
			};

			fetchData();
		}
	}, [userProfile]);

	// Función para generar el gráfico
	const generarGrafico = data => {
		const fechas = data.map(item => item.fecha_asignacion);
		const cantidades = data.map(item => item.numero_pqrsf_asignadas);

		// Destruir el gráfico anterior si existe
		if (chartRef.current !== null) {
			chartRef.current.destroy();
		}

		const canvas = document.getElementById('myChart');
		if (canvas) {
			const ctx = canvas.getContext('2d');
			chartRef.current = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: fechas,
					datasets: [
						{
							label: 'PQRSF asignadas',
							data: cantidades,
							backgroundColor: 'rgba(245, 200, 39, 0.72)',
							borderColor: 'rgba(245, 226, 39, 0.72)',
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						y: {
							max: 5,
						},
					},
				},
			});
		}
	};

	if (!userProfile || loading) {
		return <Loading />; // Mostrar algo mientras se carga el perfil del usuario
	}

	return (
		<div className='bg-white w-[500px]'>
			<canvas id='myChart' width='400' height='400'></canvas>
		</div>
	);
}

export default AsignacionPorFechas;
