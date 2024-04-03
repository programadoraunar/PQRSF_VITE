import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
	return (
		<div>
			<Link to='/login' className='text-blueBase'>
				ir a login
			</Link>
			<div>
				<p className='text-black'>
					Este es la pagina principal aqui estara el formulario para registrar
					pqrsf
				</p>
			</div>
		</div>
	);
}

export default Home;
