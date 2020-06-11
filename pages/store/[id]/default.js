import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShopCardProvider } from '~/context/shopcard.context';
import DefaultMenu from '~/components/default.menu';
import DefaultFooter from '~/components/default.footer';
import DefaultItem from '~/components/default.item';
import ShopCardList from '~/components/shopcard.list';
import { firebase } from '~/pages/api/firebase';

const Default = ({ store }) => {
	const [addpay, setAddpay] = useState(false);
	const [list, setList] = useState();
	const router = useRouter();
	const querie = router.asPath;
	const [fixed, setFixed] = useState(false);
	const [fixedTop, setFixedTop] = useState();
	const [scroll, setScroll] = useState('auto');

	useEffect(() => {
		document.body.style.overflow = scroll;
		var d = document.getElementById('menu');
		var menu = d.offsetTop - 50;
		window.addEventListener('scroll', () => {
			if (document.documentElement.scrollTop >= menu) {
				setFixed(true);
			} else {
				setFixed(false);
			}
		});
	}, [scroll]);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({
				top: querie.offsetTop,
				behavior: 'smooth',
			});
		}, 300);
	}, [querie]);

	const getItem = (items) => {
		setAddpay(!addpay);
		setList({
			image: items.image,
			description: items.description,
			price: items.price,
			detail: items.detail,
			options: items.options,
		});
		setScroll('hidden');
	};

	const closeList = () => {
		setAddpay(!addpay);
		setScroll('auto');
	};

	let toReal = (numero) => {
		const number = parseFloat(numero)
			.toFixed(2)
			.replace('.', ',')
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
		return 'R$ ' + number;
	};

	return store ? (
		<ShopCardProvider>
			<ShopCardList
				list={list}
				addpay={addpay}
				closeList={closeList}
				toReal={toReal}
			/>
			<main className="default">
				<header
					className="default__header"
					style={{ backgroundColor: `${store.colors.color1}` }}
				>
					<div
						className={
							fixed
								? 'header__content header__content--fixed'
								: ' header__content'
						}
						style={{ backgroundColor: `${store.colors.color1}` }}
					>
						<input type="checkbox" className="header__input" id="nav" />
						<label className="header__btn" htmlFor="nav"></label>
						<div
							className="header__nav"
							style={{ backgroundColor: `${store.colors.color1}` }}
						></div>
						<h2>{store.title}</h2>
						<h3>{store.subtitle}</h3>
					</div>

					<DefaultMenu
						fixedTop={fixedTop}
						fixed={fixed}
						store={store.sessions}
					/>
				</header>
				<article
					className={
						fixed
							? 'default__content default__content--fixed'
							: ' default__content'
					}
				>
					<DefaultItem
						toReal={toReal}
						getItem={getItem}
						setFixedTop={setFixedTop}
						setScroll={setScroll}
						store={store}
					/>
				</article>
				<footer className="default__footer2">footer</footer>
			</main>
			<DefaultFooter toReal={toReal} setScroll={setScroll} />
		</ShopCardProvider>
	) : (
		<di>carregando</di>
	);
};

export default Default;

Default.getInitialProps = async ({ query }) => {
	const pid = query.id;
	const data = await firebase;
	const id = Object.keys(data).find((item) => data[item].slug === pid);
	const store = data[id];
	return { store };
};
