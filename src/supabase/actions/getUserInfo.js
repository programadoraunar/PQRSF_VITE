// Importa el cliente de Supabase para el lado del servidor
import { supabase } from '../client';
// Función para obtener la información del usuario desde la tabla public.usuario
export default async function getUserInfo() {
	// Obtiene la sesión del usuario utilizando el cliente de Supabase.
	const session = await supabase.auth.getSession();

	// Verifica si el usuario está autenticado
	if (session) {
		// Si el usuario está autenticado, obtén su información de la tabla public.usuario
		const { data, error } = await supabase.from('usuario').select('*').single(); // Obtener solo una fila (si hay más de una, se obtendrá solo la primera)

		// Verifica si ocurrió un error al obtener la información del usuario
		if (error) {
			console.error(
				'Error al obtener la información del usuario:',
				error.message,
			);
			return null; // Retorna null si hay un error
		}

		// Retorna los datos del usuario si se obtuvieron correctamente
		return data;
	} else {
		// Retorna null si el usuario no está autenticado
		return null;
	}
}
