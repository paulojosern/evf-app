import React, { createContext, useContext, useState } from 'react';

const PanelContext = createContext({});

const PanelProvider = ({ children }) => {
	const [panelState, setPanelState] = useState();
	const [panelCategories, setPanelCategories] = useState([]);

	const inputStatePanel = (payload) => {
		setPanelState({ ...payload });
	};

	const inputCategories = (payload) => {
		setPanelCategories([...payload]);
	};

	return (
		<PanelContext.Provider
			value={{ panelState, inputStatePanel, panelCategories, inputCategories }}
		>
			{children}
		</PanelContext.Provider>
	);
};

const usePanelContext = () => {
	const context = useContext(PanelContext);
	return context;
};

export { usePanelContext, PanelProvider };
