import { supabase } from '../client';

/**
 * Inicia sesión de un usuario con el correo electrónico y contraseña proporcionados.
 * @module signIn
 * @async
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<{ data?: any; error?: string }>} - Un objeto que contiene los datos del usuario si es exitoso, o un mensaje de error si hubo un problema.
 * @example
 * const { data, error } = await signIn('ejemplo@correo.com', 'micontraseña');
 * if (error) {
 *   console.error(error);
 * } else {
 *   console.log(data);
 * }
 */
export const signIn = async (email, password) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			return { error: error.message };
		}

		return data;
	} catch (error) {
		return {
			error: 'Error al iniciar sesión. Por favor, verifica tus credenciales.',
		};
	}
};

/**
 * Obtiene la información del perfil de usuario.
 * @module getUserProfile
 * @async
 * @returns {Promise<{ username?: string; email?: string; error?: string }>} - Un objeto que contiene el nombre de usuario y correo electrónico del usuario, o un mensaje de error si hubo un problema.
 * @example
 * const { username, email, error } = await getUserProfile();
 * if (error) {
 *   console.error(error);
 * } else {
 *   console.log(`Nombre de usuario: ${username}, Correo electrónico: ${email}`);
 * }
 */
export const getUserProfile = async () => {
	try {
		const user = await supabase.auth.getUser();
		const id = user.data.user.id;
		if (user) {
			const { data, error, status } = await supabase
				.from('usuario')
				.select('*')
				.eq('id_usuario', id)
				.single();
			if (error && status === 406) {
				return { error: 'Error al obtener el perfil de usuario.' };
			}
			return { username: data.nombres, email: data.correo_electronico };
		} else {
			return { error: 'El usuario no ha iniciado sesión.' };
		}
	} catch (error) {
		return { error: 'Error al obtener el perfil de usuario.' };
	}
};

/**
 * Cierra la sesión del usuario actual.
 * @module signOut
 * @async
 * @returns {Promise<{ error?: string }>} - Un objeto que contiene un mensaje de error si hubo un problema al cerrar la sesión.
 * @example
 * const { error } = await signOut();
 * if (error) {
 *   console.error(error);
 * } else {
 *   console.log('Sesión cerrada exitosamente');
 * }
 */
export const signOut = async () => {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) {
			return { error: 'Error al cerrar sesión.' };
		}
	} catch (error) {
		return { error: 'Error al cerrar sesión.' };
	}
};
