import { useRouter } from 'next/router';
import useFormCep from '~/effects/useFormCep';
import { useAddressContext } from '~/context/address.context';

const AddressForm = ({ cep, rua, bairro }) => {
	const [{ values, loading }, handleChange, handleSubmitCep] = useFormCep();
	const { inputAddress } = useAddressContext();

	const router = useRouter();
	const href = '/default';
	const sendConfirm = (e) => {
		e.preventDefault();
		const newAddress = {
			cep,
			rua,
			bairro,
			...values,
		};
		inputAddress(newAddress);
		router.push(href);
	};

	return (
		<div className="form__group cep__form">
			<form onSubmit={handleSubmitCep(sendConfirm)}>
				<input
					type="text"
					className="form__input"
					placeholder="Número"
					name="numero"
					onChange={handleChange}
				/>
				<input
					type="text"
					className="form__input"
					placeholder="Complemento"
					name="complemento"
					onChange={handleChange}
				/>
				<a
					href={href}
					onClick={sendConfirm}
					className={
						values === undefined
							? 'home__btn cep__btn'
							: 'home__btn cep__btn cep__btn--show'
					}
				>
					{loading ? '...' : 'ok'}
				</a>
			</form>
		</div>
	);
};

export default AddressForm;
