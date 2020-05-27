import useFormCep from '~/effects/useFormCep';
import { useAddressContext } from '~/context/address.context';

const AddressForm = ({ rua, bairro }) => {
	const [{ values, loading }, handleChange, handleSubmitCep] = useFormCep();
	const { inputAddress } = useAddressContext();

	const sendConfirm = () => {
		const newAddress = {
			rua,
			bairro,
			...values,
		};
		inputAddress(newAddress);
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
				<button
					type="submit"
					onClick={sendConfirm}
					className={
						values === undefined
							? 'home__btn cep__btn'
							: 'home__btn cep__btn cep__btn--show'
					}
				>
					{loading ? '...' : 'ok'}
				</button>
			</form>
		</div>
	);
};

export default AddressForm;
