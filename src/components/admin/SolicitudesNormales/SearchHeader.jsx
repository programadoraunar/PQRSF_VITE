import React from 'react';
import SelectComponent from '../../ui/SelectComponent';
import DateRange from '../../ui/DateRange';
import Inputs from '../../ui/Inputs';

function SearchHeader() {
	return (
		<div className='flex flex-col md:flex-row w-auto bg-blue-zodiac-900 py-3 px-4 mt-7 justify-between'>
			<SelectComponent />
			<DateRange />
			<Inputs />
		</div>
	);
}

export default SearchHeader;
