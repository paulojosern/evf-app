import Link from 'next/link';
import { firebase } from '~/pages/api/firebase';

const Index = ({ data }) => {
	return (
		<main className="main">
			{/* <div>{JSON.stringify(data)}</div> */}
			{data.map((store, i) => {
				return (
					<Link key={i} href={`/store/${store.slug}`}>
						<a className="store">{store.title}</a>
					</Link>
				);
			})}
		</main>
	);
};

Index.getInitialProps = async () => {
	const data = await firebase;

	return { data };
};

export default Index;
