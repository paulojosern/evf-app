const Confirm = ({ confirm, setConfirm }) => {
	const handleConfirm = (callback) => (e) => {
		setConfirm({
			active: false,
		});
		callback(e);
	};

	return (
		<div
			className={
				confirm && !confirm.active
					? 'scheduling__wrap'
					: 'scheduling__wrap scheduling__wrap--show'
			}
		>
			<div className="confirm">
				<h3>{confirm && confirm.msg}</h3>
				<br />
				<div className="flex--row between">
					<button
						className="confirm__btn confirm__btn--not"
						onClick={() =>
							setConfirm({
								active: false,
							})
						}
					>
						não
					</button>
					<button
						className="confirm__btn"
						onClick={handleConfirm(confirm && confirm.function)}
					>
						sim
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirm;
