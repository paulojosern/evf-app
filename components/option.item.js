const OptionItem = ({ list, card, setCard, toReal }) => {
	const addOption = (price) => {
		setCard({
			...card,
			total: price,
		});
	};

	return (
		<>
			{list.options &&
				list.options.map((el, i) => {
					const option = 'option0' + i;
					const handleClick = () => addOption(card.total + el.price);
					const handleClickRemove = () => addOption(card.total - el.price);

					return (
						<div className="item" key={i}>
							<div className="counter__price">
								<span>{el.detail}</span> + {toReal(el.price)}
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
