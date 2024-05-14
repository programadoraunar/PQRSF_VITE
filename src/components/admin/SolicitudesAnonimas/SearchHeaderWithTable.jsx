import React from 'react';
import DataRange from '../../ui/DataRange';
import { RiSearch2Line } from '@remixicon/react';
import { useForm, Controller } from 'react-hook-form';
import {
	obtenerPqrsfPorFechas,
	obtenerPqrsfPorFechasYTipo,
} from '../../../supabase/actions/pqrsfFunctions';

function SearchHeaderWithTable({ setDatosSolicitudes }) {
	const {
		register,
		handleSubmit,
		control,
		getValues,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm();

	const onSubmit = data => {
		console.log(data);
	};

	const validateNumberOfRecords = () => {
		const { numberOfRecords } = getValues();
		if (!numberOfRecords) {
			setError('numberOfRecords', {
				type: 'manual',
				message: 'Seleccione el N° de registros',
			});
			return false;
		} else {
			clearErrors('numberOfRecords');
			return true;
		}
	};

	const onSubmitFilterDateRange = async () => {
		if (!validateNumberOfRecords()) return;

		const { numberOfRecords, dateRange } = getValues();
		const formattedDates = dateRange.map(date => {
			const formattedDate = new Date(date).toISOString().split('T')[0];
			return formattedDate;
		});

		const [fechaDesde, fechaHasta] = formattedDates;
		try {
			const data = await obtenerPqrsfPorFechas(
				numberOfRecords,
				fechaDesde,
				fechaHasta,
				true,
			);
			setDatosSolicitudes(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const onSubmitFilterDateAndType = async () => {
		if (!validateNumberOfRecords()) return;

		const { numberOfRecords, dateRange, tipoSolicitud } = getValues();
		if (!dateRange) {
			setError('dateRange', {
				type: 'manual',
				message: 'Seleccione un rango de fechas',
			});
			return;
		}
		clearErrors('dateRange');

		if (!tipoSolicitud) {
			setError('tipoSolicitud', {
				type: 'manual',
				message: 'Seleccione el tipo de solicitud',
			});
			return;
		}
		clearErrors('tipoSolicitud');

		const formattedDates = dateRange.map(date => {
			const formattedDate = new Date(date).toISOString().split('T')[0];
			return formattedDate;
		});

		const [fechaDesde, fechaHasta] = formattedDates;
		try {
			const data = await obtenerPqrsfPorFechasYTipo(
				numberOfRecords,
				fechaDesde,
				fechaHasta,
				true,
				tipoSolicitud,
			);
			setDatosSolicitudes(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='bg-blue-zodiac-950 text-white'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid grid-cols-1 lg:grid-cols-3 gap-4 py-4 justify-items-center'
			>
				<div className='flex flex-col items-center w-full max-w-xs'>
					<label htmlFor='numberOfRecords' className='my-2'>
						N° Registros
					</label>
					<select
						{...register('numberOfRecords')}
						className='select select-info w-full bg-white text-black'
					>
						<option value='' disabled selected>
							Seleccione el N° de registros
						</option>
						<option value='10'>10</option>
						<option value='20'>20</option>
						<option value='30'>30</option>
						<option value='40'>40</option>
					</select>
					{errors.numberOfRecords && (
						<p className='text-red-500 text-sm'>
							{errors.numberOfRecords.message}
						</p>
					)}
				</div>
				<div className='flex flex-col items-center w-full max-w-xs'>
					<label className='my-2'>Seleccione Rango de Fechas</label>
					<div className='flex'>
						<Controller
							name='dateRange'
							control={control}
							defaultValue={[new Date(), new Date()]}
							render={({ field }) => (
								<DataRange value={field.value} onChange={field.onChange} />
							)}
						/>
						<button
							type='button'
							onClick={handleSubmit(onSubmitFilterDateRange)}
							className='btn px-1 py-0 text-xs flex items-center space-x-1'
						>
							<RiSearch2Line className='h-4 w-4 text-white' />
						</button>
					</div>
					{errors.dateRange && (
						<p className='text-red-500 text-sm'>{errors.dateRange.message}</p>
					)}
				</div>
				<div className='flex flex-col items-center w-full max-w-xs'>
					<label htmlFor='tipoSolicitud' className='my-2'>
						Tipo de Solicitud
					</label>
					<div className='flex'>
						<select
							{...register('tipoSolicitud')}
							className='select select-info w-full bg-white text-black'
						>
							<option value='' disabled selected>
								Seleccione el tipo de solicitud
							</option>
							<option value='Peticion'>Petición</option>
							<option value='Queja'>Queja</option>
							<option value='Reclamo'>Reclamo</option>
							<option value='Sugerencia'>Sugerencia</option>
						</select>
						<button
							type='button'
							onClick={handleSubmit(onSubmitFilterDateAndType)}
							className='btn px-2 py-0 text-xs'
						>
							<RiSearch2Line className='h-4 w-4 text-white' />
						</button>
					</div>
					{errors.tipoSolicitud && (
						<p className='text-red-500 text-sm'>
							{errors.tipoSolicitud.message}
						</p>
					)}
				</div>
			</form>
		</div>
	);
}

export default SearchHeaderWithTable;
