import { useState, useEffect } from 'react';
import { database } from '~/services/config';
import { useAuth } from '~/store/Auth';
import Confirm from './reservations.confirm';

const Reservations = ({ state }) => {
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
	//state && console.log(state.user.reservation.day);

	useEffect(() => {
		state &&
			state.user.reservation &&
			(setReserved({
				day: state.user.reservation.day,
				hour: state.user.reservation.hour,
			}),
			setCurrent(state.user.reservation.day));
	}, []);

	// reserved && console.log(reserved);

	useEffect(() => {
		let startingDay = new Date();
		let thisDay = new Date();
		let newCalendar = [];
		for (var i = 0; i < 7; i++) {
			thisDay.setDate(startingDay.getDate() + i);
			newCalendar.push(thisDay.format());
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
		setLoading(true);

		let hour = currentHour.hour;
		hour = { hour, user: state.user };
		const objIndex = hours.findIndex((obj) => obj.hour == currentHour.hour);
		const updatedObj = { ...hours[objIndex], ...hour };
		const updatedProjects = [
			...hours.slice(0, objIndex),
			updatedObj,
			...hours.slice(objIndex + 1),
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
			<header>
				{state && <div className="user">Olá, {state.user.name}</div>}
				<button className="btn" onClick={() => signout('/condominio')}>
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
							{Object.keys(day).map((el, i) => {
								return (
									<button
										className="hours"
										key={i}
										onClick={() => ConfirmHour(day[el])}
									>
										{day[el].hour}
									</button>
								);
							})}

							<button onClick={() => setDay(false)} className="btn">
								Escolher outro dia
							</button>
						</div>
					)}
				</section>
			) : (
				<div className="reserved">
					Reservado dia {reserved.day} as {reserved.hour}
					<div className="line"></div>
					<button
						className="btn btn--delete"
						onClick={() => removeHour(reserved.hour)}
					>
						Cancelar reserva
					</button>
				</div>
			)}
		</div>
	);
};

export default Reservations;
