export const price = (value) => {
	return value
		.replace(/\D/g, '')
		.replace(/(\d{1,4})(\d{2})/, '$1,$2')
		.replace(/(,\d{2})\d+?$/, '$1');
};

export const priceData = (value) => {
	return value
		.replace(/\D/g, '')
		.replace(/(\d{1,4})(\d{2})/, '$1.$2')
		.replace(/(,\d{2})\d+?$/, '$1');
};

export const handleInput = (e) => {
	if (e.target.value.length === 1) {
		const value = e.target.value + ',00';
		e.target.value = value;
		e.target.setAttribute('placeholder', value);
	} else if (e.target.value.length === 2) {
		let split = e.target.value.split('');
		const value = split[0] + ',' + split[1] + '0';
		e.target.value = value;
		e.target.setAttribute('placeholder', value);
	} else if (e.target.value.length === 7) {
		let split = e.target.value.split('');
		const value =
			split[0] +
			'.' +
			split[1] +
			split[2] +
			split[3] +
			split[4] +
			split[5] +
			split[6];
		e.target.value = value;
		e.target.setAttribute('placeholder', value);
	}
};
export const handleUp = (e) => {
	e.target.setAttribute(
		'placeholder',
		e.target.placeholder.replace(/(\d{1})/, '')
	);
};

export const rnd = () => {
	return Math.floor(Math.random() * (9000 - 100 + 1) + 100);
};
