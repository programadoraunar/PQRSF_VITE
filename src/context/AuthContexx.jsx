import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import { supabase } from '../supabase/client';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState(false);
	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				setUser(session.user);
				setAuth(true);
			} else if (event === 'SIGNED_OUT') {
				setUser(null);
				setAuth(false);
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);
	return (
		<AuthContext.Provider value={{ user, auth }}>
			{children}
		</AuthContext.Provider>
	);
};
// Agregar validación PropTypes para children
AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthProvider;
