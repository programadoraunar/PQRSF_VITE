import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFount from './pages/NotFount';
import { AuthProvider } from './context/AuthContext';
import LayoutAdmin from './layouts/LayoutAdmin';
import HomeAdmin from './pages/admin/HomeAdmin';
import ProtectedRoutes from './ProtectedRoutes';
import SolicitudesAnonimas from './pages/admin/SolicitudesAnonimas';
import SolicitudesNormales from './pages/admin/SolicitudesNormales';
import Consulta from './pages/Consulta';
import Test from './pages/Test';
import SolicitudDetails from './pages/admin/SolicitudDetails';

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/consulta' element={<Consulta />}></Route>
					<Route path='/test' element={<Test />}></Route>
					<Route element={<ProtectedRoutes />}>
						<Route path='/AdminProfile/' element={<LayoutAdmin />}>
							<Route index element={<HomeAdmin />}></Route>
							<Route
								path='SolicitudesAnonimas'
								element={<SolicitudesAnonimas />}
							></Route>
							<Route
								path='SolicitudesNormales'
								element={<SolicitudesNormales />}
							></Route>
							<Route
								path='solicitudDetails/:id'
								element={<SolicitudDetails />}
							></Route>
						</Route>
					</Route>

					<Route path='*' element={<NotFount />}></Route>
				</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
