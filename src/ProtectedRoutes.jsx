import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
/**
 * Componente que protege las rutas de la aplicación y redirige a la página de inicio de sesión si el usuario no está autenticado.
 *
 * @returns {JSX.Element} El componente de React que representa las rutas protegidas.
 */
function ProtectedRoutes() {
	// Verifica si el usuario está autenticado.
	// Si el usuario está autenticado, se permite el acceso a las rutas protegidas (Outlet).
	// Si el usuario no está autenticado, se redirige a la página de inicio.
	const { user } = useAuth();
	return user ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoutes;
