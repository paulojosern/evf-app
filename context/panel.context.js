import React, { createContext, useContext, useState } from 'react';

const PanelContext = createContext({});

const PanelProvider = ({ children }) => {
	const [panelState, setPanelState] = useState();
	const [panelCategories, setPanelCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const inputStatePanel = (payload) => {
		setPanelState({ ...payload });
	};

	const inputCategories = (payload) => {
		setPanelCategories([...payload]);
	};

	const showLoading = (value) => {
		setLoading(value);
	};

	return (
		<PanelContext.Provider
			value={{
				panelState,
				inputStatePanel,
				panelCategories,
				inputCategories,
				loading,
				showLoading,
			}}
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
