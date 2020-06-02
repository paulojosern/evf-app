import React, { createContext, useContext, useState } from 'react';

const ShopCardContext = createContext({});

const ShopCardProvider = ({ children }) => {
	const [ShopCardState, setShopCard] = useState({ visible: false });

	const inputShopCard = (payload) => {
		setShopCard({ ...payload, visible: true });
	};
	const changeShopCard = () => {
		setShopCard({ visible: false });
	};
	return (
		<ShopCardContext.Provider
			value={{ ShopCardState, inputShopCard, changeShopCard }}
		>
			{children}
		</ShopCardContext.Provider>
	);
};

const useShopCardContext = () => {
	const context = useContext(ShopCardContext);
	return context;
};

export { useShopCardContext, ShopCardProvider };
