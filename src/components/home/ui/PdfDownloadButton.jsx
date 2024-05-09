import React from 'react';
import Pdf from '../../pdf/Pdf';
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
}) {
	const [instance, updateInstance] = usePDF({});
	const handleGeneratePdf = () => {
		updateInstance(
			<Pdf
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
				numeroRadicado={556665}
				fechaRadicado={656565}
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
				<button onClick={handleGeneratePdf}>Generar PDF</button>
			)}
			{instance.loading && <div>Cargando documento...</div>}
			{instance.url && (
				<a href={instance.url} download='test.pdf'>
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
};

export default PdfDownloadButton;
