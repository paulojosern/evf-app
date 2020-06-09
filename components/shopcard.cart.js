import { useShopCardContext } from '~/context/shopcard.context';

const ShopCardCart = ({ toReal, openCart, handleCart, address }) => {
	const {
		shopCardState: { total, item },
		inputShopCard,
	} = useShopCardContext();

	const handleDelete = (i, price) => {
		let arr = item;
		arr = arr.filter(function (el) {
			return el !== arr[i];
		});
		const values = {
			item: arr,
			total: total - price,
		};
		item.length <= 1 && handleCart();
		inputShopCard(values);
	};
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
								const handleClick = () => handleDelete(i, item[el].price);
								console.log(item[el]);
								const itemDetail =
									item[el].detail !== undefined &&
									item[el].detail.map((d, index) => <p key={index}>{d} </p>);
								return (
									<article className="item" key={i}>
										<div className="item__detail">
											<h4>
												{item[el].unity}x {item[el].description}
											</h4>
											<small>{itemDetail}</small>
											{toReal(item[el].price)}
										</div>

										<button
											className="item__delete"
											onClick={handleClick}
										></button>
									</article>
								);
							})}
						</section>
					</div>
					<div className="cart__order">
						<div className="order__item">
							<label>Subtotal:</label>
							{toReal(total)}
						</div>
						<div className="order__item">Taxa de entrega:</div>
						<div className="order__item">
							<b>Total: </b>
							<b>{toReal(total)}</b>
						</div>
					</div>
					<div className="cart__payment">
						<b>Selecione a forma de pagamento</b>
						<div className="payment__btn">
							<input
								type="radio"
								name="payment"
								id="credito"
								value="credito"
								className="payment__btn--input"
							/>
							<label className="payment__btn--label" htmlFor="credito">
								Cartão de crédito
							</label>
							<input
								type="radio"
								name="payment"
								id="debito"
								value="debito"
								className="payment__btn--input"
							/>

							<label className="payment__btn--label" htmlFor="debito">
								Cartão de débito
							</label>
							<input
								type="radio"
								name="payment"
								id="dinheiro"
								value="dinheiro"
								className="payment__btn--input"
							/>

							<label className="payment__btn--label" htmlFor="dinheiro">
								Dinheiro
							</label>
							<input
								type="radio"
								name="payment"
								id="refeicao"
								value="refeicao"
								className="payment__btn--input"
							/>

							<label className="payment__btn--label" htmlFor="refeicao">
								Vale refeição
							</label>
						</div>
					</div>
					<div className="cart__delivery">
						<b>Endereço de entrega</b>
						<div className="delivery__detail">
							{address.rua + ', ' + address.numero}
							{address.complemento && ' - '}
							{address.complemento}
							<br />
							{address.bairro}
							<p>Distancia de 3.8km, entregue em 40-50min.</p>
						</div>

						<div className="form__group ">
							<input
								type="text"
								className="form__input"
								placeholder="Informe seu nome "
							/>
							<input
								type="text"
								className="form__input"
								placeholder="CPF na NF?"
							/>
						</div>
					</div>

					<div className="cart__footer">
						<button className="btn__confirm">Enviar meu pedido</button>
					</div>
					<button onClick={handleCart} className="cart__back"></button>
				</div>
			)}
		</div>
	);
};

export default ShopCardCart;
