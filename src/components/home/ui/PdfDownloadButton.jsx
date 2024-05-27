import React from 'react';
import PDF from '../../pdf/PDF';

import { usePDF } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

function PdfDownloadButton({
	tipoIdentificacion,
	documentNumber,
	nombres,
	apellido,
	segundoApellido,
	direccion,
	celular,
	email,
	tipoSolicitud,
	dependencia,
	descripcion,
	sede,
	numeroRadicado,
	fechaRadicado,
}) {
	const [instance, updateInstance] = usePDF({});
	const handleGeneratePdf = () => {
		updateInstance(
			<PDF
				tipoIdentificacion={tipoIdentificacion}
				documentNumber={documentNumber}
				nombres={nombres}
				apellido={apellido}
				segundoApellido={segundoApellido}
				direccion={direccion}
				celular={celular}
				email={email}
				tipoSolicitud={tipoSolicitud}
				dependencia={dependencia}
				descripcion={descripcion}
				sede={sede}
				numeroRadicado={numeroRadicado}
				fechaRadicado={fechaRadicado}
			/>,
		);
	};
	if (instance.loading) return <div>Loading ...</div>;

	if (instance.loading) {
		return <div>Cargando documento...</div>;
	}

	return (
		<div>
			{!instance.loading && !instance.url && (
				<button
					onClick={handleGeneratePdf}
					className='p-3 bg-blue-zodiac-950 text-white'
				>
					Generar PDF
				</button>
			)}
			{instance.loading && <div>Cargando documento...</div>}
			{instance.url && (
				<a
					href={instance.url}
					download='test.pdf'
					className='p-3 bg-blue-zodiac-950 text-white'
				>
					Descargar
				</a>
			)}
		</div>
	);
}
PdfDownloadButton.propTypes = {
	tipoIdentificacion: PropTypes.string.isRequired,
	documentNumber: PropTypes.string.isRequired,
	nombres: PropTypes.string.isRequired,
	apellido: PropTypes.string.isRequired,
	segundoApellido: PropTypes.string.isRequired,
	direccion: PropTypes.string.isRequired,
	celular: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	tipoSolicitud: PropTypes.string.isRequired,
	dependencia: PropTypes.string.isRequired,
	descripcion: PropTypes.string.isRequired,
	sede: PropTypes.string,
	numeroRadicado: PropTypes.string,
	fechaRadicado: PropTypes.string,
};

export default PdfDownloadButton;
