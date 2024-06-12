import React from 'react';
import { RiListView } from '@remixicon/react';
function TotalPqrsf({ data }) {
	return (
		<div
			className={`card card-side bg-white shadow-xl text-black border-blue-zodiac-950 mt-2`}
		>
			<figure className='bg-green-500/10'>
				<RiListView className='w-20 h-16' />
			</figure>
			<div className='card-body'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg'>Total PQRSF en el Sistema</h3>
					<i className='fas fa-user-graduate'>👌</i>
				</div>
				<p className='text-3xl font-gothicBold'>{data.total}</p>
			</div>
		</div>
	);
}

export default TotalPqrsf;
