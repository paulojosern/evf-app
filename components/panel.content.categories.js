import { useState, useEffect } from 'react';
import { usePanelContext } from '~/context/panel.context';
import ProductContent from '~/components/panel.products';
import IconDelete from '~/assets/logos/icon-garbage.svg';
import { price, priceData, handleInput, handleUp, rnd } from '~/effects/mask';

const PanelCategories = ({ currentCategorie, id }) => {
	const [categorie, setCategorie] = useState();
	const [newProduct, setNewProduct] = useState();
	const { panelCategories, inputCategories, showConfirm } = usePanelContext();

	// panelCategories && console.log(panelCategories);
	const [valide, setValide] = useState({
		addProduct: false,
		toogleProduct: false,
		addCategorie: false,
		toogleOptions: false,
	});

	useEffect(() => {
		currentCategorie && setCategorie(currentCategorie);
	}, [currentCategorie]);

	const key = categorie && categorie.category;

	const handleChangeCategorie = (event) => {
		const products = categorie.products;
		const newValue = {
			products,
			[event.target.name]: event.target.value,
		};
		event.target.value === ''
			? setCategorie(categorie)
			: setCategorie(newValue);
	};

	const handleChangeNewProduct = (event) => {
		const auxValues = { ...newProduct };
		if (event.target.name === 'price') {
			let price = priceData(event.target.value);
			price = parseFloat(price);
			auxValues[event.target.name] = price;
		} else {
			auxValues[event.target.name] = event.target.value;
		}
		event.target.value === ''
			? setNewProduct(newProduct)
			: setNewProduct(auxValues);
	};

	const saveNewProduct = (e) => {
		e.preventDefault();

		let products = categorie.products;
		products = products.concat([{ id: rnd(), ...newProduct }]);

		const updatedObj = { ...categorie, products };

		const objIndex = panelCategories.findIndex(
			(obj) => obj.id === categorie.id
		);

		const updatedProjects = [
			...panelCategories.slice(0, objIndex),
			updatedObj,
			...panelCategories.slice(objIndex + 1),
		];

		inputCategories(updatedProjects);

		setValide({ ...valide, toogleProduct: false });
		e.target.description.value = '';
		e.target.detail.value = '';
		e.target.price.value = '';
	};

	const removeCategorie = (e) => {
		e.preventDefault();
		let categories = panelCategories;
		categories = categories.filter((prod) => prod.id !== categorie.id);
		inputCategories(categories);
	};

	const setFirstItem = () => {
		let categories = panelCategories;
		categories = categories.filter((prod) => prod.id !== categorie.id);
		let actualCategorie = panelCategories.find(
			(prod) => prod.id === categorie.id
		);
		actualCategorie = { ...actualCategorie };
		console.log(panelCategories);
		categories = [actualCategorie, ...categories];
		inputCategories(categories);
	};

	const ValidePrice = (e) => {
		handleChangeNewProduct(e);
		e.target.value = price(e.target.value);
	};

	const handleFocus = (e) => {
		const auxValues = { ...categorie };
		e.target.value = auxValues[event.target.name];
	};

	return categorie ? (
		<div className="content__product">
			<input
				type="radio"
				name="categ"
				className="content__input"
				id={`categ${key}`}
			/>
			<label className="content__label " htmlFor={`categ${key}`}>
				<div className="item__header">
					{categorie.category && categorie.category}
				</div>
				<div className="flex--row middle end">
					<button
						onClick={setFirstItem}
						className="content__order"
						flow="left"
						tooltip={id > 0 ? 'Colocar em primeiro' : 'Primeiro da lista'}
					>
						{id + 1}
					</button>
					{id > 0 && (
						<button
							onClick={() =>
								showConfirm({
									active: true,
									msg: 'Deseja remover ' + categorie.category,
									function: (e) => removeCategorie(e),
								})
							}
							className="btn--icon-delete"
						>
							<IconDelete />
						</button>
					)}
				</div>
			</label>

			<div className="content__initial">
				<div className="panel__item panel__item--inline">
					<div className="item">
						<label className="panel__label">Titulo da categoria</label>
						<input
							type="text"
							name="category"
							className="panel__input"
							onChange={handleChangeCategorie}
							onFocus={handleFocus}
							placeholder={categorie.category && categorie.category}
						/>
					</div>
					<div className="item">
						<label className="panel__label">Titulo da layout</label>
						<div className="panel__btn panel__btn--inline">
							<input
								type="radio"
								id={`l1${key}`}
								className="panel__btn--input"
								name={`layout${key}`}
								value="vertical"
								defaultChecked={categorie.layout === 'vertical' ? true : false}
							/>
							<label
								className="panel__btn--label"
								htmlFor={`l1${key}`}
								id="btn"
							>
								Horizontal
							</label>
							<input
								type="radio"
								id={`l${key}`}
								className="panel__btn--input"
								name={`layout${key}`}
								value="column"
								defaultChecked={categorie.layout === 'column' ? true : false}
							/>
							<label className="panel__btn--label" htmlFor={`l${key}`} id="btn">
								Vertical
							</label>
						</div>
					</div>
				</div>

				<div className={!valide.toogleProduct ? 'panel__item' : 'hidden'}>
					<label className="panel__label">Produtos:</label>
					{categorie.products &&
						categorie.products
							// .sort(
							// 	({ id: previousID }, { id: currentID }) =>
							// 		previousID - currentID
							// )
							.map((products, index) => {
								return (
									<ProductContent
										key={index}
										state={products}
										setCategorie={setCategorie}
										categorie={categorie}
										id={index}
									/>
								);
							})}
				</div>
				<div className={!valide.toogleProduct ? 'panel__item' : 'hidden'}>
					<button
						className="btn btn--green"
						onClick={() => setValide({ ...valide, toogleProduct: true })}
					>
						Adicionar produto
					</button>
				</div>
				<div className={valide.toogleProduct ? 'product__content' : 'hidden'}>
					<h3 className="panel__item">Novo produto:</h3>
					<br></br>
					<form onSubmit={saveNewProduct}>
						<div className="panel__item">
							<label className="panel__label">Descrição</label>
							<input
								type="text"
								name="description"
								className="panel__input"
								// placeholder={product && product.description}
								onChange={handleChangeNewProduct}
								required
							/>
						</div>
						<div className="panel__item">
							<label className="panel__label">Detalhes do produto</label>
							<input
								type="text"
								name="detail"
								className="panel__input"
								// placeholder={product && product.detail}
								onChange={handleChangeNewProduct}
								required
							/>
						</div>
						<div className="panel__item panel__item--inline between bottom reverse">
							<div className="item--ti">
								<label className="panel__label">Preço do produto</label>
								<input
									type="text"
									name="price"
									className="panel__input"
									onChange={ValidePrice}
									onBlur={handleInput}
									onKeyUp={handleUp}
									required
								/>
							</div>
							<div className="item flex reverse">
								<button type="submit" className="btn">
									Salvar produto
								</button>
								<button
									type="button"
									className="btn btn--delete"
									onClick={() => setValide({ ...valide, toogleProduct: false })}
								>
									excluir
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	) : (
		<div>loading</div>
	);
};
export default PanelCategories;
