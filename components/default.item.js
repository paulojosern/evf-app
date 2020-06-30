import { useEffect } from 'react';
import ItemContent from '~/components/item.content';

const DefaultItem = ({ store, getItem, toReal, setFixedTop }) => {
	useEffect(() => {
		const el = document.querySelectorAll('.default__item');
		window.addEventListener('scroll', () => {
			el.forEach((el) => {
				const id = el.getAttribute('data-id');
				el.getBoundingClientRect().top <= 150
					? (el.classList.add('default__item--fixed'), setFixedTop(id))
					: el.classList.remove('default__item--fixed');
			});
		});
	}, []);

	store && console.log(store);
	return store !== undefined ? (
		store.categories.map((categ, i) => (
			<section
				className={
					categ.column ? 'default__item default__item--column' : 'default__item'
				}
				data-id={categ.category}
				// id={categ.slug}
				key={i}
			>
				<h3 className="default__item-title" id={categ.category}>
					{categ.category}
				</h3>

				<ItemContent
					items={categ.products}
					getItem={getItem}
					toReal={toReal}
					column={categ.layout && categ.layout === 'vertical' ? false : true}
				/>
			</section>
		))
	) : (
		<div>Carregando</div>
	);
};

export default DefaultItem;
