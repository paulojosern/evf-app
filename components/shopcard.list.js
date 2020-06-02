const ShopCardList = ({ addpay, list }) => {
	return (
		<div className={addpay ? 'card__list card__list--show' : 'card__list'}>
			{list !== undefined && (
				<>
					<div className="list__image">
						<div className="list__description">{list.description}</div>
						<div className="list__image-overlay"></div>
						<img
							className="list__image-img"
							src={list.image}
							alt={list.description}
						/>
					</div>

					<div className="list__destail">{list.detail}</div>
					<div className="list__content">
						<div className="content__item">
							<div className="counter">
								<button className="counter__remove"></button>
								<div className="counter__item">1</div>
								<button className="counter__add"></button>
							</div>
							<div className="counter__price">{list.price}</div>
						</div>
					</div>
					<div className="list__btn">
						<button className="btn__close" onClick={closeList}></button>
						<button className="btn__add">Confirmar R$ 32,00</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ShopCardList;
