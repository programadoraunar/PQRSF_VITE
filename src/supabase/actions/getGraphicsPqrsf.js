import { supabase } from '../client';

export const obtenerPqrsfPorFechaGrafica = async idDependencia => {
	try {
		const { data, error } = await supabase.rpc(
			'obtener_pqrsf_por_fecha_grafica',
			{
				id_de_la_dependencia: idDependencia,
			},
		);

		if (error) {
			console.error('Error fetching PQRSF graphics:', error.message);
			return { data: null, error };
		}
		return { data, error: null };
	} catch (err) {
		console.error('Unexpected error:', err.message);
		return { data: null, error: err };
	}
};
