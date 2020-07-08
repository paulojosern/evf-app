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
		const auxValues = { ...panelState };
		auxValues[event.target.name] = event.target.value;
		event.target.value === ''
			? inputStatePanel(panelState)
			: inputStatePanel(auxValues);
	};

	const handlefocus = (event) => {
		event.currentTarget.value = '';
		event.currentTarget.placeholder = '';
	};
	const handleBlur = (event) => {
		const name = event.target.name;
		event.currentTarget.value = panelState[name];
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

	const handleCEP = (e) => {
		var x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
		e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2];
		if (e.target.value.length === 9) {
			getCep(e.target.value);
		}
	};

	const handleBlurCEP = (event) => {
		event.currentTarget.value = panelState.address.cep;
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

	const saveStore = async (e) => {
		setLoading(true);
		showLoading(true);
		e.preventDefault();
		const db = await database;
		return db
			.collection('stores')
			.doc(user)
			.set({
				...panelState,
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
	};

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
									onBlur={handleBlur}
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
									onBlur={handleBlur}
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
									<label className="panel__btn--label" htmlFor="cred" id="btn">
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
									<label className="panel__btn--label" htmlFor="money" id="btn">
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
										onChange={handleCEP}
										onBlur={handleBlurCEP}
										placeholder={
											(panelState.address && panelState.address.cep) || ''
										}
										onFocus={handlefocus}
									/>
								</div>
							</div>
							<div className="panel__item">
								{panelState.address && (
									<>
										<h3>{panelState.address.logradouro}</h3>
										<p>{panelState.address.bairro}</p>
									</>
								)}
							</div>
							<div className="line"></div>
							<button
								type="submit"
								className="btn btn--save"
								onClick={(e) => saveStore(e)}
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
					</div>
				))}
		</div>
	);
};
export default PanelStore;
