import { useState, useEffect } from 'react';
import { usePanelContext } from '~/context/panel.context';
import OptionAdd from '~/components/panel.products.option.add';
import Option from '~/components/panel.products.option';
import IconPlus from '~/assets/logos/icon-plus.svg';
import IconTop from '~/assets/logos/icon-top.svg';
import { price, handleInput, handleUp } from '~/effects/mask';

const ProductContent = ({ state, categorie, setCategorie }) => {
	const [product, setProduct] = useState();
	const [toogle, setToogle] = useState(false);
	const [toogleOption, setToogleOption] = useState(false);
	const { panelCategories, inputCategories } = usePanelContext();

	useEffect(() => {
		state && setProduct(state);
	}, [state]);

	const handleChangeProduct = (event) => {
		const auxValues = { ...product };
		if (event.target.name === 'price') {
			auxValues[event.target.name] = price(event.target.value);
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

		const updatedProd = { ...product };

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

		let products = categorie.products;
		products = products.filter((prod) => prod.id !== product.id);
		products = products.concat([{ ...product, options }]);

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

	return (
		<div className="product">
			<label className="product__label " htmlFor="pro1">
				<button
					className="product__btn between flex middle"
					onClick={() => setToogle(!toogle)}
				>
					<div className="item__header">{product && product.description}</div>

					<div
						className={
							toogle ? 'product__icon product__icon--show' : 'product__icon'
						}
					>
						<IconPlus />
					</div>
				</button>
				<div className={toogle ? 'product__content' : 'hidden'}>
					<form onSubmit={saveProduct}>
						<div className="panel__item">
							<label className="panel__label">Descrição</label>
							<input
								type="text"
								name="description"
								className="panel__input"
								placeholder={product && product.description}
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
									onBlur={handleInput}
									// onKeyUp={handleUp}
								/>
							</div>
							<div className="item flex right end">
								<button onClick={setFirst} className="btn--icon">
									<IconTop />
								</button>
								<button
									type="button"
									className={
										categorie.products.length > 1 ? 'btn btn--delete' : 'hidden'
									}
									onClick={removeProduct}
								>
									excluir
								</button>
								<button type="submit" className="btn">
									Salvar
								</button>
							</div>
						</div>
					</form>
					<Option product={product} removeOption={removeOption} />
					<button
						className={!toogleOption ? 'btn' : 'hidden'}
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
