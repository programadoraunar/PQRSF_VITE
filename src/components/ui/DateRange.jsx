import React, { useEffect, useState } from 'react';
import { DateRangePicker } from '@tremor/react';
import { RiSearchLine } from '@remixicon/react';
import { format } from 'date-fns';

const DateRange = ({ onValueChange }) => {
	const [value, setValue] = useState({
		from: new Date(),
		to: new Date(),
	});

	const [hasSelectedNewDate, setHasSelectedNewDate] = useState(false);

	const handleValueChange = newValue => {
		setValue(newValue);
		setHasSelectedNewDate(true);
	};

	useEffect(() => {
		if (
			hasSelectedNewDate &&
			value.from instanceof Date &&
			value.to instanceof Date
		) {
			const formattedValue = {
				from: format(value.from, 'yyyy-MM-dd'),
				to: format(value.to, 'yyyy-MM-dd'),
			};
			onValueChange(formattedValue);
			setHasSelectedNewDate(false);
		}
	}, [value, hasSelectedNewDate, onValueChange]);

	return (
		<div>
			<label htmlFor='distance' className='lg:text-xl'>
				Filtrar
			</label>
			<div className='flex items-center w-full'>
				<DateRangePicker
					className='mx-auto max-w-sm mt-2 custom-date lg:text-base'
					enableSelect={false}
					value={value}
					onValueChange={handleValueChange}
				/>

				<button className='hover:bg-blue-zodiac-600 p-2 border-0 rounded-md'>
					<RiSearchLine />
				</button>
			</div>
		</div>
	);
};

export default DateRange;
