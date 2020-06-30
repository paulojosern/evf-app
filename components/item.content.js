import Slider from 'react-slick';

const ItemContent = ({ items, column, getItem, toReal }) => {
	const settings = {
		className: 'slider variable-width',
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		arrows: false,
	};

	return (
		<>
			{column ? (
				items.map((item, i) => {
					const handleClick = () => getItem(item);
					const img = item.pics && item.pics[0].image;
					return (
						<div className="item item--column" key={i}>
							<div
								className="item__image"
								style={{ backgroundImage: `url(${img})` }}
							></div>
							<div className="item__detail">
								<div className="item__title">{item.description}</div>
								<p>
									{item.detail.length > 60
										? item.detail.substr(0, 60) + '...'
										: item.detail}
								</p>
								<div className="item__price">
									<button className="item__add" onClick={handleClick}>
										{item.price && toReal(item.price)}
									</button>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<Slider {...settings}>
					{items.map((item, i) => {
						const handleClick = () => getItem(item);
						const img = item.pics && item.pics[0].image;
						return (
							<div className="item" key={i}>
								<div
									className="item__image"
									style={{ backgroundImage: `url(${img})` }}
								></div>
								<div className="item__detail">
									<div className="item__title">{item.description}</div>
									<p>
										{item.detail.length > 60
											? item.detail.substr(0, 60) + '...'
											: item.detail}
									</p>
									<div className="item__price">
										<button className="item__add" onClick={handleClick}>
											{item.price && toReal(item.price)}
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
