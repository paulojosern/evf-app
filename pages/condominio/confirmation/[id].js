import { useState, useEffect } from 'react';
import { useAuth } from '~/store/Auth';
import IconChecked from '~/assets/logos/icon-checked.svg';

const Confirmation = ({ id }) => {
	const { getUserFromDB } = useAuth();
	const [user, setUser] = useState();
	const [apartment, setApartment] = useState();
	const [validation, setValidation] = useState({ bloco: false, btn: false });

	const getUser = async () => {
		const response = await getUserFromDB(id);
		setUser(response);
	};

	useEffect(() => {
		id && getUser();
	}, [id]);

	const handleChange = (e) => {
		var x = e.target.value.replace(/^0+(?!$)/g, '').match(/(\d{0,3})/);
		e.target.value = x[1];
		setApartment({
			...apartment,
			[e.target.name]: e.target.value,
		});
		// if (e.target.value.length >= 2) {
		// 	setValidation({
		// 		bloco: true,
		// 		btn: false,
		// 	});
		// } else {
		// 	setValidation({
		// 		bloco: false,
		// 		btn: false,
		// 	});
		// }
	};

	const formatDate = (date) => {
		let dt = date.split('_');
		dt = `${dt[0]}, ${dt[1]} de ${dt[2]}`;
		return dt;
	};
	user && console.log(user);

	return (
		<div className="scheduling">
			{user ? (
				<div className="scheduling__panel scheduling__panel--confirmation">
					<div className="reserved">
						<div className="reserved__content reserved__content--confirmation">
							<IconChecked />
							<div className="reserved__confirmation">
								<h3>Reservado</h3>
								<h2>{user.apartment}</h2>
								<h3>{formatDate(user.reservation.day)}</h3>
								<h3> às {user.reservation.hour}</h3>
								<h4>{user.name}</h4>
							</div>
						</div>
						<div className="reserved__btn">
							<button className="btn btn--default">Confirmar</button>
						</div>
					</div>
				</div>
			) : (
				<div className="scheduling__default">
					<form>
						<h2>Informe o apartamento</h2>
						<br />
						<input
							type="number"
							name="unidade"
							onChange={handleChange}
							className="form__input form__input--large center"
							required
						/>
					</form>
				</div>
			)}
		</div>
	);
};

export default Confirmation;

Confirmation.getInitialProps = async ({ query }) => {
	const { id } = query;
	return { id };
};
