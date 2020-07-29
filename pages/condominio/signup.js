import { useState } from 'react';
import { useAuth } from '~/store/Auth';

const Signup = ({ error, setError, apartment, setState, setLoader }) => {
	const { signup } = useAuth();
	const [register, setRegister] = useState();
	const [disabled, setDisabled] = useState({
		email: false,
		password: false,
		btn: false,
	});
	const apto = apartment && apartment.unidade + '-' + apartment.bloco;

	const handleSignUp = async (e) => {
		setLoading(true);
		e.preventDefault();
		const id = await signup(
			register.email,
			register.password,
			register.name,
			apto
		);
		setState({
			user: {
				id,
				name: register.name,
				email: register.email,
				apartment: apto,
				reservation: null,
			},
		});
		setLoader(false);
	};

	const handleChange = (e) => {
		if (event.target.name === 'name') {
			e.target.value !== ''
				? setDisabled({
						...disabled,
						email: true,
				  })
				: setDisabled({
						...disabled,
						email: false,
						btn: false,
				  });
		}
		if (event.target.name === 'email') {
			e.target.value !== ''
				? setDisabled({
						...disabled,
						password: true,
				  })
				: setDisabled({
						...disabled,
						password: false,
						btn: false,
				  });
		}
		if (event.target.name === 'password') {
			e.target.value !== ''
				? setDisabled({
						...disabled,
						btn: true,
				  })
				: setDisabled({
						...disabled,
						btn: false,
				  });
		}
		const auxValues = { ...register };
		auxValues[e.target.name] = e.target.value;
		e.target.value === '' ? setRegister(register) : setRegister(auxValues);
	};

	// register && console.log(register);

	const valideMsg = (message) => {
		if (message === 'auth/email-already-in-use') {
			return 'Ops, este e-mail já está cadastrado.';
		}
		if (message === 'auth/weak-password') {
			return 'Ops, confira sua senha.';
		}
		return 'Ops, confira seus dados';
	};

	const handleBack = () => {
		setState(false);
		setError(false);
	};

	return (
		<div className="scheduling__signin">
			<div className="scheduling__form">
				<h2>{apto}</h2>
				<h3>Ops, ainda não tem cadastro para esse apartamento.</h3>
				<h4 className="blue">Para continuar crie uma conta rapidinho.</h4>
				{error && <h4>{valideMsg(error)}</h4>}
				<form>
					<label>Seu nome</label>
					<input
						type="text"
						name="name"
						autoComplete="first-name"
						className="form__input"
						onChange={handleChange}
						required
					/>
					{disabled.email && (
						<>
							<label>Seu e-mail</label>

							<input
								type="text"
								name="email"
								autoComplete="email"
								className="form__input"
								onChange={handleChange}
								required
							/>

							{disabled.password && (
								<>
									<label>Crie uma senha</label>

									<input
										type="password"
										name="password"
										className="form__input"
										onChange={handleChange}
										required
									/>
								</>
							)}
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
						{disabled.btn && (
							<button
								type="submit"
								className="btn btn--default"
								onClick={(e) => handleSignUp(e)}
							>
								Criar
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
