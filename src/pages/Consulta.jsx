import React, { useState } from 'react';
import Footer from '../components/home/Footer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { radicadoSchema } from '../validations/consultaSchema';
import { supabase } from '../supabase/client';
import { motion } from 'framer-motion';
import Loading from '../components/ui/Loading';
import { optionsEstados } from '../utils/options';
import Navbar from '../components/home/navigation/Navbar';
function Consulta() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(radicadoSchema),
	});
	const [formData, setFormData] = useState({
		radicado: '',
		/* adjunto: null, */
	});
	const [isLoading, setIsLoading] = useState(false);
	const [dataConsulta, setDataConsulta] = useState();

	const handleChange = e => {
		const { name, value } = e.target;
		const cleanedValue = value.replace(/[^a-zA-Z0-9-]/g, '');
		setFormData(prevData => ({
			...prevData,
			[name]: cleanedValue,
		}));
	};

	const onSubmit = async datos => {
		const numeroRadicado = datos.radicado;
		console.log(numeroRadicado);
		setIsLoading(true); // Establecer isLoading en true antes de realizar la consulta
		try {
			const { data, error } = await supabase.rpc('get_user_pqrsf', {
				radicado_id: numeroRadicado,
			});

			console.log('Respuesta de Supabase:', { data, error });

			setDataConsulta(data);
		} catch (err) {
			console.error('Error inesperado:', err);
		} finally {
			setIsLoading(false);
		}
		/**
		 * Función para obtener el nombre del estado basado en su ID.
		 * @param {string} idEstado - ID del estado.
		 * @returns {string} Nombre del estado.
		 */
	};

	const obtenerNombreEstados = idEstado => {
		const estadoEncontrado = optionsEstados.find(
			est => est.id === idEstado.toString(),
		);
		return estadoEncontrado ? estadoEncontrado.nombre : 'Estado Desconocida';
	};

	return (
		<div className='flex flex-col pt-28'>
			<Navbar />
			<h1 className='font-gothicBold text-black py-16 text-center font-medium text-3xl'>
				Consultar Estado de la Solicitud PQRSF
			</h1>
			<div className='px-10 xl:px-48 my-6'>
				<p className='text-black'>
					- <span className='font-gothicBold'>Registrada:</span> Su solicitud ha
					sido recibida correctamente en nuestro sistema. Esto significa que
					hemos iniciado el proceso para atenderla. <br />
					<span className='font-gothicBold'>- Asignada: </span> Su caso ha sido
					asignado a un equipo especializado que se encargará de revisarlo y
					darle una respuesta. En esta etapa, estamos trabajando activamente en
					su solicitud.
					<br />- <span className='font-gothicBold'>Finalizada: </span> Hemos
					completado el proceso de revisión y atención a su solicitud. Usted
					recibirá (o ya recibió) una respuesta formal por los canales
					correspondientes.
					<br />
					Recuerde que puede consultar el estado actualizado de su caso en
					cualquier momento a través de nuestro sistema en línea. Si tiene
					alguna duda adicional, no dude en contactarnos.
				</p>
			</div>
			<div className='grid grid-rows-1 justify-center justify-items-center align-items-center mx-2 lg:items-center md:mx-16 lg:mx-7 lg:gap-5 my-10 xl:mx-16 xl:grid-cols-[25%_75%]'>
				<div className='text-black hidden xl:flex items-center'>
					<img src='/search.svg' width={550} alt='search' />
				</div>
				<div className='flex flex-col'>
					<div className='px-2 bg-white shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] py-10 my-9 md:px-6 lg:my-10 xl:px-20'>
						<p className='text-black text-start'>
							- Digite el número de radicado de su solicitud
						</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col justify-center items-center py-5'>
								<label htmlFor='radicado' className='text-blue-zodiac-950'>
									N° de Radicado
								</label>
								<input
									value={formData.radicado}
									{...register('radicado')}
									onChange={handleChange}
									type='text'
									className='w-52 my-5 text-blue-zodiac-950 border hover:border-blue-zodiac-950 p-1 bg-white'
									placeholder='Número de radicado'
								/>
								{errors.radicado && (
									<p className='text-red-500'>{errors.radicado.message}</p>
								)}
								<motion.button
									whileHover={{ scale: 1.1 }}
									type='submit'
									className='flex items-center justify-center gap-3 py-4 px-10 rounded-b-lg bg-blue-zodiac-950 cursor-pointer text-base lg:text-lg 2xl:text-xl'
								>
									Consultar
								</motion.button>
							</div>
						</form>
					</div>
					{isLoading && <Loading />}
					{!isLoading && dataConsulta && dataConsulta.length > 0 && (
						<table className='border-collapse w-full'>
							<thead>
								<tr>
									<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
										tipo
									</th>

									<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
										Estado
									</th>
									<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
										Descripcion
									</th>
								</tr>
							</thead>
							<tbody key={1}>
								{dataConsulta.map((item, index) => (
									<tr
										key={index}
										className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'
									>
										<td className='w-full lg:w-auto p-3 text-white text-center border border-b block lg:table-cell relative lg:static'>
											<span className='lg:hidden absolute top-0 left-0 bg-blue-zodiac-900 px-2 py-1 text-xs font-bold uppercase'>
												Tipo de Solicitud
											</span>
											<p className='text-black'>{item.tipo_solicitud_pqrs}</p>
										</td>

										<td className='w-full lg:w-auto p-3 text-white border border-b text-center block lg:table-cell relative lg:static'>
											<span className='lg:hidden absolute top-0 left-0 bg-blue-zodiac-900 px-2 py-1 text-xs font-bold uppercase'>
												Estado
											</span>
											<p className='text-black'>
												{obtenerNombreEstados(item.id_estado)}
											</p>
										</td>
										<td className='w-full lg:w-auto p-3 text-white border border-b text-center block lg:table-cell relative lg:static'>
											<span className='lg:hidden absolute top-0 left-0 bg-blue-zodiac-900 px-2 py-1 text-xs font-bold uppercase'>
												Descripcion
											</span>
											<p className='text-black py-5'>{item.descripcion}</p>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
					{!dataConsulta ||
						(dataConsulta.length === 0 && (
							<p className='text-center font-gothicBold text-red-400'>
								No hay datos disponibles.
							</p>
						))}
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Consulta;
