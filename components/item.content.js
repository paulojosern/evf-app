import React from 'react';
import Slider from 'react-slick';

const ItemContent = ({ items, title }) => {
	const settings = {
		className: 'slider variable-width',
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
	};

	return (
		<>
			<h3 className="section__title">{title}</h3>
			<Slider {...settings}>
				{items.map((item, i) => (
					<div className="item" key={i}>
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">{item.description}</div>
							{item.detail}
							<div className="item__price">{item.price}</div>
						</div>
						<div className="item__add"></div>
					</div>
				))}
			</Slider>
		</>
	);
};

export default ItemContent;
