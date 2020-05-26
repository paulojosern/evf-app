import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import '../src/sass/style.scss';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Head>
					<title>Eu Vou facil</title>
				</Head>
				<Component {...pageProps} />
			</>
		);
	}
}

export default MyApp;
