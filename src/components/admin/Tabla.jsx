import React from 'react';
import { RiFlag2Line } from '@remixicon/react';
import PropTypes from 'prop-types';

import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from '@tremor/react';
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
function Tabla({ selectValue, dataValue }) {
	console.log(selectValue);
	console.log(dataValue);
	return (
		<div className='py-8'>
			<Card style={{ backgroundColor: '#fff' }}>
				<Table className='tableMov'>
					<TableHead>
						<TableRow>
							<TableHeaderCell className='table-header-cell'>
								N* Radicado
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Tipo Solicitud
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Fecha de Llegada
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Descripcion
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Dependencia
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Estado
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Accion
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody className='tableMov'>
						{data.map((item, index) => (
							<TableRow
								key={item.name}
								style={{
									backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E2E4E7',
								}}
							>
								<TableCell className='lg:text-lg'></TableCell>
								<TableCell className='lg:text-lg'>{item.name}</TableCell>
								<TableCell className='lg:text-lg'>{item.Role}</TableCell>
								<TableCell className='lg:text-lg'>{item.departement}</TableCell>
								<TableCell className='lg:text-lg'></TableCell>
								<TableCell>
									<Badge color='emerald' icon={RiFlag2Line}>
										{item.status}
									</Badge>
								</TableCell>
								<TableCell></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}
Tabla.propTypes = {
	selectValue: PropTypes.string,
	dataValue: PropTypes.string,
};
export default Tabla;
