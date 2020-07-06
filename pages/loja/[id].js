import { useState, useEffect } from 'react';
import { useStoreContext } from '~/context/store.context';
import StoreAddress from '~/components/store.address';
import { database } from '~/services/config';

const Store = ({ store }) => {
	const { inputStore } = useStoreContext();
	const [state, setState] = useState(false);
	store && console.log(store);
	useEffect(() => {
		inputStore({ store });
	}, [store]);
	return !store ? (
		<div className="home">
			<div className="loader--position">
				<div className="loader__circle"></div>
			</div>
		</div>
	) : (
		!state && (
			<main className="home">
				<StoreAddress
					setState={setState}
					theme={store.colors}
					slug={store.slug}
				/>
			</main>
		)
	);
};
export default Store;

Store.getInitialProps = async ({ query }) => {
	const pid = query.id;
	const firebase = await database;
	let store = {};
	await firebase
		.collection('stores')
		.where('slug', '==', pid)
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				store = doc.data();
			});
		});
	return { store };
};
