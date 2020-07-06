import { useEffect, memo } from 'react';
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
				<h2 id={categ.category}>{categ.category}</h2>

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

export default memo(DefaultItem);
