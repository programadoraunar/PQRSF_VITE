import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../validations/userSchema';
import { signIn } from '../supabase/actions/auth';
import { Toaster, toast } from 'sonner';
function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userSchema),
	});

	const onSubmit = async () => {
		const result = await signIn(email, password);
		console.log(result.error);
		if (result.error) {
			// Manejar el error
			setError(result.error);
			console.log('Error:', result.error);

			// Mostrar un mensaje específico para credenciales inválidas
			if (result.error === 'Invalid login credentials') {
				toast('Error', {
					description:
						'Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.',
					duration: 5000,
					position: 'bottom-center',
				});
			} else {
				toast('Error', {
					description: String(result.error),
					duration: 5000,
					position: 'bottom-center',
				});
			}
		} else {
			// Manejar el inicio de sesión exitoso
			navigate('/AdminProfile');
		}
	};

	return (
		<div className='bg-blue-zodiac-950'>
			<div className='font-sans text-#333'>
				<div className='min-h-screen flex flex-col items-center justify-center py-6'>
					<div className='grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full'>
						<div className='max-md:text-center'>
							<h2 className='text-textBlank lg:text-3xl xl:text-4xl text-2xl font-extrabold lg:leading-[55px]'>
								Bienvenido al Sistema PQRSF
							</h2>
							<p className='text-textGrey text-sm xl:text-lg mt-6'>
								Ingrese sesión con su correo y contraseña
							</p>
							<div className='flex justify-center py-7'>
								<img
									src='/logo-autonoma-de-narino.png'
									width={179.5}
									height={0}
									alt='Logo autónoma'
									style={{ width: '200px', height: 'auto' }}
								/>
							</div>
						</div>
						<form
							className='space-y-6 max-w-md md:max-w-full md:ml-auto max-md:mx-auto w-full border border-y-4 border-bottomBlue rounded-lg px-5 py-10 bg-white'
							onSubmit={handleSubmit(onSubmit)}
						>
							<h3 className='text-center text-gray-600 text-2xl xl:text-3xl font-extrabold mb-8 max-md:text-center'>
								Iniciar Sesión
							</h3>
							<div className='pb-7 pt-2'>
								<div className='pb-5'>
									<input
										type='email'
										autoComplete='email'
										required
										className='input placeholder:text-gray-500 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600  text-black'
										placeholder='Email'
										{...register('email')}
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
									{errors.email && (
										<p className='text-red-500'>{errors.email.message}</p>
									)}
								</div>
								<div>
									<input
										type='password'
										autoComplete='current-password'
										required
										className='input placeholder:text-gray-500 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 text-black'
										placeholder='Contraseña'
										{...register('password')}
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
									{errors.password && (
										<p className='text-red-500'>{errors.password.message}</p>
									)}
								</div>
							</div>

							<div className='mt-10'>
								<button
									type='submit'
									className='w-full shadow-xl py-2.5 px-4 text-sm lg:text-xl font-semibold rounded text-textBlank bg-buttonBase hover:bg-buttonHover focus:outline-none'
								>
									Iniciar Sesión
								</button>
							</div>
							<div className='space-x-6 flex justify-center'>
								<p className='text-xs md:text-xl xl:text-base text-gray-600 text-center mt-2'>
									&copy; 2024 Aunar
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Toaster
				toastOptions={{
					style: {
						width: '90%', // Ancho relativo
						maxWidth: '500px', // Ancho máximo
						fontSize: '17px',
					},
					className: 'toast',
				}}
			/>
		</div>
	);
}

export default Login;
