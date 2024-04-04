import React from 'react';
import { RiFlag2Line } from '@remixicon/react';
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
function Tabla() {
	return (
		<div className='py-8'>
			<Card style={{ backgroundColor: '#fff' }}>
				<h3 className='text-blue-zodiac-950 font-bold text-xl lg:text-3xl'>
					Ultimas Solicitudes
				</h3>
				<Table className='mt-5'>
					<TableHead>
						<TableRow>
							<TableHeaderCell className='table-header-cell'>
								Tipo Solicitud
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Fecha de Llegada
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Dependencia
							</TableHeaderCell>
							<TableHeaderCell className='table-header-cell'>
								Estado
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<TableRow
								key={item.name}
								style={{
									backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E2E4E7',
								}}
							>
								<TableCell className='lg:text-lg'>{item.name}</TableCell>
								<TableCell className='lg:text-lg'>{item.Role}</TableCell>
								<TableCell className='lg:text-lg'>{item.departement}</TableCell>
								<TableCell>
									<Badge color='emerald' icon={RiFlag2Line}>
										{item.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}

export default Tabla;
