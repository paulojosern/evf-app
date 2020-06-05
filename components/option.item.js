import React, { useState } from 'react';
const OptionItem = ({ list, card, setCard }) => {
	const [state, setState] = useState();

	const numberToReal = (numero) => {
		var numero = numero.toFixed(2).split('.');
		numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.');
		return numero.join(',');
	};
	const addOption = (price, option) => {
		const optionDefault = option;
		setCard({
			...card,
			total: card.total + price,
		});
	};

	const removeOption = (price, option) => {
		const optionDefault = option;
		setCard({
			...card,
			total: card.total - price,
		});
	};

	console.log(card);
	return (
		<>
			{list.options &&
				list.options.map((el, i) => {
					const option = 'option0' + i;
					//console.log(classe);
					const handleClick = () => addOption(el.price, option);
					const handleClickRemove = () => removeOption(el.price, option);

					return (
						<div className="content__item content__item--option" key={i}>
							<div className="counter__price">
								<span>{el.detail}</span> + {numberToReal(el.price)}
							</div>
							<div className="counter">
								<input type="checkbox" className="counter--input" id={option} />
								<label
									className="counter__add counter__add--delete"
									onClick={handleClickRemove}
									htmlFor={option}
								></label>
								<label
									className="counter__add"
									htmlFor={option}
									onClick={handleClick}
								></label>
							</div>
						</div>
					);
				})}
		</>
	);
};

export default OptionItem;
