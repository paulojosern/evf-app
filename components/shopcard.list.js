import { useState, useEffect } from 'react';
import { useShopCardContext } from '~/context/shopcard.context';
import OptionItem from '~/components/option.item';

const ShopCardList = ({ addpay, list, closeList, toReal }) => {
	const [card, setCard] = useState({});
	const [indent, setIndent] = useState(1);
	const [state, setState] = useState([]);
	const {
		shopCardState: { total, item },
		inputShopCard,
	} = useShopCardContext();

	useEffect(() => {
		list && setCard({ total: list.price, item: list.price });
	}, [list]);

	const addItem = () => {
		const newTotal = card.total + card.item;
		setIndent(indent + 1);
		setCard({
			...card,
			total: newTotal,
		});
	};
	const removeItem = () => {
		if (indent !== 1) {
			setIndent(indent - 1);
			setCard({
				...card,
				total: card.total - card.item,
			});
		} else {
			setCard({
				...card,
				total: card.total,
			});
		}
	};

	const backClear = () => {
		setCard({});
		setIndent(1);
		closeList();
	};

	const handleConfirm = () => {
		let arr = item || [];
		arr.push({
			description: list.description,
			detail: card.detail,
			unity: indent,
			price: card.total,
		});
		const values = {
			item: arr,
			total: total ? total + card.total : card.total,
		};
		inputShopCard(values);
		backClear();
	};

	useEffect(() => {
		//list !== undefined && preloadImages();
	}, []);

	const preloadImages = () => {
		let links = list.pics;
		// setState(
		// 	links.map((link, i) => {
		// 		var img = new Image();
		// 		img.onload = () => handleImageLoad(i);
		// 		img.src = link;
		// 		return link;
		// 	})
		// );
		let arr = [];
		links.map((link, i) => {
			var img = new Image();
			img.onload = () => (img.loaded = true);
			img.src = link;
			arr.push(link);
		});
		return arr;
	};

	const imgs = list !== undefined && preloadImages(list.pics);
	// imgs !== 0 && console.log('liste', imgs);

	return (
		<div className={addpay ? 'card__list card__list--show' : 'card__list'}>
			{list !== undefined && (
				<>
					<button className="list__btn--close" onClick={backClear}></button>
					<div
						className="list__image"
						style={{ backgroundImage: `url(${imgs[0]})` }}
					>
						<div className="list__description">{list.description}</div>
						<div className="list__image-overlay"></div>
					</div>
					<div className="list__content">
						<div className="content__separate"></div>
						<div className="content__detail">{list.detail}</div>
						<div className="content__container">
							<div className="content__item content__item--price">
								<div className="item">
									<div className="item__price">
										<label>Unidade: </label>
										{toReal(list.price)}
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
							</div>
							{list.options !== undefined && (
								<>
									<div className="content__title">Opções disponíveis</div>

									<div className="content__item">
										{addpay && (
											<OptionItem
												list={list}
												card={card}
												setCard={setCard}
												toReal={toReal}
											/>
										)}
									</div>
								</>
							)}
						</div>
						<div className="list__btn">
							<div className="btn__total">
								Total <span>{toReal(card.total)}</span>
							</div>
							<button className="btn__add" onClick={handleConfirm}>
								Adicionar produto
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ShopCardList;
