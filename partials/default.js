import { useEffect } from 'react';
import { useAddressContext } from '~/context/address.context';
import { useRouter } from 'next/router';
import DefaultMenu from '~/components/default.menu';
import DefaultContent from '~/components/default.content';
import IconLocation from '~/assets/logos/icon-location.svg';
const Default = () => {
	const {
		addressState: { rua, bairro, numero, complemento, visible },
		changeAddress,
	} = useAddressContext();
	const router = useRouter();
	const querie = router.asPath;

	useEffect(() => {
		visible && (document.querySelector('body').style.overflowY = 'auto');
	}, [visible]);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({
				top: querie.offsetTop,
				behavior: 'smooth',
			});
		}, 2500);
	}, [querie]);

	return (
		visible && (
			<>
				<header className="default__header">
					<div className="default__location">
						<input type="checkbox" id="location" className="location__input" />
						<label className="location__btn" htmlFor="location">
							<IconLocation />
							{rua}, {numero}
						</label>
						<div className="location__content" id="content">
							<div className="location__detail">
								{complemento}
								{complemento && ','} {bairro}
							</div>
							<button className="location__change" onClick={changeAddress}>
								Trocar
							</button>
						</div>
					</div>
					{/* <div className="header__avatar">
						logo
						<br /> restaurante
					</div> */}
					<DefaultMenu />
				</header>
				<DefaultContent />
			</>
		)
	);
};
export default Default;
