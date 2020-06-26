import React from 'react';
import { useAuth } from '../store/Auth';

export default function SignUpForm() {
	const { signup } = useAuth();
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	function handleSignUp(e, email, password, name) {
		e.preventDefault();
		signup(email, password, name);
	}

	return (
		<div>
			<h3>Signup</h3>
			<form>
				<div className="input-group">
					<label>Name</label>
					<br />
					<input
						type="text"
						name="name"
						autoComplete="first-name"
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div className="input-group">
					<label>Email</label>
					<br />
					<input
						type="text"
						name="email"
						autoComplete="email"
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
				<div className="input-group">
					<label>Password</label>
					<br />
					<input
						type="password"
						name="password"
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button
					type="submit"
					onClick={(e) => handleSignUp(e, email, password, name)}
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}
