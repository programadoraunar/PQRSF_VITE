import { z } from 'zod';

// Definir el esquema de validación para el número de radicado
export const radicadoSchema = z.object({
	radicado: z
		.number({
			errorMap: () => ({
				message: 'Solo Numeros',
			}),
		})
		.int()
		.positive({
			errorMap: () => ({
				message: 'Solo Positivos',
			}),
		}),
});
