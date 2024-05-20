import {
	optionsDependencias,
	optionsIdentificacion,
	optionsSolicitud,
	optionsTipoSolicitante,
	optionscanal,
	optionsSede,
} from '../utils/options';
import { z } from 'zod';

/**
 * @file formSchema.js
 * @description Este archivo contiene el esquema de validación para el formulario de solicitud anónima y normales utilizando la librería Zod.
 * @author [Aunar]
 */

/**
 * @constant {Array<string>} canalIds
 * @description Arreglo que contiene los valores permitidos para el campo "canal".
 */
const canalIds = optionscanal.map(option => option.id);

/**
 * @constant {Array<string>} tipoSolicitudIds
 * @description Arreglo que contiene los valores permitidos para el campo "tipoSolicitud".
 */
const tipoSolicitudNombres = optionsSolicitud.map(option => option.nombre);

/**
 * @constant {Array<string>} dependenciasIds
 * @description Arreglo que contiene los valores permitidos para el campo "dependencia".
 */
const dependenciasIds = optionsDependencias.map(option => option.id);

const sedesNombres = optionsSede.map(option => option.nombre);
/**
 * @constant {z.ZodObject<any>} solicitudAnonimaSchema
 * @description Esquema de validación para el formulario de solicitud anónima utilizando la librería Zod.
 */
export const solicitudAnonimaSchema = z.object({
	tipoSolicitud: z.enum(tipoSolicitudNombres, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message:
						'El valor de tipo de solicitud debe ser "Peticion", "Queja", "Reclamo", "Sugerencia" o "Felicitacion".',
				};
			}
			return { message: context.defaultError };
		},
	}),
	dependencia: z.enum(dependenciasIds, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message:
						'El valor de dependencia debe ser uno de los valores permitidos.',
				};
			}
			return { message: context.defaultError };
		},
	}),
	sede: z.enum(sedesNombres, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message: 'El valor de sede debe ser uno de los valores permitidos.',
				};
			}
			return { message: context.defaultError };
		},
	}),
	description: z
		.string()
		.min(10, 'La descripción debe tener al menos 10 caracteres.')
		.max(500, 'La descripción no puede exceder los 500 caracteres.')
		.refine(val => val.trim().length > 0, {
			message: 'La descripción no puede contener solo espacios en blanco.',
		}),
	/* adjunto: z
        .instanceof(FileList)
        .refine(file => file?.length === 1, 'Debe adjuntarse un archivo.')
        .refine(
            file => {
                const selectedFile = file[0];
                if (!selectedFile) return false;
                const fileNameParts = selectedFile.name.split('.');
                const fileExtension =
                    fileNameParts[fileNameParts.length - 1].toLowerCase();
                return allowedExtensions.includes(fileExtension);
            },
            `Extensión de archivo no permitida. Las extensiones permitidas son: ${allowedExtensions.join(', ')}`,
        ), */
});
const tiposIdentificacionNombres = optionsIdentificacion.map(
	option => option.nombre,
);

const tiposSolicitante = optionsTipoSolicitante.map(option => option.nombre);

/**
 * @constant {z.ZodObject<any>} solicitudNormalesSchema
 * @description Esquema de validación para el formulario de solicitud Normales utilizando la librería Zod.
 */
export const solicitudNormalesSchema = z.object({
	tipoSolicitante: z.enum(tiposSolicitante, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message:
						'El valor de tipo de solicitud debe ser "Estudiante", "Docente"',
				};
			}
			return { message: context.defaultError };
		},
	}),
	programa: z.string().optional(),
	semestre: z.string().optional(),
	facultad: z.string().optional(),
	tipoIdentificacion: z.enum(tiposIdentificacionNombres, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message:
						'El valor de tipo de solicitud debe ser "CC", "Targeta de Indentidad", Cedula de Extranjeria.',
				};
			}
			return { message: context.defaultError };
		},
	}),

	documentNumber: z
		.string()
		.regex(/^\d+$/, 'El número de documento debe contener solo dígitos'),

	tipoSolicitud: z.enum(tipoSolicitudNombres, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message:
						'El valor de tipo de solicitud debe ser "Peticion", "Queja", "Reclamo", "Sugerencia" o "Felicitacion".',
				};
			}
			return { message: context.defaultError };
		},
	}),
	dependencia: z.enum(dependenciasIds, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message:
						'El valor de dependencia debe ser uno de los valores permitidos.',
				};
			}
			return { message: context.defaultError };
		},
	}),
	sede: z.enum(sedesNombres, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message: 'El valor de sede debe ser uno de los valores permitidos.',
				};
			}
			return { message: context.defaultError };
		},
	}),
	canal: z.enum(canalIds, {
		errorMap: (issue, context) => {
			if (issue.code === z.ZodIssueCode.invalid_enum_value) {
				return {
					message: 'El valor de canal debe ser "email" o "fisico".',
				};
			}
			return { message: context.defaultError };
		},
	}),
	description: z
		.string()
		.min(10, 'La descripción debe tener al menos 10 caracteres.')
		.max(500, 'La descripción no puede exceder los 500 caracteres.')
		.refine(val => val.trim().length > 0, {
			message: 'La descripción no puede contener solo espacios en blanco.',
		}),

	nombres: z
		.string()
		.max(100, 'el nombre no puede exceder los 100 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'El nombre no puede contener solo espacios en blanco',
		}),
	apellido: z
		.string()
		.max(100, 'El apellido no puede exceder los 100 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'Apellido no puede contener solo espacios en blanco',
		}),
	segundoApellido: z
		.string()
		.max(100, 'El segundo apellido no puede exceder los 100 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'Apellido no puede contener solo espacios en blanco',
		}),
	direccion: z
		.string()
		.max(100, 'La direccion no puede exceder los 100 caracteres')
		.refine(val => val.trim().length > 0, {
			message: 'La direccion no puede contener solo espacios en blanco',
		}),
	celular: z
		.string()
		.max(11, 'El telefono celular no puede exceder los 11 numeros')
		.min(10, 'El telefono no puede tener menos de 10 numeros'),
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
