import { supabase } from '../client';

export const signIn = async (email, password) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.log(error.message);
		}

		return data;
	} catch (error) {
		// console.error('Error signing in:', error.message);
		return {
			error: 'Error al iniciar sesión. Por favor, verifica tus credenciales.',
		};
	}
};

export const getUserProfile = async () => {
	try {
		const user = supabase.auth.getUser();

		if (user) {
			const { data, error, status } = await supabase
				.from('usuario')
				.select('*')
				.single();

			if (error && status === 406) {
				console.error('Error fetching user profile:', error.message);
				return { error: 'Error al obtener el perfil de usuario.' };
			}
			console.log(data);

			return {
				username: data.nombres,
				email: data.correo_electronico,
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
