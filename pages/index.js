import { useState, useEffect } from 'react';

import axios from 'axios';

export default function Home() {
	const [btn, setBtn] = useState();
	const [data, setData] = useState({});
	const [cep, setCep] = useState();

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

	const handleConfirm = () => {};

	return (
		<main className="main">
			<div className="home">
				<div
					className={
						!data.logradouro ? 'home__logo' : 'home__logo home__logo--hide'
					}
				></div>
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
							<form onSubmit={handleConfirm}>
								<input
									type="text"
									className="form__input"
									placeholder="Número"
								/>
								<input
									type="text"
									className="form__input"
									placeholder="Complemento"
								/>
								<input
									type="submit"
									value="Ok"
									className="home__btn cep__btn"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
