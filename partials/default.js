import { useAddressContext } from '~/context/address.context';
const Default = () => {
	const {
		addressState: { rua, bairro, numero, complemento, visible },
		changeAddress,
	} = useAddressContext();

	return (
		visible && (
			<div className="default">
				<div className="default__location">
					<input type="checkbox" id="location" className="location__input" />
					<label className="location__btn" htmlFor="location">
						{rua}, {numero}
					</label>
					<div className="location__content" id="content">
						<div className="location__detail">
							{complemento}
							<p>{bairro}</p>
						</div>
						<button className="location__change" onClick={changeAddress}>
							Trocar
						</button>
					</div>
				</div>
				<header className="default__header">
					<div className="header__avatar">
						logo
						<br /> restaurante
					</div>
				</header>
			</div>
		)
	);
};
export default Default;
