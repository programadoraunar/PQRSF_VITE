import React from 'react';
import { DateRangePicker } from '@tremor/react';
const DateRange = () => {
	return (
		<div>
			<label htmlFor='distance' className='lg:text-xl'>
				Filtrar
			</label>
			<DateRangePicker
				className='mx-auto max-w-sm mt-2 custom-date lg:text-base'
				enableSelect={false}
			/>
		</div>
	);
};

export default DateRange;
