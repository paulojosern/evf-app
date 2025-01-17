import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AddressForm from '~/components/address.form';
import { useAddressContext } from '~/context/address.context';
import useLocalStorage from '~/effects/useLocalStorage';

const StoreAddress = ({ setState, state, theme, slug, logo, store, local }) => {
	const cepInput = useRef();
	const [btn, setBtn] = useState();
	const [data, setData] = useState({ empty: true });
	const [inputCep, setInputCep] = useState();
	const [name] = useLocalStorage('address');
	const [address, setAddress] = useState();
	const router = useRouter();
	// consoles.log(theme);

	const {
		addressState: { cep },
	} = useAddressContext();

	useEffect(() => {
		setAddress(name && JSON.parse(name));
	}, [name]);

	useEffect(() => {
		document.querySelector('body').style.overflowY = 'hidden';
		if (cep) {
			getCep(cep);
			setInputCep(cep);
			cepInput.current.value = cep;
		}
	}, []);

	const handleAddress = () => setAddress(undefined);

	const handleConfirm = (e) => {
		e.preventDefault();
		setState(!state);

		router.push(`/loja/${slug}/default`);
	};

	const getCep = (newcep) => {
		axios
			.get(`https://viacep.com.br/ws/${newcep}/json/`)
			.then(function (response) {
				setData(response.data);
				//console.log(response.data);
			})
			.catch((error) => console.log(error));
	};

	const handleCEP = (e) => {
		var x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
		e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2];
		if (e.target.value.length === 9) {
			setBtn(true);
			setInputCep(e.target.value);
		} else {
			setBtn(false);
			setInputCep('');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newcep = inputCep.replace('-', '');
		getCep(newcep);
	};

	return (
		<>
			<div
				className={
					!data.logradouro ? 'home__logo' : 'home__logo home__logo--hide'
				}
				style={{ backgroundColor: `rgba(${theme.color3})` }}
			>
				<div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
				<div className="title">{store}</div>
			</div>
			<div
				className={
					data.empty
						? 'home__cep'
						: !data.logradouro
						? data.erro
							? 'home__cep home__cep--erro'
							: 'home__cep home__cep--show'
						: 'home__cep home__cep--show'
				}
				style={{ backgroundColor: `${theme.color2}` }}
			>
				<div className="form__group">
					{address !== undefined ? (
						<div className="cep__address">
							<label>Entregar nesse endereço?</label>
							<h3>
								{address.rua}, {address.numero}
							</h3>
							{address.complemento && <h4>{address.complemento}</h4>}
							<h4>{address.bairro}</h4>
							<div className="flex--row center">
								<button className="btn btn--default" onClick={handleAddress}>
									Não
								</button>
								<button className="btn" onClick={handleConfirm}>
									Sim
								</button>
							</div>
						</div>
					) : (
						<div className="content">
							<label>Informe seu cep</label>
							<input
								type="text"
								className="form__input"
								onChange={handleCEP}
								ref={cepInput}
							/>
						</div>
					)}

					<div className="content">
						{data.erro && <div className="cep__erro">Não enconntrado :(</div>}
						<input
							type="submit"
							value="buscar"
							onClick={handleSubmit}
							className={!btn ? 'home__btn' : 'home__btn home__btn--open'}
						/>
					</div>
				</div>
			</div>
			<div
				className={
					data.erro
						? 'home__detail  home__detail--erro'
						: !data.logradouro
						? 'home__detail'
						: 'home__detail home__detail--show'
				}
			>
				<h4>{data.logradouro}</h4>
				<h5>
					{data.bairro}, {data.uf}
				</h5>
				<AddressForm
					cep={inputCep}
					local={local}
					rua={data.logradouro}
					bairro={data.bairro}
					href={`/loja/${slug}/default`}
				/>
			</div>
		</>
	);
};

export default StoreAddress;
