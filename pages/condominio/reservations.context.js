import React, { createContext, useContext, useState } from 'react';

const ReservationsContext = createContext({});

const ReservationsProvider = ({ children }) => {
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
		<ReservationsContext.Provider
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
		</ReservationsContext.Provider>
	);
};

const useReservationsContext = () => {
	const context = useContext(ReservationsContext);
	return context;
};

export { useReservationsContext, ReservationsProvider };
