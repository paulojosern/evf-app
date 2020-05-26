import { useState } from 'react';

const useFormCep = (callback) => {
	const [values, setValues] = useState();
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		const auxValues = { ...values };
		auxValues[event.target.name] = event.target.value;
		event.target.value === '' ? setValues() : setValues(auxValues);
	};

	const handleSubmitCep = (callback) => (event) => {
		event.preventDefault();
		setLoading(true);
		callback();
		setLoading(false);
	};

	return [{ values, loading }, handleChange, handleSubmitCep];
};

export default useFormCep;
