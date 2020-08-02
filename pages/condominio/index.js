import { useState, useEffect } from 'react';
import { useAuth } from '~/store/Auth';
import { useSession } from '~/store/Session';
// import styles from './index.module.scss';
import Reservations from './reservations';
import Signin from './signin';
import Signup from './signup';

const Condominio = () => {
	const [apartment, setApartment] = useState();
	const [state, setState] = useState(false);
	const { getApartment } = useAuth();
	const { isLoggedIn, msg } = useSession();
	const [error, setError] = useState();
	const [loader, setLoader] = useState(false);
	const [validation, setValidation] = useState({ bloco: false, btn: false });

	useEffect(() => {
		state && useState(false);
	}, []);

	state && console.log(state);

	useEffect(() => {
		msg && setError(msg);
	}, [msg]);

	const handleChange = (e) => {
		var x = e.target.value.replace(/^0+(?!$)/g, '').match(/(\d{0,3})/);
		e.target.value = x[1];
		setApartment({
			...apartment,
			[e.target.name]: e.target.value,
		});
		if (e.target.value.length >= 2) {
			setValidation({
				bloco: true,
				btn: false,
			});
		} else {
			setValidation({
				bloco: false,
				btn: false,
			});
		}
	};

	const handleCheckbox = (e) => {
		setApartment({
			...apartment,
			[e.target.name]: e.target.value,
		});
		setValidation({
			bloco: true,
			btn: true,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const currentApartment = apartment.unidade + '-' + apartment.bloco;
		console.log(currentApartment);
		const getUser = await getApartment(currentApartment);
		const user = getUser ? { ...getUser } : undefined;
		setState({ user });
	};

	// state && console.log('state:', state);

	return isLoggedIn ? (
		<Reservations
			state={state}
			setState={setState}
			setLoader={setLoader}
			setValidation={setValidation}
		/>
	) : (
		<div className="scheduling">
			<div
				className={
					!loader
						? 'scheduling__wrap'
						: 'scheduling__wrap scheduling__wrap--show'
				}
			>
				<div className="loader loader__position">
					<span></span>
				</div>
			</div>
			{state &&
				(state.user !== undefined ? (
					<Signin
						apartment={apartment}
						state={state}
						setState={setState}
						setError={setError}
						error={error}
						setLoader={setLoader}
					/>
				) : (
					<Signup
						apartment={apartment}
						setState={setState}
						setError={setError}
						error={error}
						setLoader={setLoader}
					/>
				))}
			<div className={state ? 'scheduling scheduling--hidden' : ''}>
				<div className="scheduling__default">
					<form>
						<h2>Qual o seu apartamento?</h2>
						<br />
						<input
							type="number"
							name="unidade"
							onChange={handleChange}
							className="form__input form__input--large center"
							required
						/>
						{validation.bloco && (
							<div className="default__animation">
								<h4>Qual o bloco?</h4>
								<div className="form__btn form__btn--auto">
									<input
										type="radio"
										id="1"
										className="form__btn--input"
										name="bloco"
										value="1"
										onChange={handleCheckbox}
										required
									/>
									<label className="form__btn--label" htmlFor="1" id="btn">
										1
									</label>
									<input
										type="radio"
										id="2"
										className="form__btn--input"
										name="bloco"
										value="2"
										onChange={handleCheckbox}
										required
									/>
									<label className="form__btn--label" htmlFor="2" id="btn">
										2
									</label>
								</div>
							</div>
						)}
						<br />
						{validation.btn && (
							<button
								className="btn btn--default default__animation"
								onClick={handleSubmit}
							>
								Enviar
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Condominio;
