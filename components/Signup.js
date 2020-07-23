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
		<div className="panel">
			<div className="panel__signin">
				<div className="signin ">
					<div className="signin__form">
						<form>
							<div className="panel__item">
								<label className="panel__label">Name</label>
								<input
									type="text"
									name="name"
									autoComplete="first-name"
									className="panel__input"
									onChange={(event) => setName(event.target.value)}
								/>
							</div>
							<div className="ipanel__item">
								<label className="panel__label">Email</label>

								<input
									type="text"
									name="email"
									autoComplete="email"
									className="panel__input"
									onChange={(event) => setEmail(event.target.value)}
								/>
							</div>
							<div className="panel__item">
								<label className="panel__label">Password</label>

								<input
									type="password"
									name="password"
									className="panel__input"
									onChange={(event) => setPassword(event.target.value)}
								/>
							</div>
							<br />
							<button
								type="submit"
								className="btn"
								onClick={(e) => handleSignUp(e, email, password, name)}
							>
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
