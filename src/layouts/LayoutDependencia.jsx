import React from 'react';
import SliderBar from '../components/shared/SliderBar';
import Header from '../components/dependencia/Header';
import { Outlet } from 'react-router-dom';

function LayoutDependencia() {
	return (
		<div className='min-h-screen grid grid-cols-1 xl:grid-cols-6'>
			<SliderBar />
			<div className='xl:col-span-5'>
				<Header />
				<div className='h-[90vh] overflow-y-scroll p-8'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default LayoutDependencia;
