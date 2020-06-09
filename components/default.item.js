import { useEffect } from 'react';
import ItemContent from '~/components/item.content';
import { json } from '~/services/json';

const DefaultItem = ({ getItem, toReal, setFixedTop }) => {
	useEffect(() => {
		const el = document.querySelectorAll('.default__item');
		window.addEventListener('scroll', () => {
			el.forEach((el) => {
				const id = el.getAttribute('data-id');
				el.getBoundingClientRect().top <= 0
					? (el.classList.add('default__item--fixed'), setFixedTop(id))
					: el.classList.remove('default__item--fixed');
			});
		});
	}, []);

	return json.map((categ, i) => (
		<section
			className={
				categ.column ? 'default__item default__item--column' : 'default__item'
			}
			data-id={categ.slug}
			id={categ.slug}
			key={i}
		>
			<h3 className="section__title">{categ.title}</h3>

			<ItemContent
				items={categ.items}
				getItem={getItem}
				toReal={toReal}
				column={categ.column ? categ.column : false}
			/>
		</section>
	));
};

export default DefaultItem;
