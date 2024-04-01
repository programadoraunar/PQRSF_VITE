import React, { useState } from 'react';
import {
	RiCloseLine,
	RiMenu3Line,
	RiQuestionAnswerFill,
	RiQuestionMark,
} from '@remixicon/react';
import { Link } from 'react-router-dom';
function SliderBar() {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<>
			<div
				className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-blue-zodiac-900 p-4 flex flex-col justify-between z-50 ${
					showMenu ? 'left-0' : '-left-full'
				} transition-all`}
			>
				<div>
					<div className='flex justify-center py-7'>
						<img
							src='/logo-autonoma-de-narino.webp'
							alt='Logo autónoma'
							className='max-w-full h-auto w-1/2'
						/>
					</div>
					<ul>
						<li>
							<Link
								to='/'
								className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors'
							>
								<RiQuestionMark className='text-primary' /> Solicitudes Anonimas
							</Link>
						</li>
						<li>
							<Link
								to='/tickets'
								className='flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors'
							>
								<RiQuestionAnswerFill className='text-primary' />
								Solicitudes Normales
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<button
				onClick={() => setShowMenu(!showMenu)}
				className='xl:hidden fixed bottom-4 right-4 bg-blue-zodiac-700 text-blue-zodiac-50 p-3 rounded-full z-50'
			>
				{showMenu ? <RiCloseLine /> : <RiMenu3Line />}
			</button>
		</>
	);
}

export default SliderBar;
