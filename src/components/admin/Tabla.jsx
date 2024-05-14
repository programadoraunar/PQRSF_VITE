import React from 'react';
import { RiFlag2Line } from '@remixicon/react';
import PropTypes from 'prop-types';

const data = [
	{
		name: 'Viola Amherd',
		Role: 'Federal Councillor',
		departement:
			'The Federal Department of Defence, Civil Protection and Sport (DDPS)',
		status: 'active',
	},
	{
		name: 'Albert Rösti',
		Role: 'Federal Councillor',
		departement:
			'The Federal Department of the Environment, Transport, Energy and Communications (DETEC)',
		status: 'active',
	},
	{
		name: 'Beat Jans',
		Role: 'Federal Councillor',
		departement: 'The Federal Department of Justice and Police (FDJP)',
		status: 'active',
	},
	{
		name: 'Ignazio Cassis',
		Role: 'Federal Councillor',
		departement: 'The Federal Department of Foreign Affairs (FDFA)',
		status: 'active',
	},
	{
		name: 'Karin Keller-Sutter',
		Role: 'Federal Councillor',
		departement: 'The Federal Department of Finance (FDF)',
		status: 'active',
	},
	{
		name: 'Guy Parmelin',
		Role: 'Federal Councillor',
		departement:
			'The Federal Department of Economic Affairs, Education and Research (EAER)',
		status: 'active',
	},
	{
		name: 'Elisabeth Baume-Schneider',
		Role: 'Federal Councillor',
		departement: 'The Federal Department of Home Affairs (FDHA)',
		status: 'cerradas',
	},
];
function Tabla() {
	return <div className='py-8'></div>;
}
Tabla.propTypes = {
	selectValue: PropTypes.string,
	dataValue: PropTypes.string,
};
export default Tabla;
