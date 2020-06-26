const firebaseConfig = {
	apiKey: 'AIzaSyA5UpzOuPa2uKo0U2b7lpXbIFk8xIUQ7sU',
	authDomain: 'eu-vou-facil.firebaseapp.com',
	databaseURL: 'https://eu-vou-facil.firebaseio.com',
	projectId: 'eu-vou-facil',
	storageBucket: 'eu-vou-facil.appspot.com',
	messagingSenderId: '881353910917',
	appId: '1:881353910917:web:814a2648bed11a8daa57ec',
	measurementId: 'G-6YMMJTPYDC',
};
let auth = '';

export async function loadFirebase() {
	const firebase = await import('firebase/app');
	await import('firebase/firestore');
	await import('firebase/auth');
	try {
		if (!firebase.apps.length) {
			const app = firebase.initializeApp(firebaseConfig);
			firebase.firestore(app);
			auth = firebase.auth();
		}
	} catch (err) {
		console.log(err);
		if (!/already exists/.test(err.message)) {
			console.error('Firebase initialization error', err.stack);
		}
	}
	return firebase;
}

export { auth };

// import firebase from 'firebase/app';
// import 'firebase/auth';
// const config = {
// 	apiKey: 'AIzaSyA5UpzOuPa2uKo0U2b7lpXbIFk8xIUQ7sU',
// 	authDomain: 'eu-vou-facil.firebaseapp.com',
// 	databaseURL: 'https://eu-vou-facil.firebaseio.com',
// 	projectId: 'eu-vou-facil',
// 	storageBucket: 'eu-vou-facil.appspot.com',
// 	messagingSenderId: '881353910917',
// 	appId: '1:881353910917:web:814a2648bed11a8daa57ec',
// 	measurementId: 'G-6YMMJTPYDC',
// };
// if (!firebase.apps.length) {
// 	firebase.initializeApp(config);
// }
// const auth = firebase.auth();
// export { auth, firebase };
