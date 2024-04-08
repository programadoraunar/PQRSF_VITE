import React from 'react';
import { SearchSelect, SearchSelectItem, Textarea } from '@tremor/react';
import Buttons from '../ui/Buttons';
const optionsDependencias = [
	'Rectoría',
	'Secretaría General',
	'Contabilidad',
	'Tesorería',
	'Revisoría Fiscal',
	'Virtual',
	'Jurídica',
	'Vicerrectoría Administrativa',
	'Vicerrectoría Financiera',
	'Sistemas',
	'Bienestar',
	'Biblioteca',
	'Enfermería',
	'Mercadeo',
	'Registro y Control',
	'Crédito y Cartera',
	'Recepción',
	'Internacionalización',
	'Laboratorio Mecánica',
	'Laboratorio Electrónica',
	'Coordinación Administración',
	'Coordinación Contaduría',
	'Coordinación Diseño de Modas',
	'Coordinación Mecánica Dental',
	'Coordinación Ingeniería Informática',
];
function FormularioAnonimo() {
	const [value, setValue] = React.useState('');

	return (
		<div className='border border-blue-zodiac-800 rounded-lg py-5 my-5 mx-32 px-1 shadow-xl flex flex-col items-center bg-white'>
			<h1 className='text-blue-zodiac-900 text-2xl lg:text-3xl font-semibold '>
				Solicitudes Anonimas
			</h1>
			<div>
				<div className='mb-4 mt-8 text-center text-base lg:text-2xl text-slate-500'>
					Tipo de Solicitud
				</div>
				<SearchSelect className=''>
					<SearchSelectItem value='1'>Peticion</SearchSelectItem>
					<SearchSelectItem value='2'>Queja</SearchSelectItem>
					<SearchSelectItem value='3'>Reclamo</SearchSelectItem>
					<SearchSelectItem value='4'>Suguerencia</SearchSelectItem>
					<SearchSelectItem value='5'>Felicitacion</SearchSelectItem>
				</SearchSelect>

				<div className='mb-4 mt-8 text-center text-base text-slate-500 '>
					Dependencia
				</div>
				<SearchSelect>
					{/* Mapea sobre las opciones y crea un SearchSelectItem para cada una */}
					{optionsDependencias.map((option, index) => (
						<SearchSelectItem key={index} value={option}>
							{option}
						</SearchSelectItem>
					))}
				</SearchSelect>

				<div className='flex flex-col'>
					<label
						htmlFor='description'
						className=' text-tremor-content dark:text-dark-tremor-content text-base pl-3 py-2'
					>
						Description
					</label>
					<Textarea
						onChange={e => setValue(e.target.value)}
						id='description'
						placeholder='Start typing here...'
						rows={6}
						value={value}
					/>
				</div>
				<div className='grid grid-cols-2 items-center justify-center py-3'>
					<input
						type='file'
						className='border text-black border-gray-300 p-2 rounded-md'
					/>

					<Buttons type='submit'>Enviar</Buttons>
				</div>
			</div>
		</div>
	);
}

export default FormularioAnonimo;
