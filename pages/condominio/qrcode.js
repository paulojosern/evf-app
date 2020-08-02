import React from 'react';
import { useQRCode } from 'react-hook-qrcode';

function QRCode({ id }) {
	const str = `https://euvoufacil.com.br/condominio/confirmation/${id}`;
	const [inputRef] = useQRCode({
		text: str,
		options: {
			level: 'M',
			margin: 7,
			scale: 1,
			width: 200,
			color: {
				dark: '#111',
				light: '#fff',
			},
		},
	});

	return <canvas ref={inputRef} />;
}

export default QRCode;
