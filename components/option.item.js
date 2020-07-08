import { useState } from 'react';

const OptionItem = ({ list, card, setCard, toReal }) => {
	const [details, setDetails] = useState([]);
	const addOption = (price) => {
		setCard({
			...card,
			detail: details,
			total: price,
		});
	};

	return (
		<>
			{list.options &&
				list.options.map((el, i) => {
					const option = 'option0' + i;
					const handleClick = () => {
						// const values = {
						// 	[i]: el.detail,
						// };
						let arr = details;
						arr.push(el.detail);
						setDetails(arr);
						addOption(card.total + el.price);
					};

					const handleClickRemove = () => {
						const allowed = el.detail;
						let arr = details;
						arr = arr.filter(function (el) {
							return el !== allowed;
						});
						setDetails(arr);
						addOption(card.total - el.price);
					};

					return (
						<div className="item item--option" key={i}>
							<div className="option__price">
								<span>{el.description}</span> + {toReal(el.price)}
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
