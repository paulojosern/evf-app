import { useShopCardContext } from '~/context/shopcard.context';

const ShopCardCart = ({ toReal, openCart, handleCart }) => {
	const {
		shopCardState: { total, item },
	} = useShopCardContext();
	return (
		<div className={!openCart ? 'cart' : 'cart cart--show'}>
			{openCart && (
				<div className="cart__container">
					<div className="cart__header">
						<h3>Meu pedido</h3>
					</div>
					<div className="cart__content">
						<section className="content__item">
							{Object.keys(item).map((i, el) => {
								return (
									<article className="item" key={i}>
										<p>
											{item[el].unity}x {item[el].description}
										</p>
										{toReal(item[el].price)}
									</article>
								);
							})}
						</section>
					</div>
					<div className="cart__order">
						<div className="cart__order-subtotal">
							<label>Subtotal: </label>
						</div>
						<div className="cart__order-delivery">
							<label>Entrega: </label>
						</div>
						<div className="cart__order-total">
							<label>Total: </label>
							<b>{toReal(total)}</b>
						</div>
					</div>
					<div className="cart__payment">
						<div className="cart__order-subtotal"></div>
						<div className="cart__order-delivery"></div>
						<div className="cart__order-total"></div>
					</div>

					<div className="cart__footer"></div>
					<button onClick={handleCart}>Fechar</button>
				</div>
			)}
		</div>
	);
};

export default ShopCardCart;
