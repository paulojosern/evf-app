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
				!confirm.active
					? 'scheduling__wrap'
					: 'scheduling__wrap scheduling__wrap--show'
			}
		>
			<div className="confirm">
				<h3>{confirm.msg}</h3>
				<div className="line"></div>
				<div className="flex--row between">
					<button
						className="btn btn--delete"
						onClick={() =>
							setConfirm({
								active: false,
							})
						}
					>
						não
					</button>
					<button className="btn" onClick={handleConfirm(confirm.function)}>
						sim
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirm;
