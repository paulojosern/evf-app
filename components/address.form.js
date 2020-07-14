import { useState } from 'react';
import { useRouter } from 'next/router';
import useFormCep from '~/effects/useFormCep';
import { useAddressContext } from '~/context/address.context';
import useLocalStorage from '~/effects/useLocalStorage';
import MapContainer from '~/components/map.container';

const AddressForm = ({ cep, rua, bairro, href, input }) => {
	const [{ values, loading }, handleChange, handleSubmitCep] = useFormCep();
	const { inputAddress } = useAddressContext();
	const [distance, setDistance] = useState();
	const [loader, setLoader] = useState(false);
	const [name, setName] = useLocalStorage('address');
	const router = href !== undefined && useRouter();
	const [state, setState] = useState({ visible: false });
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

	const getDistance = (currentAddress, destination) => {
		// setLoader(true);
		setState({
			visible: true,
			currentAddress,
			destination,
		});
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
			const destination = rua + e.target.value;
			getDistance(currentAddress, destination);

			handleChange(e);
		}
	};

	distance && console.log(distance);
	return (
		<div className="form__group cep__form">
			{state.visible && (
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
			<MapContainer
				setDistance={setDistance}
				state={state}
				setState={setState}
			/>
		</div>
	);
};

export default AddressForm;
