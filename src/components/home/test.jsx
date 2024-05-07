import { AnimatePresence } from 'framer-motion';
import React from 'react';

function test() {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				ref={ref}
				className='relative border-2 border-blue-zodiac-800 rounded-lg py-5 my-5 px-4 shadow-xl flex flex-col  bg-white'
			>
				<h1 className='text-blue-zodiac-900 text-center font-gothicBold text-2xl py-2'>
					Solicitudes Normales
				</h1>
				<button
					type='button'
					className='text-black cursor-pointer absolute top-0 right-0 mt-2 mr-2' // Posicionamiento absoluto en la esquina superior derecha
					onClick={onClose}
				>
					<RiCloseCircleFill size={32} />
				</button>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<h2 className='text-lg text-black font-gothicBold'>
							Informacion del Solicitante
						</h2>
					</div>
					<div className='mb-4 mt-4 text-blue-zodiac-950 text-start'>
						Tipo de Identificacion
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
						{...register('tipoIdentificacion')}
						onChange={e => {
							console.log('Valor seleccionado:', e.target.value);
							setValue('tipoIdentificacion', e.target.value);
						}}
					>
						{optionsIdentificacion.map((option, index) => (
							<option key={index} value={option.id}>
								{option.nombre}
							</option>
						))}
					</select>
					{errors.tipoIdentificacion && (
						<p className='text-red-500'>{errors.tipoIdentificacion.message}</p>
					)}

					<div className='grid grid-rows-5 grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 '>
						<div className='flex flex-col w-full lg:w-[85%]'>
							<div className='py-2 text-blue-zodiac-950 text-start'>
								Numero de Documento
							</div>
							<input
								type='text'
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
								placeholder='Ingrese su Numero de Documento'
							/>
						</div>
						<div className='flex flex-col w-full lg:w-[85%]'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Nombres Del Solicitante
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
								placeholder='Ingrese su nombre'
								type='text'
								{...register('nombre')}
								value={formData.nombre}
								onChange={handleChange}
							/>
							{errors.nombre && (
								<p className='text-red-500'>{errors.nombre.message}</p>
							)}
						</div>

						<div className='flex flex-col w-full lg:w-[85%]'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Primer Apellido
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
								placeholder='Ingrese su Apellido'
								type='text'
								{...register('apellido')}
								value={formData.apellido}
								onChange={handleChange}
							/>
							{errors.apellido && (
								<p className='text-red-500'>{errors.apellido.message}</p>
							)}
						</div>
						<div className='flex flex-col w-full lg:w-[85%]'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Segundo Apellido
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
								placeholder='Ingrese su Apellido'
								type='text'
								{...register('segundoApellido')}
								value={formData.segundoApellido}
								onChange={handleChange}
							/>
							{errors.segundoApellido && (
								<p className='text-red-500'>{errors.segundoApellido.message}</p>
							)}
						</div>

						<h2 className='text-lg text-black font-gothicBold'>
							Datos del Contacto
						</h2>

						<div className='flex flex-col w-full lg:w-[85%]'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Direccion
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
								placeholder='Ingrese su direccion'
								type='text'
								{...register('direccion')}
								onChange={handleChange}
							/>
							{errors.direccion && (
								<p className='text-red-500'>{errors.direccion.message}</p>
							)}
						</div>
						<div className='flex flex-col w-full lg:w-[85%]'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Celular
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
								placeholder='Ingrese su Celular'
								type='number'
								{...register('celular')}
								value={formData.celular}
								onChange={handleChange}
							/>
							{errors.celular && (
								<p className='text-red-500'>{errors.celular.message}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Correo
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
								placeholder='Ingrese su Correo Electronico'
								type='text'
								{...register('email')}
								onChange={handleChange}
							/>
							{errors.email && (
								<p className='text-red-500'>{errors.email.message}</p>
							)}
						</div>
					</div>

					<div className='mb-4 mt-8 text-blue-zodiac-950 text-start'>
						Tipo de Solicitud
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
						{...register('tipoSolicitud')}
						onChange={e => {
							console.log('Valor seleccionado tipoSolicitud:', e.target.value);
							setValue('tipoSolicitud', e.target.value);
						}}
					>
						{optionsSolicitud.map((option, index) => (
							<option key={index} value={option.nombre}>
								{option.nombre}
							</option>
						))}
					</select>
					{errors.tipoSolicitud && (
						<p className='text-red-500'>{errors.tipoSolicitud.message}</p>
					)}

					<div className='mb-4 mt-8 text-blue-zodiac-950 text-start'>
						Dependencia
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
						{...register('dependencia')}
						onChange={e => {
							console.log('Valor seleccionado dependencia:', e.target.value);
							setValue('dependencia', e.target.value);
						}}
					>
						{/* Mapea sobre las opciones y crea un SearchSelectItem para cada una */}
						{optionsDependencias.map((option, index) => (
							<option key={index} value={option.id}>
								{option.nombre}
							</option>
						))}
					</select>
					{errors.dependencia && (
						<p className='text-red-500'>{errors.dependencia.message}</p>
					)}

					<div className='mb-4 mt-8 text-blue-zodiac-950 text-start'>
						Canal de Respuesta
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
						{...register('canal')}
						onChange={e => {
							console.log('Valor seleccionado:', e.target.value);
							setValue('canal', e.target.value);
						}}
					>
						{/* Mapea sobre las opciones y crea un SearchSelectItem para cada una */}
						{optionscanal.map((option, index) => (
							<option key={index} value={option.id}>
								{option.nombre}
							</option>
						))}
					</select>
					{errors.canal && (
						<p className='text-red-500'>{errors.canal.message}</p>
					)}

					<div className='flex flex-col'>
						<label
							htmlFor='description'
							className='text-base py-2 text-blue-zodiac-950 text-start'
						>
							Description
						</label>
						<textarea
							className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
							id='description'
							placeholder='Start typing here...'
							rows={6}
							{...register('description')}
							value={formData.description}
							onChange={handleChange}
						/>
						{errors.description && (
							<p className='text-red-500'>{errors.description.message}</p>
						)}
					</div>

					{/* <input
                type='file'
                className='border text-black border-gray-300 p-2 rounded-md text-sm lg:text-xl'
                {...register('adjunto')}
            />
            {errors.adjunto && (
                <p className='text-red-500'>{errors.adjunto.message}</p>
            )} */}

					<button type='submit' className='text-black'>
						Enviar
					</button>
				</form>
			</motion.div>
		</AnimatePresence>
	);
}

export default test;