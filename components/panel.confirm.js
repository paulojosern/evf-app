import { usePanelContext } from '~/context/panel.context';
const PanelConfirm = () => {
	const { confirm, showConfirm } = usePanelContext();

	const handleConfirm = (callback) => (e) => {
		showConfirm({
			active: false,
		});
		callback(e);
	};

	return (
		<div
			className={
				confirm.active
					? 'panel__confirm panel__confirm--show'
					: 'panel__confirm'
			}
		>
			<div className="confirm__content">
				<h3>{confirm.msg}</h3>
				<div className="line"></div>
				<div className="flex end">
					<button
						className="btn btn--delete"
						onClick={() =>
							showConfirm({
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

export default PanelConfirm;
