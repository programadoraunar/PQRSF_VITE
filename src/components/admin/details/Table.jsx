import React from 'react';

function Table() {
	return (
		<div className='overflow-x-auto mt-8 lg:text-lg '>
			<table className='table text-black bg-white'>
				{/* head */}
				<thead>
					<tr className='text-base'>
						<th>Tipo</th>
						<th>Fecha Envio</th>
						<th>Fecha Asignacion</th>
						<th>Fecha Respuesta</th>
						<th>Descripcion</th>
						<th>Dependecia</th>
						<th>Canal</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					<tr className='bg-base-200 '>
						<td>Queja</td>
						<td>20/12/2024</td>
						<td>20/12/2024</td>
						<td>20/12/2024</td>
						<td>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
							distinctio tempore autem natus possimus deserunt fuga architecto
							dicta minus totam, facilis odio itaque, praesentium id cum
							inventore. Rerum, saepe suscipit?
						</td>
						<td>Sistemas</td>
						<td>Fisico</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Table;
