import Link from 'next/link';
//import { firebase } from '~/pages/api/firebase';
import { database, auth } from '../services/config';
// import { loadFirebase } from '../services/firebase';

const Index = ({ data }) => {
	// console.log(data);
	return (
		<main className="main">
			{/* <div>{JSON.stringify(data)}</div> */}
			{data.map((store, i) => {
				return (
					<Link key={i} href={`/loja/${store.slug}`}>
						<a className="store">{store.title}</a>
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
	//const firebase = await loadFirebase();
	const firebase = await database;
	let data = [];
	await firebase
		.collection('stores')
		// .where('state', '==', 'published')
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				data.push(doc.data());
			});
		});
	return { data };
};

export default Index;
