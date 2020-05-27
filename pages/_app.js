import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import '~/src/sass/style.scss';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, user-scalable=no"
					/>
					<title>Eu Vou facil</title>
				</Head>
				<Component {...pageProps} />
			</>
		);
	}
}

export default MyApp;
