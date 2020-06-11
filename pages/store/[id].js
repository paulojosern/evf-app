import { useState, useEffect } from 'react';
import { useStoreContext } from '~/context/store.context';
import StoreAddress from '~/components/store.address';
import { firebase } from '~/pages/api/firebase';

const Store = ({ store }) => {
	const { inputStore } = useStoreContext();
	const [state, setState] = useState(false);
	useEffect(() => {
		inputStore({ store });
	}, [store]);
	return (
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
	const data = await firebase;
	const id = Object.keys(data).find((item) => data[item].slug === pid);
	const store = data[id];
	return { store };
};
