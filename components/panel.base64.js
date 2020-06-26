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
		<div className="panel__item panel__item--inline top between">
			<div className="item ">
				{panelState.logo && <img src={panelState.logo} className="logo" />}
			</div>
			<div className="item right">
				<input
					type="file"
					name="description"
					className="panel__input hidden"
					onChange={upload}
					id="file"
				/>
				<label className=" btn--file" htmlFor="file">
					{panelState.logo ? 'Trocar' : 'Inserir'} logo
				</label>
			</div>
		</div>
	);
};

export default PanelBase64;
