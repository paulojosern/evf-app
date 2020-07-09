import React, { useState } from 'react';
import { useAuth } from '../store/Auth';

export default function SigninForm({ msg }) {
	const { signin } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [disabled, setDisabled] = useState({
		email: false,
		password: false,
	});

	function handleSignin(e, email, password) {
		e.preventDefault();
		signin(email, password);
	}

	const handleEmail = (event) => {
		setEmail(event.target.value);
		var input = event.target.value;
		if (input && /(^\w.*@\w+\.\w)/.test(input)) {
			setDisabled({
				...disabled,
				email: true,
			});
		} else if (input === '') {
		} else {
			setDisabled({
				...disabled,
				email: false,
			});
		}
	};

	const handlePass = (event) => {
		setPassword(event.target.value);
		setDisabled({
			...disabled,
			password: event.target.value !== '' ? true : false,
		});
	};

	const valideMsg = (message) => {
		if (message === 'auth/wrong-password') {
			return 'A senha não confere';
		}
		if (message === 'auth/user-not-found') {
			return 'Usuário não encontrado';
		}
		return 'Usuário e senha inválidos';
	};

	return (
		<div className="panel">
			<div className="panel__signin">
				<div className="signin ">
					<div className="signin__logo"></div>
					<div className="signin__form">
						{msg && <div className="panel__msg">{valideMsg(msg)}</div>}
						<form>
							<div className="panel__item">
								<label className="panel__label">Email</label>

								<input
									type="text"
									name="email"
									autoComplete="email"
									className="panel__input"
									onChange={handleEmail}
								/>
							</div>
							<div className="panel__item">
								<label className="panel__label">Senha</label>

								<input
									type="password"
									name="password"
									className="panel__input"
									autoComplete="current-password"
									onChange={handlePass}
								/>
							</div>
							<button
								type="submit"
								className="btn"
								disabled={disabled.email && disabled.password ? '' : 'disabled'}
								onClick={(e) => handleSignin(e, email, password)}
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
