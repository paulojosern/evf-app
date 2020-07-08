import IconDelete from '~/assets/logos/icon-garbage.svg';

const Option = ({ product, removeOption }) =>
	product && product.options !== undefined ? (
		<>
			{product.options.lentgh > 0 && (
				<>
					<br />
					<label className="panel__label">Opções</label>
				</>
			)}
			<div className="option">
				{product.options.map((option, i) => {
					const id = option.id;
					return (
						<div className="option__item" key={i}>
							<div className="option__detail">
								<h3>{option.description}</h3>{' '}
								{option.price && <span>R$ {option.price}</span>}
							</div>
							<button
								onClick={(e) => removeOption(e, id)}
								className="btn--icon-delete"
							>
								<IconDelete />
							</button>
						</div>
					);
				})}
			</div>
		</>
	) : (
		<div className="line"></div>
	);

export default Option;
