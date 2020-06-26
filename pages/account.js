import React from 'react';
import { useAuth } from '../store/Auth';

export default function Account() {
	const { signout } = useAuth();
	return (
		<div>
			<p>Account page</p>
			<button onClick={() => signout()}>Logout</button>
		</div>
	);
}
