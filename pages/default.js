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

	useEffect(() => {
		document.body.style.overflow = scroll;
		window.addEventListener('scroll', () => {
			window.scrollY >= 150 ? setFixed(true) : setFixed(false);
		});
	}, [fixed, scroll]);

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
		const number =
			numero &&
			numero.toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});
		return number;
	};

	return (
		<ShopCardProvider>
			<ShopCardList
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
			<DefaultFooter toReal={toReal} setScroll={setScroll} />
		</ShopCardProvider>
	);
};

export default Default;
