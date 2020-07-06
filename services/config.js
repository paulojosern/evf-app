import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

!firebase.apps.length
	? firebase.initializeApp({
			apiKey: 'AIzaSyA5UpzOuPa2uKo0U2b7lpXbIFk8xIUQ7sU',
			authDomain: 'eu-vou-facil.firebaseapp.com',
			databaseURL: 'https://eu-vou-facil.firebaseio.com',
			projectId: 'eu-vou-facil',
			storageBucket: 'eu-vou-facil.appspot.com',
			messagingSenderId: '881353910917',
			appId: '1:881353910917:web:814a2648bed11a8daa57ec',
			measurementId: 'G-6YMMJTPYDC',
	  })
	: firebase.app();

const database = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, database, auth, storage };
