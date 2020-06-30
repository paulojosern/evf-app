import { useEffect, useState, useRef } from 'react';
import { database } from '../services/config';
import { useSession } from '~/store/Session';
import { usePanelContext } from '~/context/panel.context';
import PanelStore from '~/components/panel.store';
import PanelContent from '~/components/panel.content';
import { useAuth } from '../store/Auth';

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
	const panel = useRef();
	const { signout } = useAuth();

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

	useEffect(() => {
		panel.current.scrollTop = 0;
	}, [toogleStore]);

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
		<div className="panel" ref={panel}>
			<Msg />
			<div className="panel__header">
				{!panelState ? (
					<div className="header__loader loader">
						<div className="loader__circle"></div>
					</div>
				) : (
					<div className="header">
						<div className="header__title">
							{panelState.logo && (
								<div
									className="header__logo"
									style={{ backgroundImage: `url(${panelState.logo})` }}
								>
									{' '}
								</div>
							)}
							{panelState.name && panelState.name}
						</div>

						<div
							className={
								toogleStore
									? 'header__buttons'
									: 'header__buttons header__buttons--store'
							}
						>
							<button
								className={
									!toogleStore
										? 'header__btn'
										: 'header__btn header__btn--active'
								}
								onClick={() => setToogleStore(true)}
							>
								Meus produtos
							</button>
							<button
								className={
									toogleStore
										? 'header__btn'
										: 'header__btn header__btn--active'
								}
								onClick={() => setToogleStore(false)}
							>
								Minha loja
							</button>
							{/* <Link href="/account">
							<a className="store">Conta</a>
						</Link> */}
						</div>

						<button className="header__account" onClick={() => signout()}>
							Sair
						</button>
					</div>
				)}
			</div>
			<div className="panel__content">
				<PanelStore
					fixed={fixed}
					// about={about}
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
