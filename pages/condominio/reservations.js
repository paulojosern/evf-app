import { useState, useEffect } from 'react';
import { useAuth } from '~/store/Auth';

const Reservations = () => {
	const { signout, getDayFromDB } = useAuth();
	const [calendar, setCalendar] = useState([]);
	const [day, setDay] = useState([]);

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
		const currentDay = await getDayFromDB(value);
		currentDay === undefined ? setDay(hours) : setDay(currentDay.hours);
	};

	return (
		<div className="scheduling__panel">
			<header>
				<div className="user">Olá</div>
				<button className="header__account" onClick={() => signout()}>
					Sair
				</button>
			</header>
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
								<div className="hours" key={i}>
									{day[el].hour}
								</div>
							);
						})}
						<button onClick={() => setDay(false)} className="btn">
							Escolher outro dia
						</button>
					</div>
				)}
			</section>
		</div>
	);
};

export default Reservations;
