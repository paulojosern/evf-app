import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { ShopCardProvider } from '~/context/shopcard.context';
import DefaultMenu from '~/components/default.menu';
import DefaultFooter from '~/components/default.footer';
import DefaultItem from '~/components/default.item';
import ShopCardList from '~/components/shopcard.list';
import { database } from '~/services/config';

const Default = ({ store }) => {
	const [addpay, setAddpay] = useState(false);
	const [list, setList] = useState();
	const router = useRouter();
	const querie = router.asPath;
	const [fixed, setFixed] = useState(false);
	const [fixedTop, setFixedTop] = useState();
	const [scroll, setScroll] = useState('auto');

	const menu = useRef();
	// store && console.log('minha loja: ', store);
	const scrolling = (value) => {
		var id = document.getElementById(value);
		var item = id.offsetTop;
		window.addEventListener('scroll', () => {
			// console.log(document.documentElement.scrollTop);
			if (document.documentElement.scrollTop >= item) {
				setFixed(true);
			} else {
				setFixed(false);
			}
		});
	};

	useEffect(() => {
		document.body.style.overflow = 'scroll';
		scrolling('menu');
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
					className={
						fixed
							? 'default__header default__header--fixed'
							: ' default__header'
					}
					style={{ backgroundColor: `rgba(${store.colors.color1})` }}
				>
					<div
						className={
							fixed
								? 'header__content header__content--fixed'
								: ' header__content'
						}
					>
						<input type="checkbox" className="header__input" id="nav" />
						<label className="header__btn" htmlFor="nav"></label>
						<div
							className="header__nav"
							style={{ backgroundColor: `${store.colors.color1}` }}
						></div>
						<div className="header__title">
							<div
								className="title__logo"
								style={{ backgroundImage: `url(${store.logo})` }}
							></div>
							<div className="title__content">
								<h1>{store.name}</h1>
								<p>{store.description}</p>
							</div>
						</div>
					</div>

					<DefaultMenu
						fixedTop={fixedTop}
						fixed={fixed}
						store={store.categories}
						ref={menu}
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
	const firebase = await database;
	let store = {};
	await firebase
		.collection('stores')
		.where('slug', '==', pid)
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				store = doc.data();
			});
		});
	return { store };
};
