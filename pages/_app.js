import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import { AddressProvider } from '~/context/address.context';
import { StoreProvider } from '~/context/store.context';
import { ThemeProvider } from 'styled-components';
import '~/src/sass/style.scss';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

const theme = {
	colors: {
		primary: '#0070f3',
	},
};

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
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
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</StoreProvider>
			</AddressProvider>
		);
	}
}

export default MyApp;
