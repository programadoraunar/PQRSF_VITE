import { z } from 'zod';

// Definir el esquema de validación para el número de radicado
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
