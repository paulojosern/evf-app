import Router from 'next/router';
import Head from 'next/head';
import { AddressProvider } from '~/context/address.context';
import { StoreProvider } from '~/context/store.context';
import Store from '../store';
import { initialState as auth } from '../store/Session';
import NProgress from 'nprogress';
import '~/src/sass/style.scss';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

Router.events.on('routeChangeStart', (url) => {
	console.log(`Loading: ${url}`);
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
	return (
		<AddressProvider>
			<StoreProvider>
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicons/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicons/favicon-16x16.png"
					/>
					<link rel="manifest" href="/favicons/site.webmanifest" />
					<link
						rel="mask-icon"
						href="/favicons/safari-pinned-tab.svg"
						color="#5bbad5"
					/>
					<meta name="msapplication-TileColor" content="#2b5797" />
					<meta name="theme-color" content="#ffffff" />
					<meta
						name="viewport"
						content="width=device-width, user-scalable=no"
					/>
					<link rel="shortcut icon" href="/favicons/favicon.ico" />
					<title>Eu Vou facil</title>
				</Head>
				<Store.Provider initialState={auth}>
					<Component {...pageProps} />
				</Store.Provider>
			</StoreProvider>
		</AddressProvider>
	);
}
