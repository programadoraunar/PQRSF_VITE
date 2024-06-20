import React from 'react';
import Table from '../../components/admin/details/Table';
import { useParams } from 'react-router-dom';
import Loading from '../../components/ui/Loading';
import useSolicitudDetails from '../../hooks/useSolicitudDetails';
import InfoSolicitante from '../../components/admin/details/InfoSolicitante';
import InfoSolicitud from '../../components/admin/details/InfoSolicitud ';

function SolicitudDetails() {
	const { id } = useParams();
	const { data, error } = useSolicitudDetails(id);
	if (error) {
		return <div>error</div>;
	}

	if (!data) {
		return <Loading />;
	}

	return (
		<div className='flex flex-col lg:flex-row lg:gap-5'>
			{data.esanonima === false && <InfoSolicitante data={data} />}
			<div className='flex flex-col items-center'>
				<section id='infoSolicitud' className='w-full'>
					<InfoSolicitud data={data} />
					<Table data={data} />
				</section>
			</div>
		</div>
	);
}

export default SolicitudDetails;
