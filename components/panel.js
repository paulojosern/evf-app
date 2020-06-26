import { useEffect, useState, useRef } from 'react';
import { database } from '../services/config';
import Link from 'next/link';
import { useSession } from '~/store/Session';
import { usePanelContext } from '~/context/panel.context';
import PanelStore from '~/components/panel.store';
import PanelContent from '~/components/panel.content';

const Panel = () => {
	const { currentUser } = useSession();
	const { panelState, inputStatePanel } = usePanelContext();
	const [fixed, setFixed] = useState(false);
	const [toogleStore, setToogleStore] = useState(true);

	const [msg, setMsg] = useState({
		active: false,
		type: '',
		message: '',
	});
	const about = useRef();

	// const scrolling = () => {
	// 	const top = about.current.getBoundingClientRect().y;
	// 	window.addEventListener('scroll', () => {
	// 		if (document.documentElement.scrollTop >= top) {
	// 			setFixed(true);
	// 		} else {
	// 			setFixed(false);
	// 		}
	// 	});
	// };
	// useEffect(() => {
	// 	scrolling();
	// }, []);

	useEffect(() => {
		getStoreFromDB(currentUser.email);
	}, [currentUser]);

	const handleCloseMsg = () => {
		setMsg({
			active: false,
		});
	};

	const getStoreFromDB = async (userID) => {
		const db = await database;
		return db
			.collection('stores')
			.doc(userID)
			.get()
			.then((user) => {
				inputStatePanel(user.data());
			});
	};

	const Msg = () => {
		useEffect(() => {
			// setTimeout(() => {
			// 	setMsg({
			// 		active: false,
			// 	});
			// }, 20000);
		});
		return (
			msg.active === true && (
				<label
					className={`panel__msg panel__msg--${msg.type}`}
					onClick={handleCloseMsg}
				>
					{msg.message}
				</label>
			)
		);
	};

	return (
		<div className="panel">
			<Msg />
			<div className="panel__header">
				<div className="header">
					{!panelState ? (
						<div className="loader">
							<div className="loader__circle"></div>
						</div>
					) : (
						<h1>{panelState.name && panelState.name}</h1>
					)}
					<div className="flex middle">
						<button onClick={() => setToogleStore(false)}>Minha Loja</button>
						<button onClick={() => setToogleStore(true)}>Meus produtos</button>
						<Link href="/account">
							<a className="store">Conta</a>
						</Link>{' '}
					</div>
				</div>
			</div>
			<div className="panel__content">
				<PanelStore
					fixed={fixed}
					about={about}
					user={currentUser.email}
					setMsg={setMsg}
					toogleStore={toogleStore}
				/>
				<PanelContent
					setMsg={setMsg}
					user={currentUser.email}
					toogleStore={toogleStore}
				/>
			</div>
		</div>
	);
};
export default Panel;
