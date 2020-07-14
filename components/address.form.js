import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useFormCep from '~/effects/useFormCep';
import { useAddressContext } from '~/context/address.context';
import useLocalStorage from '~/effects/useLocalStorage';
import MapContainer from '~/components/map.container';

const AddressForm = ({ cep, rua, bairro, href, input, recused }) => {
	const [{ values, loading }, handleChange, handleSubmitCep] = useFormCep();
	const { inputAddress } = useAddressContext();
	const [distance, setDistance] = useState();
	const [name, setName] = useLocalStorage('address');
	const router = href !== undefined && useRouter();
	const [state, setState] = useState({ visible: false });
	const number = useRef();
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
		setState({
			visible: true,
			recused: false,
			currentAddress,
			destination,
		});
	};

	const currentAddress = 'Rua Maria Candida, 358';
	const handleValidChange = (e) => {
		if (e.target.value.length >= 1) {
			const destination = rua + e.target.value;
			getDistance(currentAddress, destination);
			handleChange(e);
		}
	};

	useEffect(() => {
		cep &&
			setState({
				...state,
				recused: false,
			});
	}, [cep]);

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
						ref={number}
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
				{state.recused && (
					<div className="message">
						<h3>Infelizmente não entregamos nesse endereço :(</h3>
						<br />
						Informe um novo cep
					</div>
				)}
			</form>
			<MapContainer
				setDistance={setDistance}
				state={state}
				setState={setState}
				number={number}
			/>
		</div>
	);
};

export default AddressForm;
