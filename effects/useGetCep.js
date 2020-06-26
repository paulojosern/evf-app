import { useState } from 'react';
import axios from 'axios';

const useGetCep = () => {
	const [data, setData] = useState();

	const getCep = (newcep) => {
		axios
			.get(`https://viacep.com.br/ws/${newcep}/json/`)
			.then(function (response) {
				setData(response.data);
			})
			.catch((error) => console.log(error));
	};

	// const getCepStore = (newcep) => {
	// 	const [cep, setCep] = useState();
	// 	axios
	// 		.get(`https://viacep.com.br/ws/${newcep}/json/`)
	// 		.then(function (response) {
	// 			setCep(response.data);
	// 		})
	// 		.catch((error) => {
	// 			setCep(error);
	// 		});
	// 	return cep;
	// };

	return [{ data }, getCep];
};

export default useGetCep;
