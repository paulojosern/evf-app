import { useState, useEffect } from 'react';
import { json } from '~/services/json';
import Slider from 'react-slick';

const DefaultMenu = ({ fixedTop, fixed }) => {
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

	useEffect(() => {
		const el = document.querySelectorAll('.menu__link');
		el.forEach((el) => {
			el.getAttribute('data-id') === fixedTop
				? el.classList.add('menu__link--active')
				: el.classList.remove('menu__link--active');
		});
	}, [fixedTop]);

	return (
		<nav
			className={fixed ? 'default__menu default__menu--fixed' : 'default__menu'}
			id="menu"
		>
			<Slider {...settings}>
				{json.map((link, i) => (
					<a
						className="menu__link"
						href={`#${link.slug}`}
						data-id={link.slug}
						key={i}
					>
						{link.title}
					</a>
				))}
			</Slider>
		</nav>
	);
};

export default DefaultMenu;
