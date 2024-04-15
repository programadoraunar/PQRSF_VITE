import {
	optionsDependencias,
	optionscanal,
	tiposIdentificacion,
} from '../utils/options';
import { z } from 'zod';
/**
 * @file solicitudAnonimaSchema.js
 * @description Este archivo contiene el esquema de validación para el formulario de solicitud anónima utilizando la librería Zod.
 * @author [Tu Nombre]
 */

/**
 * @constant {Array<string>} tiposSolicitud
 * @description Arreglo que contiene los tipos de solicitud válidos para el formulario de solicitud anónima.
 */
const tiposSolicitud = [
	'Peticion',
	'Queja',
	'Reclamo',
	'Suguerencia',
	'Felicitacion',
];
/**
 * @constant {Array<string>} allowedExtensions
 * @description Arreglo que contiene las extensiones de archivo permitidas para el adjunto en el formulario de solicitud anónima.
 */
const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

/**
 * @constant {z.ZodObject<any>} solicitudAnonimaSchema
 * @description Esquema de validación para el formulario de solicitud anónima utilizando la librería Zod.
 */
export const solicitudAnonimaSchema = z.object({
	tipoSolicitud: z.enum(tiposSolicitud, {
		errorMap: () => ({
			message: 'Por favor seleccione un tipo de solicitud',
		}),
	}),
	dependencia: z.enum(optionsDependencias, {
		errorMap: () => ({
			message: 'Por favor seleccione una dependencia válida',
		}),
	}),
	description: z
		.string()
		.min(10, 'La descripción debe tener al menos 10 caracteres')
		.max(500, 'La descripción no puede exceder los 500 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'La descripción no puede contener solo espacios en blanco',
		}),
	canal: z.enum(optionscanal, {
		errorMap: () => ({
			message: 'Por favor seleccione una dependencia válida',
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
			'Archivo no válido. Las extensiones permitidas son: ' +
				allowedExtensions.join(', '),
		), */
});

/**
 * @constant {z.ZodObject<any>} solicitudNormalesSchema
 * @description Esquema de validación para el formulario de solicitud Normales utilizando la librería Zod.
 */
export const solicitudNormalesSchema = z.object({
	tipoIdentificacion: z.enum(tiposIdentificacion, {
		errorMap: () => ({
			message: 'Por favor seleccione un tipo de identificacion',
		}),
	}),
	tipoSolicitud: z.enum(tiposSolicitud, {
		errorMap: () => ({
			message: 'Por favor seleccione un tipo de solicitud',
		}),
	}),
	dependencia: z.enum(optionsDependencias, {
		errorMap: () => ({
			message: 'Por favor seleccione una dependencia válida',
		}),
	}),
	description: z
		.string()
		.min(10, 'La descripción debe tener al menos 10 caracteres')
		.max(500, 'La descripción no puede exceder los 500 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'La descripción no puede contener solo espacios en blanco',
		}),
	canal: z.enum(optionscanal, {
		errorMap: () => ({
			message: 'Por favor seleccione una dependencia válida',
		}),
	}),
	nombre: z
		.string()
		.max(100, 'el nombre no puede exceder los 100 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'La nombre no puede contener solo espacios en blanco',
		}),
	apellido: z
		.string()
		.max(100, 'El apellido no puede exceder los 100 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'Apellido no puede contener solo espacios en blanco',
		}),
	direccion: z
		.string()
		.max(100, 'La direccion no puede exceder los 100 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'La direccion no puede contener solo espacios en blanco',
		}),
	celular: z.number({
		errorMap: () => ({
			message: 'Por favor solo numeros',
		}),
	}),
	email: z.string().email({
		message: 'Por favor ingrese un correo válido',
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
			'Archivo no válido. Las extensiones permitidas son: ' +
				allowedExtensions.join(', '),
		), */
});
