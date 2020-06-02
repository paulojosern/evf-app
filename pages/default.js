import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShopCardProvider } from '~/context/shopcard.context';
import DefaultMenu from '~/components/default.menu';
import DefaultFooter from '~/components/default.footer';
import ItemContent from '~/components/item.content';

import { json } from '~/services/json';

const Default = () => {
	const [addpay, setAddpay] = useState(false);
	const [list, setList] = useState();
	const router = useRouter();
	const querie = router.asPath;

	useEffect(() => {
		document.querySelector('body').style.overflowY = 'auto';
		setTimeout(() => {
			window.scrollTo({
				top: querie.offsetTop,
				behavior: 'smooth',
			});
		}, 300);
	}, [querie]);

	const Item = ({ children, id }) => {
		return (
			<article className="default__item" id={id}>
				{children}
			</article>
		);
	};

	const getItem = (item) => {
		setAddpay(!addpay);
		setList({
			image: item.image,
			description: item.description,
			price: item.price,
			detail: item.detail,
		});
	};

	const closeList = () => setAddpay(!addpay);

	return (
		<ShopCardProvider>
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
			<header className="default__header">
				<DefaultMenu />
			</header>

			<div className="default">
				{json.map((categ, i) => (
					<Item id={categ.slug} key={i}>
						<ItemContent
							items={categ.items}
							title={categ.title}
							getItem={getItem}
							column={categ.column ? categ.column : false}
						/>
					</Item>
				))}
				<div className="default__footer2"></div>
			</div>
			<DefaultFooter />
		</ShopCardProvider>
	);
};

export default Default;
