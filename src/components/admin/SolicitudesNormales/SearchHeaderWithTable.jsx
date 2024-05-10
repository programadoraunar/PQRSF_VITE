import React, { useState } from 'react';
import SelectComponent from '../../ui/SelectComponent';
import DateRange from '../../ui/DateRange';
import Inputs from '../../ui/Inputs';
import Tabla from '../Tabla';

function SearchHeaderWithTable() {
	const [selectValue, setSelectValue] = useState('');
	const handleSelectChange = value => {
		setSelectValue(value);
	};
	const [selectedDates, setSelectedDates] = useState({
		from: new Date(),
		to: new Date(),
	});
	return (
		<div>
			<div className='flex flex-col md:flex-row w-auto bg-blue-zodiac-950 py-3 px-4 mt-7 justify-between'>
				<SelectComponent onChange={handleSelectChange} />
				<DateRange onValueChange={setSelectedDates} />
				<Inputs />
			</div>
			<Tabla selectValue={selectValue} dataValue={selectedDates} />
		</div>
	);
}

export default SearchHeaderWithTable;
