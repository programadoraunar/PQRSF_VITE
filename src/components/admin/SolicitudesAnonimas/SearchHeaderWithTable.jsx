import React, { useState } from 'react';
import DataRange from '../../ui/DataRange';
import { RiSearch2Line } from '@remixicon/react';
import { useForm, Controller } from 'react-hook-form';
import {
	obtenerPqrsfPorFechas,
	obtenerPqrsfPorFechasYTipo,
	obtenerPqrsfPorFechasYTipoYEstado,
} from '../../../supabase/actions/pqrsfFunctions';
import PropTypes from 'prop-types';

function SearchHeaderWithTable({ setDatosSolicitudes, setIsLoading }) {
	const [mostrarSelectState, setMostrarSelectState] = useState(false);

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
			setIsLoading(true);
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
		} finally {
			setIsLoading(false);
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
			setIsLoading(true);
			setMostrarSelectState(true);
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
		} finally {
			setIsLoading(false);
		}
	};
	const onSubmitFilterDateTypeAndState = async () => {
		if (!validateNumberOfRecords()) return;

		const { numberOfRecords, dateRange, tipoSolicitud, estado } = getValues();
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
		if (!estado) {
			setError('estado', {
				type: 'manual',
				message: 'Seleccione un Estado',
			});
			return;
		}
		clearErrors('estado');

		const formattedDates = dateRange.map(date => {
			const formattedDate = new Date(date).toISOString().split('T')[0];
			return formattedDate;
		});

		const [fechaDesde, fechaHasta] = formattedDates;
		console.log(numberOfRecords, fechaDesde, fechaHasta, tipoSolicitud, estado);
		const estadoInt = parseInt(estado);
		console.log(estadoInt);
		try {
			setIsLoading(true);
			const data = await obtenerPqrsfPorFechasYTipoYEstado(
				numberOfRecords,
				fechaDesde,
				fechaHasta,
				true,
				tipoSolicitud,
				estadoInt,
			);
			setDatosSolicitudes(data);
			setMostrarSelectState(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
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
						<option value='' disabled>
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
							<RiSearch2Line className='h-4 w-4 text-blue-zodiac-950' />
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
							<option value='' disabled>
								Seleccione el tipo de solicitud
							</option>
							<option value='Peticion'>Petición</option>
							<option value='Queja'>Queja</option>
							<option value='Reclamo'>Reclamo</option>
							<option value='Suguerencia'>Sugerencia</option>
							<option value='Felicitacion'>Felicitacion</option>
						</select>
						<button
							type='button'
							onClick={handleSubmit(onSubmitFilterDateAndType)}
							className='btn px-2 py-0 text-xs'
						>
							<RiSearch2Line className='h-4 w-4 text-blue-zodiac-950' />
						</button>
					</div>
					{errors.tipoSolicitud && (
						<p className='text-red-500 text-sm'>
							{errors.tipoSolicitud.message}
						</p>
					)}

					{mostrarSelectState && (
						<div className='flex flex-col items-center w-full max-w-xs'>
							<label htmlFor='tipoSolicitud' className='my-2'>
								Estado
							</label>
							<div className='flex'>
								<select
									className='select select-info w-full bg-white text-black'
									{...register('estado')}
								>
									<option value='' disabled selected>
										Estado de la solicitud
									</option>
									<option value='1'>Registradas</option>
									<option value='2'>Asignadas</option>
									<option value='3'>Finalizadas</option>
								</select>
								<button
									type='button'
									className='btn px-2 py-0 text-xs'
									onClick={handleSubmit(onSubmitFilterDateTypeAndState)}
								>
									<RiSearch2Line className='h-4 w-4 text-blue-zodiac-950' />
								</button>
							</div>
							{errors.estado && (
								<p className='text-red-500 text-sm'>{errors.estado.message}</p>
							)}
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
SearchHeaderWithTable.propTypes = {
	setDatosSolicitudes: PropTypes.func.isRequired,
	setIsLoading: PropTypes.func,
};
export default SearchHeaderWithTable;
