import React from 'react';
import CardInfo from '../../components/admin/CardInfo';
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
		status: 'active',
	},
];

function HomeAdmin() {
	return (
		<div>
			<div className='flex items-center justify-between mb-10'>
				<h1 className='text-4xl text-white'>Good morning, jotredev!</h1>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				<CardInfo
					solicitud='total'
					totalSolicitudes={25}
					text='Total de Solicitudes PQRSF Registradas'
				/>
				<CardInfo
					solicitud='close'
					totalSolicitudes={100}
					text='Total de Solicitudes PQRSF Cerradas'
				/>
			</div>
			{/* tabla de prueba */}
			<div className='py-8'>
				<Card style={{ backgroundColor: '#0c4c9c' }}>
					<h3 className='text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-xl lg:text-3xl'>
						Ultimas Solicitudes
					</h3>
					<Table className='mt-5'>
						<TableHead>
							<TableRow>
								<TableHeaderCell className='lg:text-xl'>Name</TableHeaderCell>
								<TableHeaderCell className='lg:text-xl'>
									Position
								</TableHeaderCell>
								<TableHeaderCell className='lg:text-xl'>
									Department
								</TableHeaderCell>
								<TableHeaderCell className='lg:text-xl'>Status</TableHeaderCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map(item => (
								<TableRow key={item.name}>
									<TableCell
										className='lg:text-lg'
										style={{ backgroundColor: '#0b2851' }}
									>
										{item.name}
									</TableCell>
									<TableCell
										className='lg:text-lg'
										style={{ backgroundColor: '#0b2851' }}
									>
										{item.Role}
									</TableCell>
									<TableCell
										className='lg:text-lg'
										style={{ backgroundColor: '#0b2851' }}
									>
										{item.departement}
									</TableCell>
									<TableCell style={{ backgroundColor: '#0b2851' }}>
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
		</div>
	);
}

export default HomeAdmin;
