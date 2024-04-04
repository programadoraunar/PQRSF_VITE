import React from 'react';
import { RiListView, RiAddLine } from '@remixicon/react';
import { Card } from '@tremor/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardInfo(props) {
	const { solicitud, totalSolicitudes, text } = props;
	let status = '';
	let textColor = '';
	switch (solicitud) {
		case 'pending':
			status = 'bg-yellow-500/10 text-yellow-500';
			textColor = 'text-yellow-500';
			break;
		case 'inProcess':
			status = 'bg-blue-500/10 text-blue-500';
			textColor = 'text-blue-500';
			break;
		case 'close':
			status = 'bg-green-500/10 text-green-500';
			textColor = 'text-green-500';
			break;
		case 'total':
			status = 'bg-pink-500/10 text-pink-500';
			textColor = 'text-blue-zodiac-950';
			break;
	}
	return (
		<div>
			<Card
				className='mx-auto max-w-x'
				decoration='top'
				decorationColor='blue'
				style={{ backgroundColor: '#fff' }}
			>
				<div>
					<RiListView
						className={`text-4xl ${status} p-2 box-content rounded-xl`}
					/>
				</div>
				<div>
					<h1 className='text-4xl text-blue-zodiac-950 font-bold mb-4'>
						{totalSolicitudes}
					</h1>
					<p className={textColor}>{text}</p>
				</div>
				<hr className='border border-dashed border-blue-zodiac-950 my-4' />
				<div>
					<Link
						to='/'
						className='flex items-center gap-2 text-blue-zodiac-950 hover:underline'
					>
						<RiAddLine /> Listar
					</Link>
				</div>
			</Card>
		</div>
	);
}

CardInfo.propTypes = {
	solicitud: PropTypes.string, // ajusta el tipo según lo que esperas para solicitud
	totalSolicitudes: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
};

export default CardInfo;
