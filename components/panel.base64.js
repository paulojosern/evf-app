import { usePanelContext } from '~/context/panel.context';
const PanelBase64 = ({ setMsg }) => {
	const { panelState, inputStatePanel } = usePanelContext();
	const upload = (e) => {
		e.preventDefault();
		var file = e.currentTarget.files[0];
		var fileSize = e.currentTarget.files[0].size;
		var fileName = e.currentTarget.files[0].name;
		var fileLimit = 350;
		var fileSizeInKB = fileSize / 1024; // this would be in kilobytes defaults to bytes
		var reader = new FileReader();
		var img = new Image();
		img.src = window.URL.createObjectURL(file);
		img.onload = () => {
			if (img.width <= 1000) {
				reader.onloadend = function () {
					if (fileSizeInKB < fileLimit) {
						var resultado = reader.result;
						inputStatePanel({ ...panelState, logo: resultado });
						setMsg({
							active: true,
							type: 'sucesso',
							message: 'Alterado com sucesso',
						});
					} else {
						setMsg({
							active: true,
							type: 'error',
							message: `A imagem ${fileName} tem  ( ${fileSize} KB) mais de ${fileLimit} KB.`,
						});
					}
				};
				reader.readAsDataURL(file);
				return true;
			}
			setMsg({
				active: true,
				type: 'error',
				message: `A imagem ${fileName} tem ${img.width} x ${img.height}.`,
			});
			return true;
		};
	};

	return (
		<div className="about__logo">
			{panelState.logo ? (
				<div
					className="logo"
					style={{ backgroundImage: `url(${panelState.logo})` }}
				>
					{/* {panelState.logo && <img src={panelState.logo} className="logo" />} */}
				</div>
			) : (
				'Adicione um logo'
			)}

			<input
				type="file"
				name="description"
				className="hidden"
				onChange={upload}
				id="file"
			/>
			<label className="logo__btn" htmlFor="file"></label>
			{/* <span>{panelState.logo ? 'Trocar' : 'Inserir'} logo</span> */}
		</div>
	);
};

export default PanelBase64;
