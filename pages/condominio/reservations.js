import { useState, useEffect } from 'react';
import { database } from '~/services/config';
import { useAuth } from '~/store/Auth';
import Confirm from './reservations.confirm';
import QRCode from './qrcode';
import IconChecked from '~/assets/logos/icon-checked.svg';
import IconDelete from '~/assets/logos/icon-garbage.svg';

const Reservations = ({ state, setState, setLoader, setValidation }) => {
	const { signout, getDayFromDB } = useAuth();
	const [calendar, setCalendar] = useState([]);
	const [day, setDay] = useState([]);
	const [current, setCurrent] = useState();
	const [loading, setLoading] = useState(false);
	const [confirm, setConfirm] = useState({
		active: false,
		msg: '',
		function: null,
	});

	const [reserved, setReserved] = useState(null);
	// state && console.log(state);

	useEffect(() => {
		setLoader(false);
		state &&
			state.user.reservation &&
			(setReserved({
				day: state.user.reservation.day,
				hour: state.user.reservation.hour,
			}),
			setCurrent(state.user.reservation.day));
	}, [state]);

	// reserved && console.log(reserved);

	useEffect(() => {
		var curr = new Date();
		var first = curr.getDate() - 1;
		let newCalendar = [];
		for (var i = 1; i < 7; i++) {
			var next = new Date(curr.getTime());
			next.setDate(first + i);
			newCalendar.push(next.format());
		}
		calendar.length <= 7 && setCalendar(newCalendar);
	}, []);

	Date.prototype.format = function () {
		var months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro',
		];
		var days = [
			'Domingo',
			'Segunda-feira',
			'Terça-feira',
			'Quarta-feira',
			'Quinta-feira',
			'Sexta-feira',
			'Sábado',
		];
		return (
			days[this.getDay()] +
			', ' +
			this.getDate() +
			' ' +
			months[this.getMonth()]
		);
	};

	const hours = [
		{ hour: '8:00' },
		{ hour: '9:00' },
		{ hour: '10:00' },
		{ hour: '11:00' },
		{ hour: '12:00' },
		{ hour: '13:00' },
		{ hour: '14:00' },
		{ hour: '15:00' },
		{ hour: '16:00' },
		{ hour: '17:00' },
		{ hour: '18:00' },
		{ hour: '19:00' },
		{ hour: '20:00' },
		{ hour: '21:00' },
		{ hour: '22:00' },
	];

	const handleDay = async (value) => {
		setLoading(true);
		let currentDay = await getDayFromDB(value);
		const arr = currentDay && Object.values(currentDay.hours);
		currentDay === undefined ? setDay(hours) : setDay(arr);
		setCurrent(value);
		setLoading(false);
	};

	const ConfirmHour = (hour) => {
		// console.log(hour, current);
		setConfirm({
			active: true,
			msg: 'Deseja confirma o horário ' + hour.hour,
			function: () => saveToDB(hour),
		});
	};

	const removeHour = (hour) => {
		// console.log(hour, current);
		setConfirm({
			active: true,
			msg: 'Deseja cancelar o horário ' + hour,
			function: () => removeToDB(),
		});
	};

	const saveUserToDB = async (hour) => {
		const db = await database;
		return db
			.collection('users')
			.doc(state.user.id)
			.set({
				...state.user,
				reservation: hour
					? {
							day: current,
							hour,
					  }
					: null,
			})
			.then(() => {
				console.log('gravado');
			});
	};

	const saveToDB = async (currentHour) => {
		// console.log(hours);
		// console.log(day);
		// console.log(currentHour);
		setLoading(true);
		let hour = currentHour.hour;
		hour = { hour, user: state.user };
		const objIndex = day.findIndex((obj) => obj.hour == currentHour.hour);
		const updatedObj = { ...day[objIndex], ...hour };
		const updatedProjects = [
			...day.slice(0, objIndex),
			updatedObj,
			...day.slice(objIndex + 1),
		];
		let newHours = { ...updatedProjects };
		newHours = { hours: newHours };

		// console.log(newHours);
		const db = await database;
		return db
			.collection('calendar')
			.doc(current)
			.set(newHours)
			.then(() => {
				setReserved({
					day: current,
					hour: currentHour.hour,
				});
				saveUserToDB(currentHour.hour);
				setLoading(false);
			});
	};

	// day && console.log(day);

	const removeToDB = async () => {
		setLoading(true);
		let newHours = { ...hours };
		newHours = { hours: newHours };
		const db = await database;
		return db
			.collection('calendar')
			.doc(current)
			.set(newHours)
			.then(() => {
				setReserved(null);
				setLoading(false);
				saveUserToDB();
			});
	};

	const logout = () => {
		setValidation({
			bloco: false,
			btn: false,
		});
		setState(false);
		signout('/condominio');
		console.log('deslogado');
	};

	const formatDate = (date) => {
		let dt = date.split('_');
		dt = `${dt[0]}, ${dt[1]} de ${dt[2]}`;
		return dt;
	};

	return (
		<div className="scheduling__panel">
			<div
				className={
					!loading
						? 'scheduling__wrap'
						: 'scheduling__wrap scheduling__wrap--show'
				}
			>
				<div className="loader loader__position">
					<span></span>
				</div>
			</div>
			<Confirm confirm={confirm} setConfirm={setConfirm} />
			{state ? (
				<>
					<header>
						<div className="user">Olá, {state.user.name}</div>
						<button className="logout" onClick={() => logout()}>
							Sair
						</button>
					</header>
					{!reserved ? (
						<section>
							{calendar.length > 0 &&
								calendar.map((el, i) => {
									const slug = el.replace(/[,|\s]+/g, '_').toLowerCase();
									return (
										<button
											className="btn__day"
											key={i}
											onClick={() => handleDay(slug)}
										>
											{el}
										</button>
									);
								})}
							{day.length > 0 && (
								<div className="panel__hours">
									<div className="hours__container">
										<h3>Selecione o dia desejado</h3>
										<div className="hours__content">
											{Object.keys(day).map((el, i) => {
												return !day[el].user ? (
													<button
														className="hours__btn"
														key={i}
														onClick={() => ConfirmHour(day[el])}
													>
														{day[el].hour}
													</button>
												) : (
													<button
														className="hours__btn hours__btn--reserved"
														key={i}
													>
														{day[el].hour}
														<small>Indisponível</small>
													</button>
												);
											})}
										</div>
										<button
											onClick={() => setDay(false)}
											className="btn btn--default"
										>
											Escolher outro dia
										</button>
									</div>
								</div>
							)}
						</section>
					) : (
						<div className="reserved">
							<div className="reserved__content">
								<IconChecked />
								<div className="reserved__detail">
									<h3>Você tem uma reserva</h3>
									<h2>
										{formatDate(reserved.day)} às {reserved.hour}
									</h2>
								</div>
							</div>
							<label
								className="reserved__remove"
								onClick={() => removeHour(reserved.hour)}
							>
								<IconDelete />
							</label>
							<div className="reserved__qrcode">
								<QRCode id={state.user.id} />
							</div>
						</div>
					)}
				</>
			) : (
				<div className="scheduling__wrap scheduling__wrap--show">
					<button className="btn" onClick={() => logout()}>
						Sair
					</button>
				</div>
			)}
		</div>
	);
};

export default Reservations;
