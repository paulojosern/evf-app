import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AddressForm from '~/components/address.form';
import { useAddressContext } from '~/context/address.context';
import useLocalStorage from '~/effects/useLocalStorage';
import LogoEvf from '~/assets/logos/logo-evf.svg';

const Index = () => {
	const [btn, setBtn] = useState();
	const [data, setData] = useState({ empty: true });
	const [inputCep, setInputCep] = useState();
	const [name] = useLocalStorage('address');
	const cepInput = useRef();
	const address = name && JSON.parse(name);

	name && console.log(address.cep);

	const {
		addressState: { cep, numero, complemento, visible },
	} = useAddressContext();

	useEffect(() => {
		document.querySelector('body').style.overflowY = 'hidden';
		if (cep) {
			getCep(cep);
			setInputCep(cep);
			cepInput.current.value = cep;
		}
	}, []);

	const getCep = (newcep) => {
		axios
			.get(`https://viacep.com.br/ws/${newcep}/json/`)
			.then(function (response) {
				setData(response.data);
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

	data && console.log(data);
	return (
		<main className="main">
			<div className="home">
				<div
					className={
						!data.logradouro ? 'home__logo' : 'home__logo home__logo--hide'
					}
				>
					<LogoEvf />
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
				>
					<div className="form__group">
						<label>Informe seu cep</label>
						<input
							type="text"
							className="form__input"
							onChange={handleCEP}
							ref={cepInput}
							value={name && address.cep}
						/>
						{data.erro && <div className="cep__erro">Não encontrado :(</div>}
						<input
							type="submit"
							value="buscar"
							onClick={handleSubmit}
							className={!btn ? 'home__btn' : 'home__btn home__btn--open'}
						/>
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
						rua={data.logradouro}
						bairro={data.bairro}
						href="/default"
					/>
				</div>
			</div>
		</main>
	);
};

// Index.getInitialProps = async () => {
// 	//const localStorageAddress = await localStorage.getItem('address');
// 	const localStorageAddress =
// 		(await JSON.parse(localStorage.getItem('address'))) || null;
// 	// const [address, setAddress] = useState();
// 	// await setAddress(JSON.parse(localStorageAddress));
// 	console.log('address', localStorageAddress);
// 	return localStorageAddress;
// };

export default Index;
