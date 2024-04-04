import React from 'react';
import { RiSearchLine } from '@remixicon/react';
import { TextInput } from '@tremor/react';
function Inputs() {
	return (
		<div>
			<label htmlFor='distance' className='lg:text-xl'>
				Radicado, Depen..{' '}
			</label>
			<div className='flex items-center mt-2 '>
				<TextInput
					icon={RiSearchLine}
					placeholder='Search...'
					className='h-10 lg:text-lg'
				/>
				<button className='hover:bg-blue-zodiac-600 p-2 border-0 rounded-md'>
					<RiSearchLine />
				</button>
			</div>
		</div>
	);
}

export default Inputs;
