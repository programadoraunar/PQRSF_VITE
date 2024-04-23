import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiHome2Line } from '@remixicon/react';
import Footer from '../components/home/Footer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { radicadoSchema } from '../validations/consultaSchema';
import { supabase } from '../supabase/client';
import { motion } from 'framer-motion';
import Loading from '../components/ui/Loading';
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
	};

	return (
		<div className='flex flex-col'>
			<div className='flex justify-center lg:justify-start py-10 bg-blue-zodiac-950 lg:px-24'>
				<img
					src='/logo-autonoma-de-narino.png'
					alt='Logo De La Auitonoma'
					className='w-full max-w-[8rem] sm:max-w-[7rem] md:max-w-[8rem]  lg:max-w-[9rem] xl:max-w-[10rem]'
				/>
			</div>
			<div className='bg-[#F4D460] px-5 py-3'>
				<Link
					to='/'
					className='text-blue-zodiac-950 flex gap-2 hover:bg-[#f0bd2f] w-30 lg:text-2xl items-center'
				>
					<RiHome2Line />
					Inicio
				</Link>
			</div>
			<h1 className='font-gothicBold text-black pt-16 text-center font-medium text-3xl'>
				Consultar Estado de la Solicitud PQRSF
			</h1>
			<div className='grid grid-rows-1 justify-center justify-items-center align-items-center mx-2 lg:items-center md:mx-16 lg:mx-7 lg:gap-5 my-10 xl:mx-16 xl:grid-cols-[25%_75%]'>
				<div className='hidden xl:block'>
					<img src='/search.svg' className='xl:h-56 xl:w-auto' />
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
									className='w-52 my-5 text-blue-zodiac-950 border hover:border-blue-zodiac-950 p-1'
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
											<p className='text-black'>{item.id_estado}</p>
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
