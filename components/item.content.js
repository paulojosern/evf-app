import React from 'react';
import Slider from 'react-slick';

const ItemContent = ({ items, title, column, getItem }) => {
	const settings = {
		className: 'slider variable-width',
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
	};

	// const numberToReal = (numero) => {
	// 	var numero = numero.toFixed(2).split('.');
	// 	numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.');
	// 	return numero.join(',');
	// };

	return (
		<>
			<h3 className="section__title">{title}</h3>
			{column ? (
				items.map((item, i) => {
					const handleClick = () => getItem(item);
					return (
						<div className="item item--column" key={i}>
							<div
								className="item__image"
								style={{ backgroundImage: `url(${item.image})` }}
							></div>
							<div className="item__detail">
								<div className="item__title">{item.description}</div>
								{item.detail}
								<div className="item__price">
									<h4>{item.price}</h4>
									<button className="item__add" onClick={handleClick}></button>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<Slider {...settings}>
					{items.map((item, i) => {
						const handleClick = () => getItem(item);
						return (
							<div className="item" key={i}>
								<div
									className="item__image"
									style={{ backgroundImage: `url(${item.image})` }}
								></div>
								<div className="item__detail">
									<div className="item__title">{item.description}</div>
									<p>
										{item.detail.length > 50
											? item.detail.substr(0, 50) + '...'
											: item.detail}
									</p>
									<div className="item__price">
										<button className="item__add" onClick={handleClick}>
											{item.price}
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</Slider>
			)}
		</>
	);
};

export default ItemContent;
