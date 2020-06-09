import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShopCardProvider } from '~/context/shopcard.context';
import DefaultMenu from '~/components/default.menu';
import DefaultFooter from '~/components/default.footer';
import DefaultItem from '~/components/default.item';
import ShopCardList from '~/components/shopcard.list';

const Default = () => {
	const [addpay, setAddpay] = useState(false);
	const [list, setList] = useState();
	const router = useRouter();
	const querie = router.asPath;
	const [fixed, setFixed] = useState(false);
	const [fixedTop, setFixedTop] = useState();
	const [scroll, setScroll] = useState('auto');

	('https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_960_720.jpg');

	useEffect(() => {
		document.body.style.overflow = scroll;
		var d = document.getElementById('menu');
		var menu = d.offsetTop;
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

	return (
		<ShopCardProvider>
			{/* <ShopCardList
				list={list}
				addpay={addpay}
				closeList={closeList}
				toReal={toReal}
			/>
			<header className="default__header ">
				<input type="checkbox" className="header__input" id="nav" />
				<label className="header__btn" htmlFor="nav"></label>
				<div className="header__nav"></div>
				<div className="header__content">
					<h3>Coco Verde Food</h3>
					<p>Comida Saudável</p>
					<div
						className="header__content--image"
						style={{ backgroundImage: `url(${image})` }}
					></div>
				</div>
			</header>
			<div className={fixed === true ? 'default__nav--fixed' : 'default__nav'}>
				<DefaultMenu fixedTop={fixedTop} />
			</div>
			<div className="default">
				<DefaultItem
					toReal={toReal}
					getItem={getItem}
					setFixedTop={setFixedTop}
					setScroll={setScroll}
				/>
				<div className="default__footer2"></div>
			</div>
			<DefaultFooter toReal={toReal} setScroll={setScroll} /> */}
			<ShopCardList
				list={list}
				addpay={addpay}
				closeList={closeList}
				toReal={toReal}
			/>
			<main className="default">
				<header className="default__header">
					<div className="header__content">
						<input type="checkbox" className="header__input" id="nav" />
						<label className="header__btn" htmlFor="nav"></label>
						<div className="header__nav"></div>
					</div>

					<DefaultMenu fixedTop={fixedTop} fixed={fixed} />
				</header>

				<article className="default__content">
					<DefaultItem
						toReal={toReal}
						getItem={getItem}
						setFixedTop={setFixedTop}
						setScroll={setScroll}
					/>
				</article>
				<footer className="default__footer2">footer</footer>
			</main>
			<DefaultFooter toReal={toReal} setScroll={setScroll} />
		</ShopCardProvider>
	);
};

export default Default;
