import { useState, useEffect } from 'react';
import { database } from '~/services/config';
import { usePanelContext } from '~/context/panel.context';
import useGetCep from '~/effects/useGetCep';
import ColorPicker from '~/components/panel.picker';
import PanelBase64 from '~/components/panel.base64';
import PanelStoreImage from '~/components/panel.store.image';

const PanelStore = ({ toogleStore, user, setMsg }) => {
	const [colors, setColors] = useState({});
	const [loading, setLoading] = useState(false);
	const [{ data }, getCep] = useGetCep();
	const { panelState, inputStatePanel, showLoading } = usePanelContext();

	useEffect(() => {
		panelState &&
			setColors({
				color1: panelState.colors ? panelState.colors.color1 : '0,0,0,1',
				color2: panelState.colors ? panelState.colors.color2 : '0,0,0,1',
				color3: panelState.colors ? panelState.colors.color3 : '0,0,0,1',
			});
	}, [panelState]);

	// panelState && console.log('panelState', panelState);

	useEffect(() => {
		data && inputStatePanel({ ...panelState, address: data });
	}, [data]);

	const handleChange = (event) => {
		event.target.classList.remove('panel__input--error');
		if (event.target.name === 'cep') {
			var x = event.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
			event.target.value = !x[2] ? x[1] : x[1] + '-' + x[2];
			if (event.target.value.length === 9) {
				getCep(event.target.value);
			}
		} else if (event.target.name === 'numero') {
			let address = {
				...panelState.address,
				[event.target.name]: event.target.value,
			};
			if (event.target.value === '') {
				const { [event.target.name]: remove, ...rest } = address;
				address = rest;
			}
			const panel = { ...panelState, address };
			inputStatePanel(panel);
		} else {
			const auxValues = { ...panelState };
			auxValues[event.target.name] = event.target.value;
			const removeProp = event.target.name;
			const { [removeProp]: remove, ...rest } = panelState;
			event.target.value === ''
				? inputStatePanel(rest)
				: inputStatePanel(auxValues);
		}
	};

	const handlefocus = (event) => {
		event.currentTarget.value = event.currentTarget.placeholder;
	};

	const handleCheckbox = (e) => {
		inputStatePanel({
			...panelState,
			payments: {
				...panelState.payments,
				[e.target.name]: e.target.checked,
			},
		});
	};

	const formatColor = (color) => {
		const mycolor = color.split(',');
		const obj = {
			r: mycolor[0],
			g: mycolor[1],
			b: mycolor[2],
			a: mycolor[3],
		};
		return obj;
	};

	const createSlug = (str) => {
		const slug =
			str &&
			str
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replaceAll(' ', '-')
				.toLowerCase();
		return slug;
	};

	const saveStore = async () => {
		if (
			panelState &&
			panelState.name &&
			panelState.description &&
			panelState.address.cep &&
			panelState.address.numero
		) {
			setLoading(true);
			showLoading(true);

			const db = await database;
			return db
				.collection('stores')
				.doc(user)
				.set({
					...panelState,
					slug: createSlug(panelState.name),
					id: '01',
				})
				.then(() => {
					setMsg({
						active: true,
						type: 'sucesso',
						message: 'Alterado com sucesso',
					});
					setLoading(false);
					showLoading(false);
				});
		}
		// else {
		// 	console.log('não tem');
		// }
	};

	const handleSubmitValidation = (callback) => (e) => {
		e.preventDefault();
		let arr = [...e.target];
		arr = arr.filter((el) => el.className === 'panel__input');
		arr.map((el) => {
			el.placeholder === '' && el.classList.add('panel__input--error');
		});
		callback();
	};

	// panelState && console.log(panelState);
	return (
		<div className={toogleStore ? 'about about--hidden' : 'about'}>
			{!toogleStore &&
				(!panelState ? (
					<div className="about__item">
						<div className="loader">
							<div className="loader__circle"></div>
						</div>
					</div>
				) : (
					<form onSubmit={handleSubmitValidation(saveStore)}>
						<div className="about__item panel__item--inline between">
							<div className="item--small">
								<PanelBase64 setMsg={setMsg} />
								<PanelStoreImage />
							</div>
							<div className="item--large">
								<div className="panel__item">
									<label className="panel__label">Nome da loja</label>
									<input
										type="text"
										name="name"
										className="panel__input"
										onChange={handleChange}
										onFocus={handlefocus}
										placeholder={panelState && panelState.name}
									/>
								</div>
								<div className="panel__item">
									<label className="panel__label">Descrição da loja</label>
									<input
										type="text"
										name="description"
										className="panel__input"
										onChange={handleChange}
										onFocus={handlefocus}
										placeholder={panelState && panelState.description}
									/>
								</div>
								<div className="panel__item" style={{ zIndex: '10' }}>
									<label className="panel__label">Cores</label>
									{colors.color1 && (
										<div className="flex--row">
											<ColorPicker
												colorCurrent="color1"
												values={panelState}
												setValues={inputStatePanel}
												setColors={setColors}
												color={colors.color1 && formatColor(colors.color1)}
											/>

											<ColorPicker
												colorCurrent="color2"
												values={panelState}
												setValues={inputStatePanel}
												setColors={setColors}
												color={colors.color2 && formatColor(colors.color2)}
											/>

											<ColorPicker
												colorCurrent="color3"
												values={panelState}
												setValues={inputStatePanel}
												setColors={setColors}
												color={colors.color3 && formatColor(colors.color3)}
											/>
										</div>
									)}
								</div>
								<div className="panel__item" style={{ zIndex: '1' }}>
									<label className="panel__label">Formas de pagamento</label>
									<div className="panel__btn">
										<input
											type="checkbox"
											id="deb"
											className="panel__btn--input"
											name="Crédito"
											defaultChecked={
												panelState.payments && panelState.payments.Crédito
											}
											onChange={handleCheckbox}
										/>
										<label className="panel__btn--label" htmlFor="deb" id="btn">
											Cartão Crédito
										</label>
										<input
											type="checkbox"
											id="cred"
											className="panel__btn--input"
											name="Débito"
											defaultChecked={
												panelState.payments && panelState.payments.Débito
											}
											onChange={handleCheckbox}
										/>
										<label
											className="panel__btn--label"
											htmlFor="cred"
											id="btn"
										>
											Cartão de Débito
										</label>

										<input
											type="checkbox"
											id="ref"
											className="panel__btn--input"
											name="Refeição"
											defaultChecked={
												panelState.payments && panelState.payments.Refeição
											}
											onChange={handleCheckbox}
										/>
										<label className="panel__btn--label" htmlFor="ref" id="btn">
											Refeição
										</label>
										<input
											type="checkbox"
											id="money"
											className="panel__btn--input"
											name="Dinheiro"
											defaultChecked={
												panelState.payments && panelState.payments.Dinheiro
											}
											onChange={handleCheckbox}
										/>
										<label
											className="panel__btn--label"
											htmlFor="money"
											id="btn"
										>
											Dinheiro
										</label>
									</div>
								</div>
								<div className="panel__item">
									<div className="item item--small">
										<label className="panel__label">Cep</label>
										<input
											type="text"
											name="cep"
											className="panel__input"
											className="panel__input"
											onChange={handleChange}
											onFocus={handlefocus}
											placeholder={panelState.address && panelState.address.cep}
											onFocus={handlefocus}
										/>
									</div>
								</div>
								{panelState.address ? (
									<>
										<div className="panel__item">
											<h3>{panelState.address.logradouro}</h3>
											<p>{panelState.address.bairro}</p>
										</div>
										<br />
										<div className="item--thin">
											<label className="panel__label">Número</label>
											<input
												type="text"
												name="numero"
												className="panel__input"
												onChange={handleChange}
												onFocus={handlefocus}
												placeholder={panelState && panelState.address.numero}
												//onFocus={handlefocus}
												maxLength={10}
											/>
										</div>
									</>
								) : (
									' Informe seu CEP'
								)}
								<div className="line"></div>
								<button
									type="submit"
									className="btn btn--save"
									// onClick={(e) => saveStore(e)}
								>
									{!loading ? (
										'Publicar'
									) : (
										<div className="loader">
											<div className="loader__circle loader__circle--mini"></div>
										</div>
									)}
								</button>
							</div>
						</div>{' '}
					</form>
				))}
		</div>
	);
};
export default PanelStore;
