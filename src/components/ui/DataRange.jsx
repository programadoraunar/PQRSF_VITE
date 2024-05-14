import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

function DataRange({ value, onChange }) {
	return (
		<div className='w-full flex flex-col justify-center items-center mb-3'>
			<div>
				<DateRangePicker
					className='text-black bg-white h-11'
					onChange={onChange}
					value={value}
				/>
			</div>
		</div>
	);
}

export default DataRange;
