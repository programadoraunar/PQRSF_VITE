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
	const [dataConsulta, setDataConsulta] = useState();

	const handleChange = e => {
		const { name, value } = e.target;
		const cleanedValue = value.replace(/[^0-9]/g, ''); // Elimina caracteres especiales
		const intValue = parseInt(cleanedValue, 10);
		console.log(intValue);
		setFormData(prevData => ({
			...prevData,
			[name]: intValue,
		}));
	};

	const onSubmit = async datos => {
		const numeroRadicado = datos.radicado;
		console.log('Número de radicado:', numeroRadicado);

		try {
			const { data, error } = await supabase.rpc('get_user_pqrsf', {
				radicado_id: numeroRadicado,
			});

			console.log('Respuesta de Supabase:', { data, error });

			setDataConsulta(data);
		} catch (err) {
			console.error('Error inesperado:', err);
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
			<div>
				<h1 className='text-black pt-16 text-center font-medium text-4xl pb-5'>
					Consultar Estado de la Solicitud PQRSF
				</h1>
				<div className='border-2 rounded-lg border-blue-zodiac-950 my-9 mx-5 lg:my-10 lg:mx-16'>
					<p className='text-black'>
						Diguite el numero de radicado de su solicitud
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
							<button type='submit' className='mb-5 border-2 px-5 bg-blue-900'>
								Consultar
							</button>
						</div>
					</form>
					<div className='px-10 '>
						{dataConsulta && dataConsulta.length > 0 && (
							<Table className='mt-5 bg-white'>
								<TableHead className='border-2 border-blue-zodiac-900'>
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
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Consulta;
