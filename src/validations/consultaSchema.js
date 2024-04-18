import { z } from 'zod';

/**
 * Define el esquema de validación para el campo de número de radicado.
 * @module radicadoSchema
 * @type {z.ZodType<{ radicado: string }>}
 * @property {string} radicado - El número de radicado.
 * @example
 * const data = { radicado: 'ABC123-XYZ' };
 * const result = radicadoSchema.parse(data);
 * console.log(result); // { radicado: 'ABC123-XYZ' }
 */
export const radicadoSchema = z.object({
	radicado: z
		.string({
			message: 'El número de radicado debe ser una cadena de texto',
		})
		.regex(/^[a-zA-Z0-9-]+$/, {
			message:
				'El número de radicado debe contener solo letras, números o guiones',
		})
		.min(1, {
			message: 'El número de radicado no puede estar vacío',
		}),
});
