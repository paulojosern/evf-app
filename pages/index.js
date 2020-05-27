import Main from '~/partials/main';
import Default from '~/partials/default';
import { AddressProvider } from '~/context/address.context';

const Home = () => {
	return (
		<AddressProvider>
			<Main />
			<Default />
		</AddressProvider>
	);
};

export default Home;
