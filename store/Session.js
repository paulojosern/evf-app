import { auth } from '~/services/config';
import { useEffect, useState } from 'react';
import Store from './';

export const initialState = {
	currentUser: null,
	isLoggedIn: false,
	msg: '',
};

export function useSession() {
	const [{ currentUser, isLoggedIn, msg }, setState] = Store.useStore();
	const [isLoading, toggleIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setState({
					currentUser: user,
					isLoggedIn: true,
				});
			} else {
				setState({
					currentUser: null,
					isLoggedIn: false,
					msg: user,
				});
			}
			toggleIsLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [setState]);

	return {
		isLoading,
		currentUser,
		isLoggedIn,
		msg,
	};
}
