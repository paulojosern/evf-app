import React, { memo } from 'react';
import Slider from 'react-slick';

const DefaultContent = () => {
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
		<div className="default">
			<article className="default__content" id="01">
				<h3 className="section__title">Promoções</h3>
				<Slider {...settings}>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduiche de presunto</div>
							200g de uma carne de qualidade superior ao hambúrguer convencional
							<div className="item__price">R$ 32,00</div>
						</div>
						<div className="item__add"></div>
					</div>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduba Natural</div>
							180g de burger vegano de qualidade superior ao hambúrguer
							convencional
							<div className="item__price">R 12,50</div>
						</div>
						<div className="item__add"></div>
					</div>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduba Natural</div>
							180g de burger vegano de qualidade superior ao hambúrguer
							convencional
							<div className="item__price">R$ 22,90</div>
						</div>
						<div className="item__add"></div>
					</div>
				</Slider>
			</article>
			<article className="default__content" id="02">
				<h3 className="section__title">Lanches</h3>
				<Slider {...settings}>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduiche de presunto</div>
							200g de uma carne de qualidade superior ao hambúrguer convencional
							<div className="item__price">R$ 32,00</div>
						</div>
						<div className="item__add"></div>
					</div>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduba Natural</div>
							180g de burger vegano de qualidade superior ao hambúrguer
							convencional
							<div className="item__price">R 12,50</div>
						</div>
						<div className="item__add"></div>
					</div>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduba Natural</div>
							180g de burger vegano de qualidade superior ao hambúrguer
							convencional
							<div className="item__price">R$ 22,90</div>
						</div>
						<div className="item__add"></div>
					</div>
				</Slider>
			</article>
			<article className="default__content" id="03">
				<h3 className="section__title">Lançamentos</h3>
				<Slider {...settings}>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduiche de presunto</div>
							200g de uma carne de qualidade superior ao hambúrguer convencional
							<div className="item__price">R$ 32,00</div>
						</div>
						<div className="item__add"></div>
					</div>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduba Natural</div>
							180g de burger vegano de qualidade superior ao hambúrguer
							convencional
							<div className="item__price">R 12,50</div>
						</div>
						<div className="item__add"></div>
					</div>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduba Natural</div>
							180g de burger vegano de qualidade superior ao hambúrguer
							convencional
							<div className="item__price">R$ 22,90</div>
						</div>
						<div className="item__add"></div>
					</div>
				</Slider>
			</article>
			<article className="default__content" id="04">
				<h3 className="section__title">Super Sandubas</h3>
				<Slider {...settings}>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduiche de presunto</div>
							200g de uma carne de qualidade superior ao hambúrguer convencional
							<div className="item__price">R$ 32,00</div>
						</div>
						<div className="item__add"></div>
					</div>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduba Natural</div>
							180g de burger vegano de qualidade superior ao hambúrguer
							convencional
							<div className="item__price">R 12,50</div>
						</div>
						<div className="item__add"></div>
					</div>
					<div className="item">
						<div className="item__image"></div>
						<div className="item__detail">
							<div className="item__title">Sanduba Natural</div>
							180g de burger vegano de qualidade superior ao hambúrguer
							convencional
							<div className="item__price">R$ 22,90</div>
						</div>
						<div className="item__add"></div>
					</div>
				</Slider>
			</article>
		</div>
	);
};

export default DefaultContent;
