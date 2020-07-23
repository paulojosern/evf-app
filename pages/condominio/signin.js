import { useState } from 'react';
import { useAuth } from '~/store/Auth';
import styles from './index.module.scss';
const Signin = ({ msg, apartment, state }) => {
	const { signin } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [disabled, setDisabled] = useState({
		email: false,
		password: false,
	});

	console.log(email, password);

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

	// console.log(msg);
	const valideMsg = (message) => {
		if (message === 'auth/wrong-password') {
			return 'Ops, confira sua senha';
		}
		if (message === 'auth/user-not-found') {
			return 'Ops, confira sua senha';
		}
		return 'Ops, confira sua senha';
	};
	return (
		<div className={styles.scheduling__signin}>
			<div className={styles.scheduling__form}>
				<h2>{apartment && apartment.unidade + '-' + apartment.bloco}</h2>

				<h3>{state && `Olá, ${state.user.name}`}</h3>
				{msg && <h4>{valideMsg(msg)}</h4>}
				<form>
					<label>Entre com seu e-mail</label>

					<input
						type="text"
						name="unidade"
						onChange={handleEmail}
						className="form__input"
						required
					/>
					<label>Sua senha</label>
					<input
						type="password"
						name="unidade"
						onChange={handlePass}
						className="form__input"
						required
					/>
					<div className="line"></div>
					<button
						type="submit"
						className="btn"
						disabled={disabled.email && disabled.password ? '' : 'disabled'}
						onClick={(e) => handleSignin(e, email, password)}
					>
						Entrar
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signin;
