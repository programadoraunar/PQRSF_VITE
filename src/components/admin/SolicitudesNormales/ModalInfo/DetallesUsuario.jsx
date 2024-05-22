import React from 'react';

function DetallesUsuario() {
	return (
		<div className='my-5'>
			<table className='border-collapse w-full'>
				<thead>
					<tr>
						<th className='px-7 uppercase bg-gray-200 text-black border border-gray-300 hidden lg:table-cell text-md'>
							Documento
						</th>

						<th className='px-7 font-bold uppercase bg-gray-200 text-black border border-gray-300 hidden lg:table-cell'>
							Numero Documento
						</th>
						<th className='px-7 font-bold uppercase bg-gray-200 text-black border border-gray-300 hidden lg:table-cell'>
							Correo Electronico
						</th>
						<th className='px-7font-bold uppercase bg-gray-200 text-black border border-gray-300 hidden lg:table-cell'>
							Nombre
						</th>
						<th className='px-7 font-bold uppercase bg-gray-200 text-black border border-gray-300 hidden lg:table-cell'>
							Celular
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
						<td className='w-full lg:w-auto p-3 text-blue-zodiac-950 text-center border border-b block lg:table-cell relative lg:static'>
							<span className='lg:hidden absolute top-0 left-0 bg-yellowBase px-2 py-1 text-xs font-bold uppercase'>
								Tipo de Solicitud
							</span>
							<p className='text-black'>Tipo Solicitud</p>
						</td>

						<td className='w-full lg:w-auto p-3 text-blue-zodiac-950 border border-b text-center block lg:table-cell relative lg:static'>
							<span className='lg:hidden absolute top-0 left-0 bg-yellowBase px-2 py-1 text-xs font-bold uppercase'>
								Estado
							</span>
							<p className='text-black'>1</p>
						</td>
						<td className='w-full lg:w-auto p-3 text-blue-zodiac-950 border border-b text-center block lg:table-cell relative lg:static'>
							<span className='lg:hidden absolute top-0 left-0 bg-yellowBase px-2 py-1 text-xs font-bold uppercase'>
								Descripcion
							</span>
							<p className='text-black'>descripcion</p>
						</td>
						<td className='w-full lg:w-auto p-3 text-blue-zodiac-950 border border-b text-center block lg:table-cell relative lg:static'>
							<span className='lg:hidden absolute top-0 left-0 bg-yellowBase px-2 py-1 text-xs font-bold uppercase'>
								Descripcion
							</span>
							<p className='text-black'>Andres Daniel Gomez</p>
						</td>
						<td className='w-full lg:w-auto p-3 text-blue-zodiac-950 border border-b text-center block lg:table-cell relative lg:static'>
							<span className='lg:hidden absolute top-0 left-0 bg-yellowBase px-2 py-1 text-xs font-bold uppercase'>
								Descripcion
							</span>
							<p className='text-black'>3167184276</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default DetallesUsuario;
