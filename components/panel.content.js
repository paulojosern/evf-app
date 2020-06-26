import { useState, useEffect } from 'react';
import { database } from '~/services/config';
import { usePanelContext } from '~/context/panel.context';
import PanelContentProducts from '~/components/panel.content.products';

const PanelContent = ({ user, setMsg, toogleStore }) => {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState();
	const [loading, setLoading] = useState(false);
	const [valide, setValide] = useState({
		addProduct: false,
		toogleProduct: false,
		addCategorie: false,
		toogleCategorie: false,
	});
	const { panelCategories, panelState, inputCategories } = usePanelContext();

	useEffect(() => {
		panelState && inputCategories(panelState.categories);
	}, [panelState]);

	useEffect(() => {
		products &&
			setCategories({
				...categories,
				products: [{ id: rnd(), ...products }],
			});
	}, [products]);

	function rnd() {
		return Math.floor(Math.random() * (9000 - 100 + 1) + 100);
	}

	const handleChange = (event) => {
		const auxValues = { ...categories };
		auxValues[event.target.name] = event.target.value;
		event.target.value === ''
			? (setCategories(categories),
			  setValide({ ...valide, toogleProduct: false }))
			: (setCategories(auxValues),
			  setValide({ ...valide, toogleProduct: true }));
	};

	const handleChangeProduct = (event) => {
		const auxValues = { ...products };
		auxValues[event.target.name] = event.target.value;
		event.target.value === '' ? setProducts(products) : setProducts(auxValues);
	};

	const handleProduct = (e) => {
		e.preventDefault();
		e.target.category.value = '';
		e.target.description.value = '';
		e.target.detail.value = '';
		e.target.price.value = '';
		e.target.layout.defaultChecked = '';
		let newCategorie = panelCategories;
		newCategorie.push({ id: rnd(), ...categories });
		inputCategories(newCategorie);
		setValide({
			...valide,
			toogleCategorie: false,
			toogleProduct: false,
			addProduct: false,
		});
	};

	const handleNewProduct = (e) => {
		e.preventDefault();
		setValide({ ...valide, addProduct: true });
	};

	const handleLayout = (e) => {
		setCategories({
			...categories,
			[e.target.name]: e.target.value,
		});
	};

	const closeCategorie = (e) => {
		e.preventDefault();
		setValide({ ...valide, toogleCategorie: false });
	};

	const saveStore = async (e) => {
		setLoading(true);
		e.preventDefault();
		const db = await database;
		return db
			.collection('stores')
			.doc(user)
			.set({
				id: '01',
				...panelState,
				categories: panelCategories,
			})
			.then(() => {
				setMsg({
					active: true,
					type: 'sucesso',
					message: 'Alterado com sucesso',
				});
				setLoading(false);
			});
	};

	return !panelState ? (
		<div className="content">
			<div className="item">
				<div className="item__header">
					<div className="loader">
						<div className="loader__circle"></div>
					</div>
				</div>
			</div>
			<br />
		</div>
	) : (
		<div className={toogleStore ? 'content' : 'content content--hidden'}>
			{toogleStore &&
				panelCategories &&
				panelCategories
					.sort(function (a, b) {
						return b.yes - a.yes;
					})
					.map((item, id) => (
						<PanelContentProducts currentCategorie={item} key={id} />
					))}
			<div
				className={
					valide.toogleCategorie
						? 'item item--none'
						: 'item flex between animation--categorie'
				}
			>
				<button
					className="btn"
					onClick={() => setValide({ ...valide, toogleCategorie: true })}
				>
					Adicionar categoria
				</button>
				{panelCategories[0] && (
					<button
						className="btn btn--save"
						// onClick={publicData}
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
				)}
			</div>
			<div
				className={
					valide.toogleCategorie ? 'item item--show' : 'item item--hide'
				}
			>
				<form onSubmit={handleProduct}>
					<div className="panel__item panel__item--inline">
						<div className="item item--medium">
							<label className="panel__label">Titulo da categoria</label>
							<input
								type="text"
								name="category"
								className="panel__input"
								onChange={handleChange}
							/>
						</div>
						<div className="item">
							<label className="panel__label">Titulo da layout</label>

							<div className="panel__btn">
								<input
									type="radio"
									id="vertical"
									className="panel__btn--input"
									name="layout"
									value="vertical"
									onChange={handleLayout}
								/>
								<label
									className="panel__btn--label"
									htmlFor="vertical"
									id="btn"
								>
									Horizontal
								</label>
								<input
									type="radio"
									id="column"
									className="panel__btn--input"
									name="layout"
									value="column"
									onChange={handleLayout}
								/>
								<label className="panel__btn--label" htmlFor="column" id="btn">
									Vertical
								</label>
							</div>
						</div>
					</div>
					<div className="line"></div>
					<div className={valide.addProduct ? 'hidden' : 'flex between'}>
						{valide.toogleProduct && (
							<button className="btn" onClick={(e) => handleNewProduct(e)}>
								Adicionar produto
							</button>
						)}
						<button
							className="btn btn--delete"
							onClick={(e) => closeCategorie(e)}
						>
							Excluir categoria
						</button>
					</div>
					<div
						className={
							valide.addProduct
								? 'item__product item__product--show'
								: 'item__product'
						}
					>
						<div className="panel__item">
							<label className="panel__label">Descrição</label>
							<input
								type="text"
								name="description"
								className="panel__input"
								onChange={handleChangeProduct}
							/>
						</div>
						<div className="panel__item">
							<label className="panel__label">Detalhes do produto</label>
							<input
								type="text"
								name="detail"
								className="panel__input"
								onChange={handleChangeProduct}
							/>
						</div>
						<div className="panel__item panel__item--inline between bottom">
							<div className="item item--small">
								<label className="panel__label">Preço do produto</label>
								<input
									type="text"
									name="price"
									className="panel__input"
									onChange={handleChangeProduct}
								/>
							</div>
							<div className="item item--small right">
								<button type="submit" className="btn">
									Salvar produto
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default PanelContent;
