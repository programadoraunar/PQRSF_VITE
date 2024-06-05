import React from 'react';
import Footer from '../components/home/Footer';

import Navbar from '../components/home/navigation/Navbar';
import Hero from '../components/home/sections/Hero';
import PqrsfSection from '../components/home/sections/PqrsfSection';
import PQRSFDetails from '../components/home/sections/PQRSFDetails';
import Pruebas from '../components/home/Pruebas';
import { supabase } from '../supabase/client';
function Test() {
	const handleUpload = async e => {
		let file;

		if (e.target.files) {
			file = e.target.files[0];
		}

		const { data, error } = await supabase.storage
			.from('archivos')
			.upload('public/' + file?.name, file);

		if (data) {
			console.log(data);
		} else if (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Navbar />
			<Hero />
			<PqrsfSection />
			<PQRSFDetails />
			<section className='bg-gray-100 py-8'>
				<div className='container mx-auto px-7 xl:px-48 pt-4 pb-12 text-gray-800'>
					<h1 className='w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800'>
						Formularios
					</h1>
					<div className='w-full mb-4'>
						<div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
					</div>
				</div>
			</section>
			<input
				type='file'
				accept='image/*'
				className='block w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
				id='file_input'
				onChange={e => {
					handleUpload(e); // 👈 this will trigger when user selects the file.
				}}
			/>
			<Footer />
		</div>
	);
}

export default Test;
