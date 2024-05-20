import React from 'react';
import PropTypes from 'prop-types';
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
} from '@react-pdf/renderer';
import HeaderImage from '../../assets/img/header.png';
import FooterImage from '../../assets/img/footer.png';
import { optionsDependencias } from '../../utils/options';

/**
 * Componente para generar un PDF con el resumen de una solicitud.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.tipoSolicitud - Tipo de solicitud.
 * @param {number} props.dependencia - ID de la dependencia.
 * @param {string} props.descripcion - Descripción de la solicitud.
 * @param {string} props.numeroRadicado - Número de radicado de la solicitud.
 * @param {string} props.fechaRadicado - Fecha de radicado de la solicitud.
 * @returns {React.Element} Elemento de React que representa el PDF generado.
 */
function Pdf({
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
	sede,
	descripcion,
	numeroRadicado,
	fechaRadicado,
}) {
	/**
	 * Obtiene el nombre de la dependencia a partir de su ID.
	 * @param {number} idDependencia - ID de la dependencia.
	 * @returns {string} Nombre de la dependencia.
	 */
	const obtenerNombreDependencia = idDependencia => {
		const dependenciaEncontrada = optionsDependencias.find(
			dep => dep.id === idDependencia,
		);
		return dependenciaEncontrada
			? dependenciaEncontrada.nombre
			: 'Dependencia Desconocida';
	};

	// Definir estilos para el PDF
	const styles = StyleSheet.create({
		page: {
			flexDirection: 'column',
			backgroundColor: '#FFFFFF',
			padding: 20,
		},
		section: {
			margin: 10,
			paddingLeft: 25,
			paddingRight: 25,
			flexGrow: 1,
		},
		title: {
			fontSize: 18,
			textAlign: 'center',
			marginBottom: 20,
			fontWeight: 'bold',
		},
		subtitle: {
			fontSize: 14,
			textAlign: 'left',
			marginBottom: 10,
			fontWeight: 'bold',
		},
		text: {
			fontSize: 12,
			textAlign: 'justify',
			marginBottom: 10,
		},
		infoContainer: {
			marginBottom: 20,
		},
		infoItem: {
			fontSize: 13,
			marginBottom: 5,
		},
		image: {
			width: '100%',
			height: '100%',
			objectFit: 'cover', // Ajusta la imagen al contenedor
		},
		columnsContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		column: {
			flex: 1,
		},
	});

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.header}>
					<Image src={HeaderImage} />
				</View>
				<View style={styles.section}>
					<View style={styles.columnsContainer}>
						<View style={styles.column}>
							{tipoIdentificacion && (
								<View style={styles.infoContainer}>
									<Text style={styles.subtitle}>Tipo Identificacion:</Text>
									<Text style={styles.infoItem}>{tipoIdentificacion}</Text>
								</View>
							)}
							{documentNumber && (
								<View style={styles.infoContainer}>
									<Text style={styles.subtitle}>Numero de Documento:</Text>
									<Text style={styles.infoItem}>{documentNumber}</Text>
								</View>
							)}
							{nombres && (
								<View style={styles.infoContainer}>
									<Text style={styles.subtitle}>Nombres:</Text>
									<Text style={styles.infoItem}>
										{`${nombres} ${apellido} ${segundoApellido}`}
									</Text>
								</View>
							)}
						</View>
						<View style={styles.column}>
							{direccion && (
								<View style={styles.infoContainer}>
									<Text style={styles.subtitle}>Direccion:</Text>
									<Text style={styles.infoItem}>{direccion}</Text>
								</View>
							)}
							{celular && (
								<View style={styles.infoContainer}>
									<Text style={styles.subtitle}>Celular:</Text>
									<Text style={styles.infoItem}>{celular}</Text>
								</View>
							)}
							{email && (
								<View style={styles.infoContainer}>
									<Text style={styles.subtitle}>Correo:</Text>
									<Text style={styles.infoItem}>{email}</Text>
								</View>
							)}
						</View>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.subtitle}>Tipo de Solicitud:</Text>
						<Text style={styles.infoItem}>{tipoSolicitud}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.subtitle}>Dependencia:</Text>
						<Text style={styles.infoItem}>
							{obtenerNombreDependencia(dependencia)}
						</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.subtitle}>Sede:</Text>
						<Text style={styles.infoItem}>{sede}</Text>
					</View>

					<View style={styles.infoContainer}>
						<Text style={styles.subtitle}>Descripción:</Text>
						<Text style={styles.infoItem}>{descripcion}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.subtitle}>Número de Radicado:</Text>
						<Text style={styles.infoItem}>{numeroRadicado}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.subtitle}>Fecha de Radicado:</Text>
						<Text style={styles.infoItem}>{fechaRadicado}</Text>
					</View>
					<Text style={styles.text}>
						Este documento ha sido generado automáticamente para proporcionar un
						resumen de la solicitud realizada.
					</Text>
					<Text style={styles.text}>
						Es crucial que guarde este documento, especialmente el número de
						radicado, ya que le será necesario para consultar el estado de su
						solicitud en el futuro.
					</Text>
				</View>
				<View style={styles.header}>
					<Image src={FooterImage} />
				</View>
			</Page>
		</Document>
	);
}

// Definir PropTypes para las propiedades del componente
Pdf.propTypes = {
	tipoSolicitud: PropTypes.string.isRequired,
	dependencia: PropTypes.string.isRequired,
	descripcion: PropTypes.string.isRequired,
	numeroRadicado: PropTypes.string,
	fechaRadicado: PropTypes.string,
	tipoIdentificacion: PropTypes.string, // Tipo de identificación
	documentNumber: PropTypes.string, // Número de documento
	nombres: PropTypes.string, // Nombres
	apellido: PropTypes.string, // Apellido
	segundoApellido: PropTypes.string, // Segundo Apellido
	direccion: PropTypes.string, // Dirección
	celular: PropTypes.string, // Número de celular
	email: PropTypes.string, // Correo electrónico
	sede: PropTypes.string, // Correo electrónico
};

export default Pdf;
