import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext({});

const StoreProvider = ({ children }) => {
	const [storeState, setStoreState] = useState({ visible: false });

	const inputStore = (payload) => {
		setStoreState({ ...payload, visible: true });
	};

	return (
		<StoreContext.Provider value={{ storeState, inputStore }}>
			{children}
		</StoreContext.Provider>
	);
};

const useStoreContext = () => {
	const context = useContext(StoreContext);
	return context;
};

export { useStoreContext, StoreProvider };
