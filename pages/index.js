import { useState, useEffect } from 'react';
import Link from 'next/link';
//import { firebase } from '~/pages/api/firebase';
import { database, storage } from '../services/config';
// import { loadFirebase } from '../services/firebase';

const Index = ({ store }) => {
	return (
		<main className="main">
			{/* <div>{JSON.stringify(data)}</div> */}
			{store.map((store, i) => {
				return (
					<Link key={i} href={`/loja/${store.slug}`}>
						<a className="store">{store.name}</a>
					</Link>
				);
			})}
			<Link href="/adm">
				<a className="store">PAINEL</a>
			</Link>
		</main>
	);
};

Index.getInitialProps = async () => {
	const firebase = await database;
	let store = [];
	await firebase
		.collection('stores')
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				store.push(doc.data());
			});
		});

	return { store };
};

export default Index;
