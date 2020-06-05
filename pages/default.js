import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShopCardProvider } from '~/context/shopcard.context';
import DefaultMenu from '~/components/default.menu';
import DefaultFooter from '~/components/default.footer';
import ItemContent from '~/components/item.content';
import ShopCardList from '~/components/shopcard.list';

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

	const getItem = (items) => {
		setAddpay(!addpay);
		setList({
			image: items.image,
			description: items.description,
			price: items.price,
			detail: items.detail,
			options: items.options,
		});
	};

	const closeList = () => setAddpay(!addpay);

	return (
		<ShopCardProvider>
			<ShopCardList list={list} addpay={addpay} closeList={closeList} />

			<header className="default__header">
				<div className="header__avatar"></div>
				<div className="header__content">
					<h3>Coco Verde Food</h3>
					<p>Comida Saudável</p>
					<DefaultMenu />
				</div>
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
