import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useAddressContext } from '~/context/address.context';
import { useRouter } from 'next/router';
import DefaultMenu from '~/components/default.menu';
import ItemContent from '~/components/item.content';
import IconLocation from '~/assets/logos/icon-location.svg';
import IconShop from '~/assets/logos/icon-shop.svg';

const Default = () => {
	const {
		addressState: { cep, rua, bairro, numero, complemento, visible },
		changeAddress,
	} = useAddressContext();
	const [hide, setHide] = useState(false);
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

	const json = [
		{
			cod: '1',
			title: 'Promoções',
			slug: 'promocoes',
			items: [
				{
					image: '',
					description: 'Sanduiche de presunto',
					detail:
						'Sanduiche de presunto 200g de uma carne de qualidade superior ao hambúrguer convencional',
					price: 'R$ 32,00',
					url: '',
				},
				{
					image: '',
					description: 'Sanduiche de Mortadela',
					detail: 'Sanduiche de mortadela 200g de uma carne de big',
					price: 'R$ 29,00',
					url: '',
				},
				{
					image: '',
					description: 'Sanduiche de Mortadela',
					detail: 'Sanduiche de mortadela 200g de uma carne de big',
					price: 'R$ 29,00',
					url: '',
				},
			],
		},
		{
			cod: '2',
			title: 'Lanches',
			slug: 'lanches',
			items: [
				{
					image: '',
					description: 'Sanduiche de presunto',
					detail:
						'Sanduiche de presunto 200g de uma carne de qualidade superior ao hambúrguer convencional',
					price: 'R$ 32,00',
					url: '',
				},
				{
					image: '',
					description: 'Sanduiche de Mortadela',
					detail: 'Sanduiche de mortadela 200g de uma carne de big',
					price: 'R$ 29,00',
					url: '',
				},
				{
					image: '',
					description: 'Sanduiche de Mortadela',
					detail: 'Sanduiche de mortadela 200g de uma carne de big',
					price: 'R$ 29,00',
					url: '',
				},
			],
		},
		{
			cod: '3',
			title: 'Naturais',
			slug: 'naturais',
			items: [
				{
					image: '',
					description: 'Sanduiche de presunto',
					detail:
						'Sanduiche de presunto 200g de uma carne de qualidade superior ao hambúrguer convencional',
					price: 'R$ 32,00',
					url: '',
				},
				{
					image: '',
					description: 'Sanduiche de Mortadela',
					detail: 'Sanduiche de mortadela 200g de uma carne de big',
					price: 'R$ 29,00',
					url: '',
				},
				{
					image: '',
					description: 'Sanduiche de Mortadela',
					detail: 'Sanduiche de mortadela 200g de uma carne de big',
					price: 'R$ 29,00',
					url: '',
				},
			],
		},
	];

	console.log(json);

	return (
		<>
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
						<ItemContent items={categ.items} title={categ.title} />
					</Item>
				))}
				<div className="default__footer2"></div>
			</div>
			<div
				className={hide ? 'default__footer default--hide' : 'default__footer'}
			>
				<div className="default__card">
					<IconShop />
					Vazio
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
