import React, { createContext, useContext, useState } from 'react';

const PanelContext = createContext({});

const PanelProvider = ({ children }) => {
	const [panelState, setPanelState] = useState();
	const [panelCategories, setPanelCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [confirm, setConfirm] = useState({
		active: false,
		msg: '',
		function: null,
	});

	const inputStatePanel = (payload) => {
		setPanelState({ ...payload });
	};

	const inputCategories = (payload) => {
		setPanelCategories([...payload]);
	};

	const showLoading = (value) => {
		setLoading(value);
	};

	const showConfirm = (payload) => {
		setConfirm({ ...payload });
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
				confirm,
				showConfirm,
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
