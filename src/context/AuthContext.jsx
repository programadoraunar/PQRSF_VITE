import { React, createContext, useContext, useEffect, useState } from 'react';
import getUserInfo from '../supabase/actions/getUserInfo';
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
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
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
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);
	return (
		<AuthContext.Provider value={{ user, isAdmin, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
// Agregar validación PropTypes para children
AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
