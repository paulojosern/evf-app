import { useRouter } from 'next/router';
import axios from 'axios';
import useFormCep from '~/effects/useFormCep';
import { useAddressContext } from '~/context/address.context';
import useLocalStorage from '~/effects/useLocalStorage';
import { useState, useEffect } from 'react';

const AddressForm = ({ cep, rua, bairro, href, input }) => {
	const [{ values, loading }, handleChange, handleSubmitCep] = useFormCep();
	const { inputAddress } = useAddressContext();
	const [distance, setDistance] = useState();
	const [loader, setLoader] = useState(false);
	const [name, setName] = useLocalStorage('address');
	// const address = name && JSON.parse(name);
	// href && console.log(href);

	const router = href !== undefined && useRouter();
	const sendConfirm = (e) => {
		e.preventDefault();
		const newAddress = {
			cep,
			rua,
			bairro,
			...values,
		};
		inputAddress(newAddress);
		input && input.current.click();
		href !== undefined && router.push(href);
		setName(JSON.stringify(newAddress));
	};

	const GOOGLE_API_KEY = 'AIzaSyCl-OZndF-w6neMJI1zauQ8v_umrIIGKcY';

	const getDistance = (userLocation, truckLocation) => {
		setLoader(true);
		// let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation}&destinations=${truckLocation}&departure_time=now&key=${GOOGLE_API_KEY}`;
		let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation}&destinations=${truckLocation}&departure_time=now&key=${GOOGLE_API_KEY}`;
		axios
			.get(url, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(function (response) {
				//setGeolocale(response.data);
				setDistance(response.data.rows[0].elements[0]);
				setLoader(false);
			})
			.catch((error) => console.log(error));
	};
	// const lat1 = '-23.5010279';
	// const lon1 = '-46.613732';

	// const haversine = (lat2, lon2) => {
	// 	const R = 6371e3; // metres
	// 	const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
	// 	const φ2 = (lat2 * Math.PI) / 180;
	// 	const Δφ = ((lat2 - lat1) * Math.PI) / 180;
	// 	const Δλ = ((lon2 - lon1) * Math.PI) / 180;

	// 	const a =
	// 		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
	// 		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	// 	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	// 	const d = R * c; // in metres
	// 	console.log('distancia:', d);
	// };
	// geolocale &&
	// 	haversine(
	// 		geolocale.results[0].geometry.location.lat,
	// 		geolocale.results[0].geometry.location.lng
	// 	);
	const currentAddress = 'Rua Maria Candida, 358';
	const handleValidChange = (e) => {
		if (e.target.value.length >= 1) {
			const address = rua + e.target.value;
			getDistance(currentAddress, address);
			handleChange(e);
		}
	};

	// useEffect(() => {
	// 	!distance
	// 		? console.log('nem existe ainda')
	// 		: distance.distance.value > 5000
	// 		? console.log('naoooopode', distance.distance.value)
	// 		: console.log('pode', distance.distance.value);
	// }, [distance]);

	return (
		<div className="form__group cep__form">
			{loader && (
				<div className="form__group--loading">
					<div className="loader loader--position">
						<span></span>
					</div>
				</div>
			)}
			<form onSubmit={handleSubmitCep(sendConfirm)}>
				<div className="form__item form__item--address">
					<input
						type="text"
						className="form__input"
						placeholder="Nº"
						name="numero"
						onBlur={handleValidChange}
					/>
					<input
						type="text"
						className="form__input"
						placeholder="Complemento"
						name="complemento"
						onChange={handleChange}
					/>
				</div>
				<a
					// href={href}
					onClick={sendConfirm}
					className={
						!distance
							? 'form__btn'
							: distance.distance.value > 5000
							? 'form__btn'
							: 'form__btn form__btn--show'
						// values === undefined ? 'form__btn' : 'form__btn form__btn--show'
					}
				>
					{loading ? '...' : 'Ok, continuar'}
				</a>
				{!distance ? (
					console.log('nem existe ainda')
				) : distance.distance.value > 5000 ? (
					<div className="message">
						<h3>Infelizmente não entregamos nesse endereço :(</h3>
						<br />
						Informe um novo cep
					</div>
				) : (
					<div></div>
				)}
			</form>
		</div>
	);
};

export default AddressForm;
