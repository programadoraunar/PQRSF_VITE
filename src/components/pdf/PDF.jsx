import React from 'react';
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
		fontFamily: 'Helvetica-Bold',
	},
	subtitle: {
		fontSize: 14,
		textAlign: 'left',
		marginBottom: 10,
		fontWeight: 'bold',
		fontFamily: 'Helvetica-Bold',
	},
	text: {
		fontSize: 12,
		textAlign: 'justify',
		marginBottom: 10,
		fontFamily: 'Helvetica',
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
});

// Componente para generar el PDF
function PDF({
	tipoSolicitud,
	dependencia,
	descripcion,
	numeroRadicado,
	fechaRadicado,
}) {
	const obtenerNombreDependencia = idDependencia => {
		const dependenciaEncontrada = optionsDependencias.find(
			dep => dep.id === idDependencia,
		);
		return dependenciaEncontrada
			? dependenciaEncontrada.nombre
			: 'Dependencia Desconocida';
	};
	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.header}>
					<Image src={HeaderImage} />
				</View>
				<View style={styles.section}>
					<Text style={styles.title}>Resumen de Solicitud</Text>
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

export default PDF;
