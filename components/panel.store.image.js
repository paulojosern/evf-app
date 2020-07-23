import { useState } from 'react';
import { usePanelContext } from '~/context/panel.context';

const StoreImage = () => {
	const { panelState, inputStatePanel } = usePanelContext();
	const [msg, setMsg] = useState({
		active: false,
		type: '',
		message: '',
	});
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
						// const newPics = pics.concat({ id: rnd(), image: resultado });
						// setPics(newPics);
						// setImage(resultado);
						// setPanelImage();
						inputStatePanel({ ...panelState, image: resultado });
					} else {
						setMsg({
							active: true,
							type: 'error',
							message: `Erro: A imagem ${fileName} tem  ( ${fileSize} KB) mais de ${fileLimit} KB.`,
						});
					}
				};
				reader.readAsDataURL(file);
				return true;
			}
			setMsg({
				active: true,
				type: 'error',
				message: `Erro:  A imagem ${fileName} tem ${img.width} x ${img.height}.`,
			});
			return true;
		};
	};

	const removeImage = (value) => {
		let images = pics;
		images = images.filter((pic) => pic.id !== value);
		setPics(images);
	};

	return (
		<div className="about__image">
			{msg.active && (
				<div className={`image__msg image__msg--${msg}`}>{msg.message}</div>
			)}
			<label className="panel__label">Imagen de fundo</label>
			{!panelState.image && 'Adicione uma imagem de fundo'}
			<div
				className="image"
				style={{ backgroundImage: `url(${panelState.image})` }}
			>
				<input
					type="file"
					name="description"
					className="hidden"
					onChange={upload}
					id="background"
				/>

				<label
					className="image__add"
					htmlFor="background"
					onClick={() =>
						setMsg({
							active: false,
							type: '',
							message: '',
						})
					}
				></label>
			</div>
		</div>
	);
};

export default StoreImage;
