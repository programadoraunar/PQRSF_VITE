import React, { useEffect, useState } from 'react';
import { RiFlag2Line } from '@remixicon/react';
import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from '@tremor/react';
import { obtenerUltimos7Registros } from '../../../supabase/actions/pqrsfFunctions';
import Loading from '../../ui/Loading';
import { optionsDependencias } from '../../../utils/options';

function Tabla() {
	const [datos, setDatos] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const datos = await obtenerUltimos7Registros();
				console.log('Datos de los últimos 7 registros:', datos);
				setDatos(datos);
			} catch (error) {
				console.error(
					'Error al obtener los últimos 7 registros:',
					error.message,
				);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	// Función para obtener el nombre de la dependencia basado en su ID
	const obtenerNombreDependencia = idDependencia => {
		const dependenciaEncontrada = optionsDependencias.find(
			dep => dep.id === idDependencia.toString(),
		);
		return dependenciaEncontrada
			? dependenciaEncontrada.nombre
			: 'Dependencia Desconocida';
	};

	return (
		<div className='py-8'>
			<Card style={{ backgroundColor: '#fff' }}>
				<h3 className='text-blue-zodiac-950 font-bold text-xl lg:text-3xl'>
					Ultimas Solicitudes
				</h3>
				<Table className='mt-5 tableMov'>
					<TableHead>
						<TableRow>
							<TableHeaderCell className='table-header-cell'>
								Tipo Solicitud
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Fecha de Llegada
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Dependencia
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Estado
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					{!isLoading && datos && datos.length > 0 && (
						<TableBody className='tableMov'>
							{datos.map((item, index) => (
								<TableRow
									key={item.id_pqrsf}
									style={{
										backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E2E4E7',
									}}
								>
									<TableCell className='lg:text-lg'>
										{item.tipo_solicitud_pqrs}
									</TableCell>
									<TableCell className='lg:text-lg'>
										{item.fecha_envio}
									</TableCell>
									<TableCell className='lg:text-lg'>
										{obtenerNombreDependencia(item.id_dependencia)}
									</TableCell>
									<TableCell>
										<Badge color='emerald' icon={RiFlag2Line}>
											{item.status}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
					{!datos ||
						(datos.length === 0 && (
							<p className='text-center font-gothicBold text-red-400'>
								No hay datos disponibles.
							</p>
						))}

					{isLoading && (
						<TableRow>
							<TableCell colSpan={4} className='text-center'>
								<Loading />
							</TableCell>
						</TableRow>
					)}
				</Table>
			</Card>
		</div>
	);
}

export default Tabla;
