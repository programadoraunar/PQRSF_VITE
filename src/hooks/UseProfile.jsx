import { useEffect, useState } from 'react';
import { getUserProfile } from '../supabase/actions/auth';

function UseProfile() {
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

export default UseProfile;
