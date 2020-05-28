import { useState, useEffect, useCallback } from 'react';
import { useAddressContext } from '~/context/address.context';
import { useRouter } from 'next/router';
import DefaultMenu from '~/components/default.menu';
import ItemContent from '~/components/item.content';
import IconLocation from '~/assets/logos/icon-location.svg';
import IconShop from '~/assets/logos/icon-shop.svg';
import { json } from '../services/json';

const Default = () => {
	const {
		addressState: { cep, rua, bairro, numero, complemento, visible },
		changeAddress,
	} = useAddressContext();
	const [hide, setHide] = useState(false);
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

	const href = '/';
	const sendConfirm = (e) => {
		e.preventDefault();
		setHide(!hide);
		// changeAddress();
		setTimeout(() => {
			router.push(href);
		}, 200);
	};

	const Item = ({ children, id }) => {
		return (
			<article className="default__item" id={id}>
				{children}
			</article>
		);
	};

	// const handleAddProduct = (product) => {
	// 	setAddpay(!addpay);
	// 	console.log(product.detail);
	// };
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
		<>
			<div className={addpay ? 'card__list card__list--show' : 'card__list'}>
				{list !== undefined && (
					<>
						<img
							className="list__image"
							src={list.image}
							alt={list.description}
						/>
						<div className="list__description">{list.description}</div>
						<div className="list__destail">{list.detail}</div>
						<div className="list__content"></div>
						<button className="item__add" onClick={closeList}>
							fechar
						</button>
					</>
				)}
			</div>
			<header
				className={hide ? 'default__header default--hide' : 'default__header'}
			>
				{/* <div>
					{cep},{rua}, {numero}, {bairro}
				</div>
				<button className="location__change" onClick={sendConfirm}>
					Trocar
				</button> */}
				<DefaultMenu />
			</header>

			<div className={hide ? 'default default--hide' : 'default'}>
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
			<div
				className={hide ? 'default__footer default--hide' : 'default__footer'}
			>
				<div className="default__card">
					<IconShop />
					Nenhum pedido
				</div>
				<div className="default__location">
					<div className="location__content">
						<IconLocation />
						{rua}, {numero} - {bairro}
					</div>

					<button className="location__change" onClick={sendConfirm}>
						Trocar
					</button>
				</div>
			</div>
		</>
	);
};

export default Default;
