import { z } from 'zod';

// Definir el esquema de validación para el número de radicado
export const radicadoSchema = z.object({
	radicado: z
		.number({
			message: 'El número de radicado debe ser un número válido',
		})
		.int({
			message: 'El número de radicado debe ser un entero',
		})
		.positive({
			message: 'El número de radicado debe ser un valor positivo',
		}),
});
