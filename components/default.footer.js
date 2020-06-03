import { useState, useEffect, useRef } from 'react';
import { useAddressContext } from '~/context/address.context';
import { useShopCardContext } from '~/context/shopcard.context';
import useLocalStorage from '~/effects/useLocalStorage';
import useGetCep from '~/effects/useGetCep';
import AddressForm from '~/components/address.form';
import IconShop from '~/assets/logos/icon-shop.svg';

const DefaultFooter = () => {
	const [name, setName] = useLocalStorage('address');
	const [address, setAddress] = useState();
	const input = useRef();
	const {
		addressState: { cep, rua, bairro, numero, complemento, visible },
		changeAddress,
	} = useAddressContext();
	// cep
	const [{ data }, getCep] = useGetCep();
	//ShopCard
	const {
		ShopCardState: { total },
	} = useShopCardContext();

	// total && console.log(total);
	// console.log('storage :', name);
	// console.log('address :', cep);

	useEffect(() => {
		cep !== undefined
			? setAddress({ cep, rua, bairro, numero, complemento })
			: setAddress(name && JSON.parse(name));
	}, [cep]);

	const handleAddress = () => setAddress(undefined);

	const handleCEP = (e) => {
		var x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
		e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2];
		if (e.target.value.length === 9) {
			getCep(e.target.value);
		} else {
		}
	};

	return (
		<div className="default__footer">
			<div className="default__location">
				<input
					type="checkbox"
					id="location__input"
					className="location__input"
					ref={input}
				/>

				<div className="location__content">
					{address !== undefined ? (
						<div className="content__address active">
							<div className="address__detail">
								<label>Entregar em:</label>
								<p>
									{address.rua}, {address.numero}
								</p>
								<p className="show">
									{address.complemento}
									{address.complemento && ' - '}
									{address.bairro}
								</p>
							</div>
							<button
								className="address__change btn show"
								onClick={handleAddress}
							>
								Trocar
							</button>
							<label
								className={
									address !== undefined
										? 'location__btn'
										: 'location__btn location__btn--add'
								}
								htmlFor="location__input"
							></label>
						</div>
					) : (
						<div className="content__address">
							<div className="hidden">Nenhum endereço</div>
							<div className="show">
								<div className="form__group address">
									<label>Informe seu cep</label>
									<input
										type="text"
										className="form__input"
										onChange={handleCEP}
										// ref={cepInput}
									/>
									{data &&
										(data.erro ? (
											<div className="address__detail address__detail--form">
												Não encontrado :(
											</div>
										) : (
											<>
												<div className="address__detail address__detail--form">
													{data.logradouro}
													<span>
														{data.bairro}, {data.uf}
													</span>
												</div>
												<AddressForm
													cep={data.cep}
													rua={data.logradouro}
													bairro={data.bairro}
													href={undefined}
													input={input}
												/>
											</>
										))}
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="location__card">
					<IconShop />
					{total ? total : 'vazio'}
				</div>
			</div>
		</div>
	);
};

export default DefaultFooter;
