import { useState, useEffect } from 'react';
import OptionItem from '~/components/option.item';

const ShopCardList = ({ addpay, list, closeList }) => {
	const [card, setCard] = useState({});
	const [indent, setIndent] = useState(1);

	useEffect(() => {
		list && setCard({ total: list.price, item: list.price });
	}, [list]);

	const addItem = () => {
		const newTotal = card.total + card.item;
		setCard({
			...card,
			total: newTotal,
		});
		setIndent(indent + 1);
	};
	const removeItem = () => {
		const newTotal =
			card.total >= card.item ? card.item : card.total - card.item;
		setCard({
			...card,
			total: newTotal,
		});
		indent !== 1 && setIndent(indent - 1);
	};

	// const numberToReal = (numero) => {
	// 	var numero = numero.toFixed(2).split('.');
	// 	numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.');
	// 	return numero.join(',');
	// };

	return (
		<div className={addpay ? 'card__list card__list--show' : 'card__list'}>
			{list !== undefined && (
				<>
					<div className="list__image">
						<div className="list__description">{list.description}</div>
						<div className="list__destail">{list.detail}</div>
						<div className="list__image-overlay"></div>
						<div
							className="list__image-img"
							style={{ backgroundImage: `url(${list.image})` }}
						/>
					</div>

					<div className="list__content">
						<div className="content__separate"></div>
						<div className="content__conteiner">
							<div className="content__item">
								<div className="counter__price">
									<div
										className="counter__price-image"
										style={{ backgroundImage: `url(${list.image})` }}
									/>
									{list.price}
								</div>
								<div className="counter">
									<button
										className="counter__remove"
										onClick={removeItem}
									></button>
									<div className="counter__item">{indent}</div>
									<button className="counter__add" onClick={addItem}></button>
								</div>
							</div>
							<div className="content__title">Escolha uma das opções</div>
							<OptionItem list={list} card={card} setCard={setCard} />
						</div>
						<div className="list__btn">
							<button className="btn__close" onClick={closeList}></button>
							<button className="btn__add">
								<span>Total: {card.total}</span>
								Confirmar
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ShopCardList;
