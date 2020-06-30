import { useState } from 'react';
const ProductImages = ({ id, pics, setPics }) => {
	const [msg, setMsg] = useState({
		active: false,
		type: '',
		message: '',
	});
	pics && console.log(pics);

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
						const newPics = pics.concat({ image: resultado });
						setPics(newPics);
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

	return (
		<>
			<div className="product__images">
				{msg.active && (
					<div className={`image__msg image__msg--${msg.type}`}>
						{msg.message}
					</div>
				)}
				{pics &&
					pics.map((img, i) => (
						<div
							key={i}
							className="image"
							style={{ backgroundImage: `url(${img.image})` }}
						></div>
					))}
				<input
					type="file"
					name="description"
					className="hidden"
					onChange={upload}
					id={`file${id}`}
				/>
				<label
					className="image__add"
					htmlFor={`file${id}`}
					onClick={() =>
						setMsg({
							active: false,
							type: '',
							message: '',
						})
					}
				></label>
			</div>
		</>
	);
};

export default ProductImages;
