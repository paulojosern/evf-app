import { useState, useEffect } from 'react';
import { usePanelContext } from '~/context/panel.context';
import ProductImages from '~/components/panel.products.images';
import OptionAdd from '~/components/panel.products.option.add';
import Option from '~/components/panel.products.option';
import { price, priceData, handleInput } from '~/effects/mask';

const ProductContent = ({ state, categorie, id }) => {
	const [product, setProduct] = useState();
	const [toogle, setToogle] = useState(false);
	const [toogleOption, setToogleOption] = useState(false);
	const [pics, setPics] = useState([]);
	const { panelCategories, inputCategories } = usePanelContext();
	const sub = product && product.description.substr(0, 5);
	const newid = `${id}${sub}`;

	useEffect(() => {
		state && setProduct(state);
	}, [state]);

	useEffect(() => {
		product && setPics(product.pics || []);
	}, [product]);

	const handleChangeProduct = (event) => {
		const auxValues = { ...product };
		if (event.target.name === 'price') {
			let price = priceData(event.target.value);
			price = parseFloat(price);
			auxValues[event.target.name] = price;
		} else {
			auxValues[event.target.name] = event.target.value;
		}
		event.target.value === '' ? setProduct(product) : setProduct(auxValues);
	};

	const saveProduct = (e) => {
		e.preventDefault();

		let products = categorie.products;

		products = products.filter((prod) => prod.id !== product.id);

		const prodIndex = categorie.products.findIndex(
			(prod) => prod.id === product.id
		);

		const updatedProd = { ...product, pics };

		products = [
			...categorie.products.slice(0, prodIndex),
			updatedProd,
			...categorie.products.slice(prodIndex + 1),
		];

		const objIndex = panelCategories.findIndex(
			(obj) => obj.id === categorie.id
		);

		const updatedObj = { ...panelCategories[objIndex], products };

		const updatedCateg = [
			...panelCategories.slice(0, objIndex),
			updatedObj,
			...panelCategories.slice(objIndex + 1),
		];
		// console.log(updatedProd);

		inputCategories(updatedCateg);

		e.target.description.value = '';
		e.target.detail.value = '';
		e.target.price.value = '';
	};

	const removeProduct = (e) => {
		e.preventDefault();
		let products = categorie.products;
		products = products.filter((prod) => prod.id !== product.id);

		let categories = panelCategories;
		categories = categories.filter((cat) => cat.id !== categorie.id);

		categories = categories.concat([{ ...categorie, products }]);
		inputCategories(categories);
		setToogle(false);
	};

	const removeOption = (e, id) => {
		e.preventDefault();

		let options = product.options;
		options = options.filter((op) => op.id !== id);

		const updatedProd = { ...product, options };

		let products = categorie.products;
		const prodIndex = products.findIndex((prod) => prod.id === product.id);

		products = [
			...categorie.products.slice(0, prodIndex),
			updatedProd,
			...categorie.products.slice(prodIndex + 1),
		];

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
	};

	const ValidePrice = (e) => {
		handleChangeProduct(e);
		e.target.value = price(e.target.value);
	};

	const handleFocus = (e) => {
		const auxValues = { ...product };
		e.target.value = auxValues[event.target.name];
	};

	const setFirst = () => {
		let products = categorie.products;
		products = products.reduce((acc, element) => {
			if (element.id === product.id) {
				return [element, ...acc];
			}
			return [...acc, element];
		}, []);
		const index = panelCategories.findIndex((obj) => obj.id === categorie.id);
		const updated = { ...panelCategories[index], products };
		const updatedAll = [
			...panelCategories.slice(0, index),
			updated,
			...panelCategories.slice(index + 1),
		];
		inputCategories(updatedAll);
		setToogle(false);
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

	const str =
		categorie &&
		product &&
		createSlug(categorie.category) + '_' + createSlug(product.description);

	return (
		<div className="product">
			<label className="product__label " htmlFor="pro1">
				<label
					className="product__btn between flex middle"
					onClick={() => setToogle(!toogle)}
				>
					<div className="item__header">{product && product.description}</div>
				</label>
				<div className={toogle ? 'product__content' : 'hidden'}>
					<form onSubmit={saveProduct}>
						<div className="panel__item">
							<label className="panel__label">Fotos</label>
							<ProductImages
								id={newid}
								pics={pics}
								setPics={setPics}
								slug={str}
							/>
						</div>
						<div className="panel__item">
							<label className="panel__label">Descrição</label>
							<input
								type="text"
								name="description"
								className="panel__input"
								placeholder={product && product.description}
								onFocus={handleFocus}
								onChange={handleChangeProduct}
							/>
						</div>
						<div className="panel__item">
							<label className="panel__label">Detalhes do produto</label>
							<input
								type="text"
								name="detail"
								className="panel__input"
								placeholder={product && product.detail}
								onFocus={handleFocus}
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
									placeholder={product && product.price}
									onChange={ValidePrice}
									onFocus={handleFocus}
									onBlur={handleInput}
									// onKeyUp={handleUp}
								/>
							</div>
							<div className="item flex right end">
								<button
									type="button"
									className={
										categorie.products.length > 1 ? 'btn btn--delete' : 'hidden'
									}
									onClick={removeProduct}
								>
									excluir
								</button>
								{id > 0 && (
									<button
										onClick={setFirst}
										className="btn btn--green"
										tooltip={
											id > 0 ? 'Colocar em primeiro' : 'Primeiro da lista'
										}
										flow="left"
									>
										Subir
									</button>
								)}
								<button type="submit" className="btn btn--green">
									Salvar
								</button>
							</div>
						</div>
					</form>
					<Option product={product} removeOption={removeOption} />
					<button
						className={!toogleOption ? 'btn btn--pink' : 'hidden'}
						onClick={() => setToogleOption(!toogleOption)}
					>
						Adicionar Opção
					</button>
					<OptionAdd
						categorie={categorie}
						product={product}
						toogleOption={toogleOption}
						setToogleOption={setToogleOption}
					/>
				</div>
			</label>
		</div>
	);
};
export default ProductContent;
