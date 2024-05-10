import React, { useState } from 'react';
import { RiSortNumberAsc } from '@remixicon/react';
import { Select, SelectItem } from '@tremor/react';
import PropTypes from 'prop-types';

function SelectComponent({ onChange }) {
	const [value, setValue] = useState('');
	const handleSelectChange = event => {
		onChange(event);
		setValue(event);
	};

	return (
		<div className='text-center'>
			<label htmlFor='distance' className='lg:text-xl'>
				N° Registros
			</label>
			<Select
				id='distance'
				name='distance'
				value={value}
				onValueChange={handleSelectChange}
				className='mt-2 custom-select lg:text-base'
				color=''
			>
				<SelectItem
					value='10'
					icon={RiSortNumberAsc}
					className='cursor-pointer hover:bg-blue-zodiac-900 hover:text-white'
				>
					10
				</SelectItem>
				<SelectItem
					value='20'
					icon={RiSortNumberAsc}
					className='cursor-pointer hover:bg-blue-zodiac-900 hover:text-white'
				>
					20
				</SelectItem>
				<SelectItem
					value='30'
					icon={RiSortNumberAsc}
					className='cursor-pointer hover:bg-blue-zodiac-900 hover:text-white'
				>
					30
				</SelectItem>
				<SelectItem
					value='40'
					icon={RiSortNumberAsc}
					className='cursor-pointer hover:bg-blue-zodiac-900 hover:text-white'
				>
					40
				</SelectItem>
			</Select>
		</div>
	);
}
SelectComponent.propTypes = {
	onChange: PropTypes.func.isRequired, // Validación de propTypes para onChange como función requerida
};
export default SelectComponent;
