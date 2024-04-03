import { supabase } from '../client';

export const signIn = async (email, password) => {
	try {
		const result = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		return result;
	} catch (error) {
		console.error('Error signing in:', error.message);
		return {
			error: 'Error al iniciar sesión. Por favor, verifica tus credenciales.',
		};
	}
};

export const getUserProfile = async () => {
	try {
		const user = supabase.auth.user();

		if (user) {
			const { data, error, status } = await supabase
				.from('usuario')
				.select('*')
				.single();

			if (error && status === 406) {
				console.error('Error fetching user profile:', error.message);
				return { error: 'Error al obtener el perfil de usuario.' };
			}

			return {
				username: data.nombres,
			};
		} else {
			console.error('User is not signed in.');
			return { error: 'El usuario no ha iniciado sesión.' };
		}
	} catch (error) {
		console.error('Error getting user profile:', error.message);
		return { error: 'Error al obtener el perfil de usuario.' };
	}
};

export const signOut = async () => {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error signing out:', error.message);
			return { error: 'Error al cerrar sesión.' };
		}
	} catch (error) {
		console.error('Error signing out:', error.message);
		return { error: 'Error al cerrar sesión.' };
	}
};
