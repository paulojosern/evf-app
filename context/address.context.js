import React, { createContext, useContext, useState } from 'react';

const AddressContext = createContext({});

const AddressProvider = ({ children }) => {
	const [addressState, setAddress] = useState({ visible: false });

	const inputAddress = (payload) => {
		setAddress({ ...payload, visible: true });
	};
	const changeAddress = () => {
		setAddress({ visible: false });
	};
	return (
		<AddressContext.Provider
			value={{ addressState, inputAddress, changeAddress }}
		>
			{children}
		</AddressContext.Provider>
	);
};

const useAddressContext = () => {
	const context = useContext(AddressContext);
	return context;
};

export { useAddressContext, AddressProvider };
