import { useState } from 'react';
import { usePanelContext } from '~/context/panel.context';
import { price, priceData, handleInput, handleUp, rnd } from '~/effects/mask';

const OptionAdd = ({ categorie, product, toogleOption, setToogleOption }) => {
	const [option, setOption] = useState();
	const { panelCategories, inputCategories } = usePanelContext();

	const handleChangeOption = (event) => {
		const auxValues = { ...option };
		if (event.target.name === 'price') {
			let price = priceData(event.target.value);
			price = parseFloat(price);
			auxValues[event.target.name] = price;
		} else {
			auxValues[event.target.name] = event.target.value;
		}
		event.target.value === '' ? setOption(option) : setOption(auxValues);
	};

	const saveNewOption = (e) => {
		e.preventDefault();

		let options = product.options || [];
		options = options.concat([{ id: rnd(), ...option }]);
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

		e.target.description.value = '';
		e.target.price.value = '';
		setOption('');
		setToogleOption(false);
	};

	const masks = {
		price(value) {
			return value
				.replace(/\D/g, '')
				.replace(/(\d{1,4})(\d{2})/, '$1,$2')
				.replace(/(,\d{2})\d+?$/, '$1');
		},
	};

	const ValidePrice = (e) => {
		handleChangeOption(e);
		e.target.value = price(e.target.value);
	};

	return (
		toogleOption && (
			<form onSubmit={saveNewOption}>
				<div className="panel__item panel__item--inline bottom">
					<div className="item item--large">
						<label className="panel__label">Descrição</label>
						<input
							type="text"
							name="description"
							className="panel__input"
							onChange={handleChangeOption}
							required
						/>
					</div>
					<div className="item">
						<label className="panel__label">Preço</label>
						<input
							type="text"
							name="price"
							className="panel__input"
							onChange={ValidePrice}
							onBlur={handleInput}
							onKeyUp={handleUp}
						/>
					</div>
					{/* <div className="item">
					<button type="submit" className="btn btn--delete">
						Excluir
					</button>
				</div> */}
				</div>
				<br />
				<div className="flex between">
					<button
						className="btn btn--delete"
						onClick={() => setToogleOption(!toogleOption)}
					>
						Excluir opção
					</button>
					<button type="submit" className="btn">
						Salvar opção
					</button>
				</div>
			</form>
		)
	);
};

export default OptionAdd;
