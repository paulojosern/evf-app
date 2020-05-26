import { useState } from 'react';
import useFormCep from '~/effects/useFormCep';
import axios from 'axios';
import LogoEvf from '~/assets/logos/logo-evf.svg';

export default function Home() {
	const [btn, setBtn] = useState();
	const [data, setData] = useState({});
	const [cep, setCep] = useState();
	const [{ values, loading }, handleChange, handleSubmitCep] = useFormCep();

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
			setCep(e.target.value);
		} else {
			setBtn(false);
			setCep('');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newcep = cep.replace('-', '');
		getCep(newcep);
	};

	const sendConfirm = () => {
		console.log(values);
	};

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
						!data.logradouro ? 'home__cep' : 'home__cep home__cep--show'
					}
				>
					<div className="form__group">
						<label>Informe seu cep</label>
						<input type="text" className="form__input" onChange={handleCEP} />
						{data.erro && <div className="cep__erro">Não encontrado :(</div>}
						<input
							type="submit"
							value="buscar"
							onClick={handleSubmit}
							className={!btn ? 'home__btn' : 'home__btn home__btn--open'}
						/>
					</div>
					<div
						className={
							!data.logradouro ? 'cep__detail' : 'cep__detail cep__detail--show'
						}
					>
						<h4>{data.logradouro}</h4>
						<h5>
							{data.bairro}, {data.uf}
						</h5>
						<div className="form__group cep__form">
							<form onSubmit={handleSubmitCep(sendConfirm)}>
								<input
									type="text"
									className="form__input"
									placeholder="Número"
									name="numero"
									onChange={handleChange}
								/>
								<input
									type="text"
									className="form__input"
									placeholder="Complemento"
									name="complemento"
									onChange={handleChange}
								/>
								<button
									type="submit"
									className={
										values === undefined
											? 'home__btn cep__btn'
											: 'home__btn cep__btn cep__btn--show'
									}
								>
									{loading ? '...' : 'ok'}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
