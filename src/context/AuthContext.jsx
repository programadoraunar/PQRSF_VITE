import { React, createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import PropTypes from 'prop-types'; // Importar PropTypes
export const AuthContext = createContext();
// Hook personalizado que utiliza el contexto de autenticación.
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	// Define estados para el usuario, estado de autenticación y errores.
	const [user, setUser] = useState();
	const [role, setRole] = useState();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data, error } = await supabase.auth.getSession();

				if (error) {
					throw error;
				}
				if (data) {
					setUser(data.session);
					setRole(data.session.user.role);
				}
			} catch (error) {
				// console.error('Error fetching user session:', error.message);
			} finally {
				setLoading(false); // Marcar que la carga ha terminado
			}
		};

		fetchUser();
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				setUser(session.user);
				setIsAuthenticated(true);

				console.log('el usuario ah iniciado sesion');
			} else if (event === 'SIGNED_OUT') {
				setUser(null);
				setIsAuthenticated(false);
				console.log('el usuario ha cerrado sesion');
			}
			console.log('te ejecutas cuando ocurre algo');
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);
	// Renderizar un indicador de carga mientras se obtiene el usuario
	if (loading) {
		return <div>Cargando...</div>;
	}
	return (
		<AuthContext.Provider value={{ user, isAuthenticated, role }}>
			{children}
		</AuthContext.Provider>
	);
};
// Agregar validación PropTypes para children
AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
