import { z } from 'zod';

const tiposSolicitud = [
	'Peticion',
	'Queja',
	'Reclamo',
	'Suguerencia',
	'Felicitacion',
];
const canal = ['email', 'fisico'];
const optionsDependencias = [
	'Rectoría',
	'Secretaría General',
	'Contabilidad',
	'Tesorería',
	'Revisoría Fiscal',
	'Virtual',
	'Jurídica',
	'Vicerrectoría Administrativa',
	'Vicerrectoría Financiera',
	'Sistemas',
	'Bienestar',
	'Biblioteca',
	'Enfermería',
	'Mercadeo',
	'Registro y Control',
	'Crédito y Cartera',
	'Recepción',
	'Internacionalización',
	'Laboratorio Mecánica',
	'Laboratorio Electrónica',
	'Coordinación Administración',
	'Coordinación Contaduría',
	'Coordinación Diseño de Modas',
	'Coordinación Mecánica Dental',
	'Coordinación Ingeniería Informática',
];
/* const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf']; */
// Definir el esquema para el formulario de solicitud anónima
export const solicitudAnonimaSchema = z.object({
	tipoSolicitud: z.enum(tiposSolicitud, {
		errorMap: () => ({
			message: 'Por favor seleccione un tipo de solicitud',
		}),
	}),
	dependencia: z.enum(optionsDependencias, {
		errorMap: () => ({
			message: 'Por favor seleccione una dependencia valida',
		}),
	}),
	description: z
		.string()
		.min(10, 'La descripción debe tener al menos 10 caracteres')
		.max(500, 'La descripción no puede exceder los 500 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'La descripción no puede contener solo espacios en blanco',
		}),
	canal: z.enum(canal, {
		errorMap: () => ({
			message: 'Por favor seleccione una dependencia valida',
		}),
	}),
	/* adjunto: z
		.instanceof(FileList)
		.refine(file => file?.length === 1, 'File is required.')
		.refine(
			file => {
				const selectedFile = file[0];
				if (!selectedFile) return false;
				const fileNameParts = selectedFile.name.split('.');
				const fileExtension =
					fileNameParts[fileNameParts.length - 1].toLowerCase();
				return allowedExtensions.includes(fileExtension);
			},
			'Archivo no valido. Las extensiones permitidas son: ' +
				allowedExtensions.join(', '),
		), */
});
