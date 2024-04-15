import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiHome2Line } from '@remixicon/react';
import Footer from '../components/home/Footer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { radicadoSchema } from '../validations/consultaSchema';
import { supabase } from '../supabase/client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from '@tremor/react';
import Loading from '../components/ui/Loading';
import { motion } from 'framer-motion';

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
		const cleanedValue = value.replace(/[^0-9]/g, ''); // Elimina caracteres especiales
		const intValue = cleanedValue === '' ? '' : parseInt(cleanedValue, 10);
		setFormData(prevData => ({
			...prevData,
			[name]: intValue,
		}));
	};

	const onSubmit = async datos => {
		const numeroRadicado = datos.radicado;
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
			setIsLoading(false); // Establecer isLoading en false después de obtener la respuesta
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
			<h1 className='font-gothicBold text-black pt-16 text-center font-medium text-3xl pb-5'>
				Consultar Estado de la Solicitud PQRSF
			</h1>
			<div className='flex flex-col lg:flex-row lg:justify-around mx-2 lg:items-center lg:mx-7'>
				<div className='hidden xl:block'>
					<img src='/search.svg' width={500} />
				</div>
				<div>
					<div>
						<div className='px-2 bg-white shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] py-10 my-9 lg:my-10'>
							<p className='text-black'>
								- Diguite el numero de radicado de su solicitud
							</p>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='flex flex-col justify-center items-center py-5'>
									<label htmlFor='radicado' className='text-blue-zodiac-950'>
										N° de Radicado
									</label>
									<input
										value={formData.radicado}
										{...register('radicado', { valueAsNumber: true })}
										onChange={handleChange}
										type='text'
										className='w-52 my-5 text-blue-zodiac-950'
										placeholder='Numero de radicado'
									/>
									{errors.radicado && (
										<p className='text-red-500'>{errors.radicado.message}</p>
									)}
									<motion.button
										whileHover={{ scale: 1.1 }}
										onHoverStart={e => {}}
										onHoverEnd={e => {}}
										type='submit'
										className='flex items-center justify-center gap-3 py-4 px-10 rounded-b-lg bg-blue-zodiac-950 cursor-pointer text-base lg:text-lg 2xl:text-xl'
									>
										Consultar
									</motion.button>
								</div>
							</form>
							<div className='py-5'>
								{!isLoading && dataConsulta && dataConsulta.length > 0 && (
									<Table className='mt-5 bg-white'>
										<TableHead className='border-b-2 border-blue-zodiac-950'>
											<TableRow>
												<TableHeaderCell className='table-header-cell'>
													Tipo Solicitud
												</TableHeaderCell>
												<TableHeaderCell className='table-header-cell'>
													Canal
												</TableHeaderCell>
												<TableHeaderCell className='table-header-cell'>
													Estado
												</TableHeaderCell>
												<TableHeaderCell className='table-header-cell'>
													Descripcion
												</TableHeaderCell>
											</TableRow>
										</TableHead>
										<TableBody key={1} className='border-2'>
											{dataConsulta.map((item, index) => (
												<TableRow key={index}>
													<TableCell className='lg:text-lg'>
														{item.tipo_solicitud_pqrs}
													</TableCell>
													<TableCell className='lg:text-lg'>
														{item.id_canal}
													</TableCell>
													<TableCell className='lg:text-lg'>
														{item.id_estado}
													</TableCell>
													<TableCell className='lg:text-lg'>
														{item.descripcion}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								)}
								{!dataConsulta ||
									(dataConsulta.length === 0 && (
										<p className='text-center text-black'>
											No hay datos disponibles.
										</p>
									))}
							</div>
							{isLoading && <Loading />}
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Consulta;
