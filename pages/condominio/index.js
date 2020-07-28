import { useState } from 'react';
import { useAuth } from '~/store/Auth';
import { useSession } from '~/store/Session';
import styles from './index.module.scss';
import Reservations from './reservations';
import Signin from './signin';
import Signup from './signup';

const Condominio = () => {
	const [apartment, setApartment] = useState();
	const [state, setState] = useState();
	const { getApartment } = useAuth();
	const { isLoggedIn, isLoading, msg } = useSession();
	apartment && console.log(apartment);

	const handleChange = (e) => {
		var x = e.target.value.replace(/^0+(?!$)/g, '').match(/(\d{0,3})/);
		e.target.value = x[1];
		setApartment({
			...apartment,
			[e.target.name]: e.target.value,
		});
	};

	const handleCheckbox = (e) => {
		setApartment({
			...apartment,
			[e.target.name]: e.target.value,
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

	state && console.log(state);

	return isLoggedIn ? (
		<Reservations state={state} />
	) : (
		<div className={styles.scheduling}>
			{state ? (
				state.user !== undefined ? (
					<Signin apartment={apartment} msg={msg} state={state} />
				) : (
					<Signup apartment={apartment} />
				)
			) : (
				<div className={styles.scheduling__wrap}>
					<div className={styles.scheduling__default}>
						<form>
							<h2>Qual o seu apartamento?</h2>
							<br />
							<input
								type="text"
								name="unidade"
								onChange={handleChange}
								className="form__input form__input--large center"
							/>
							<h4>Qual o bloco?</h4>
							<div className="form__btn form__btn--auto">
								<input
									type="radio"
									id="1"
									className="form__btn--input"
									name="bloco"
									value="1"
									onChange={handleCheckbox}
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
								/>
								<label className="form__btn--label" htmlFor="2" id="btn">
									2
								</label>
							</div>
							<br />
							<button className="btn" onClick={handleSubmit}>
								Enviar
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Condominio;
