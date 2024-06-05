import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente que protege las rutas de la aplicación y redirige a la página de inicio de sesión si el usuario no está autenticado.
 * Este componente verifica si el usuario está autenticado y si hay un token almacenado en el localStorage.
 * Si el token ha expirado, se elimina del localStorage.
 * Si el usuario está autenticado, permite el acceso a las rutas protegidas (Outlet).
 * Si el usuario no está autenticado, se redirige a la página de inicio.
 *
 * @returns {JSX.Element} El componente de React que representa las rutas protegidas.
 */
function ProtectedRoutes() {
	const { user } = useAuth();
	const location = useLocation();

	const tokenString = localStorage.getItem(
		'sb-ktzxsuqofbirdhuuwigj-auth-token',
	);

	useEffect(() => {
		// Verificar si el usuario está autenticado y si hay un token almacenado en localStorage
		if (user && tokenString) {
			const token = JSON.parse(tokenString);
			const tokenExpiration = parseInt(token.expires_at, 10);
			const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
			/* 			const currentTimeTest = Math.floor(Date.now() / 1000) + 1800;
			console.log('tiempo propuesto ' + currentTimeTest);
			console.log('tiempo del token' + tokenExpiration); */
			// Si el token ha expirado, se elimina del localStorage
			if (tokenExpiration < currentTime) {
				localStorage.removeItem('sb-ktzxsuqofbirdhuuwigj-auth-token');
				console.log('El token ha expirado. Se ha eliminado del localStorage.');
				window.location.href = '/login';
			} else {
				console.log('tiempo no transcurrido');
			}
		}
	}, [user, location.pathname]); // Este efecto se ejecutará cada vez que cambie el estado del usuario

	// Si el usuario está autenticado, permite el acceso a las rutas protegidas (Outlet).
	// Si el usuario no está autenticado, se redirige a la página de inicio.
	return user ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoutes;
