import { useState, useEffect } from 'react';
import { getPqrsfDetails } from '../../src/supabase/actions/pqrsfFunctions';

const useSolicitudDetails = id => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await getPqrsfDetails(id);
			console.log(data);
			if (data) {
				setData(data[0]);
			} else {
				setError(error);
			}
		};
		fetchData();
	}, [id]);

	return { data, error };
};

export default useSolicitudDetails;
