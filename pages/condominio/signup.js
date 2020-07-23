import { useState } from 'react';
import { useAuth } from '~/store/Auth';
import styles from './index.module.scss';

const Signup = ({ apartment }) => {
	const { signup } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSignUp(e, email, password, name) {
		e.preventDefault();
		signup(email, password, name, apto);
	}

	const apto = apartment && apartment.unidade + '-' + apartment.bloco;
	return (
		<div className={styles.scheduling__signup}>
			<div className={styles.scheduling__form}>
				<h2>{apto}</h2>
				<h3>Ops, ainda não tem nenhum cadasto nesse apartamento.</h3>
				<h4>Para continuar crie uam conta rapidinho.</h4>
				<form>
					<label>Nome</label>
					<input
						type="text"
						name="name"
						autoComplete="first-name"
						className="form__input"
						onChange={(event) => setName(event.target.value)}
						required
					/>

					<label>E-mail</label>

					<input
						type="text"
						name="email"
						autoComplete="email"
						className="form__input"
						onChange={(event) => setEmail(event.target.value)}
						required
					/>

					<label>Crie uma senha</label>

					<input
						type="password"
						name="password"
						className="form__input"
						onChange={(event) => setPassword(event.target.value)}
						required
					/>

					<div className="line"></div>
					<button
						type="submit"
						className="btn"
						onClick={(e) => handleSignUp(e, email, password, name)}
					>
						Criar
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
