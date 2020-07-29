import { useState } from 'react';
import { useAuth } from '~/store/Auth';
const Signin = ({ error, setError, apartment, state, setState, setLoader }) => {
	const { signin } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [disabled, setDisabled] = useState({
		email: false,
		password: false,
	});

	function handleSignin(e, email, password) {
		setLoader(true);
		e.preventDefault();
		signin(email, password);
	}

	const handleEmail = (event) => {
		setEmail(event.target.value);
		var input = event.target.value;
		if (input && /(^\w.*@\w+\.\w)/.test(input)) {
			input === state.user.email
				? setDisabled({
						...disabled,
						email: true,
				  })
				: setDisabled({
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

	// console.log(msg);
	const valideMsg = (message) => {
		setLoader(false);
		if (message === 'auth/wrong-password') {
			return 'Ops, confira sua senha';
		}
		if (message === 'auth/user-not-found') {
			return 'Ops, confira sua senha';
		}
		return 'Ops, confira sua senha';
	};

	const handleBack = () => {
		setState(false);
		setError(false);
	};

	return (
		<div className="scheduling__signin">
			<div className="scheduling__form">
				<h2>{apartment && apartment.unidade + '-' + apartment.bloco}</h2>
				{state && (
					<>
						<h3>{`Olá, ${state.user.name}`}</h3>
						{error && <h4>{valideMsg(error)}</h4>}
					</>
				)}
				<form>
					<label>Entre com seu e-mail</label>

					<input
						type="text"
						name="unidade"
						onChange={handleEmail}
						className="form__input"
						required
					/>
					{disabled.email && (
						<>
							<label>Sua senha</label>
							<input
								type="password"
								name="unidade"
								onChange={handlePass}
								className="form__input"
								required
							/>
						</>
					)}
					<br />
					<br />
					<div className="flex--row between">
						<button
							type="button"
							className="btn btn--white"
							onClick={handleBack}
						>
							Voltar
						</button>
						{disabled.password && (
							<button
								type="submit"
								className="btn btn--default"
								onClick={(e) => handleSignin(e, email, password)}
							>
								Entrar
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signin;
