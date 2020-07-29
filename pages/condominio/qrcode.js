import React from 'react';
import { useQRCode } from 'react-hook-qrcode';

function QRCode() {
	const [inputRef] = useQRCode({
		text: 'https://pudim.com.br/',
		options: {
			level: 'M',
			margin: 7,
			scale: 1,
			width: 200,
			color: {
				dark: '#222',
				light: '#fff',
			},
		},
	});

	return <canvas ref={inputRef} />;
}

export default QRCode;
