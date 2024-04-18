import { useEffect, useState } from 'react';
import { getUserProfile } from '../supabase/actions/auth';

/**
 * Hook que obtiene el perfil de usuario.
 * @hook
 * @returns {object|null} - El perfil de usuario, o null si no se ha podido obtener.
 */
function useProfile() {
	const [userProfile, setUserProfile] = useState(null);

	useEffect(() => {
		const getProfile = async () => {
			const result = await getUserProfile();
			if (result) {
				setUserProfile(result);
			}
		};
		getProfile();
	}, []);

	return userProfile;
}

export default useProfile;
