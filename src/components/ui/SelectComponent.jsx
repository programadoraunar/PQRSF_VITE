import React, { useState } from 'react';
import { RiSortNumberAsc } from '@remixicon/react';
import { Select, SelectItem } from '@tremor/react';

function SelectComponent() {
	const [value, setValue] = useState('');
	return (
		<div className='text-center'>
			<label htmlFor='distance' className='lg:text-xl'>
				N° Registros
			</label>
			<Select
				id='distance'
				name='distance'
				value={value}
				onValueChange={setValue}
				className='mt-2 custom-select lg:text-base'
				color=''
			>
				<SelectItem value='10' icon={RiSortNumberAsc}>
					10
				</SelectItem>
				<SelectItem value='20' icon={RiSortNumberAsc}>
					20
				</SelectItem>
				<SelectItem value='30' icon={RiSortNumberAsc}>
					30
				</SelectItem>
				<SelectItem value='40' icon={RiSortNumberAsc}>
					40
				</SelectItem>
			</Select>
		</div>
	);
}

export default SelectComponent;
