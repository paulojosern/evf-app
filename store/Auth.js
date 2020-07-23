import { database, auth } from '~/services/config';
import { useRouter } from 'next/router';
import Store from './';

export function useAuth() {
	const [, setState] = Store.useStore();
	const router = useRouter();

	const getUserFromDB = async (userID) => {
		const db = await database;
		return db
			.collection('users')
			.doc(userID)
			.get()
			.then((user) => {
				return user.data();
			});
	};

	const getApartment = async (apartment) => {
		const db = await database;
		return db
			.collection('users')
			.where('apartment', '==', apartment)
			.get()
			.then(async (snapshot) => {
				let value = '';
				await snapshot.forEach((doc) => {
					value = doc.data();
				});
				if (value !== '') return value;
			});
	};

	const getDayFromDB = async (day) => {
		const db = await database;
		return db
			.collection('calendar')
			.doc(day)
			.get()
			.then((user) => {
				return user.data();
			});
	};

	const saveUserToDB = async (user, name, apartment) => {
		const db = await database;
		return db
			.collection('users')
			.doc(user.uid.toString())
			.set({
				id: user.uid.toString(),
				name,
				email: user.email,
				apartment,
			})
			.then(() => {
				setState({
					currentUser: {
						id: user.uid.toString(),
						name,
						email: user.email,
					},
					isLoggedIn: true,
				});
			});
	};

	const signup = (email, password, userName, apto) => {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				// We want to save the user to our own collection with custom attributes for us
				saveUserToDB(response.user, userName, apartment);
				return response.user;
			});
	};

	const signin = (email, password) => {
		return auth
			.signInWithEmailAndPassword(email, password)
			.then(async (response) => {
				const user = await getUserFromDB(response.user.uid);
				setState({
					currentUser: user,
					isLoggedIn: true,
				});
				return response.user;
			})
			.catch(function (error) {
				// var errorCode = error.code;
				// var errorMessage = error.message;
				// console.log(error);
				setState({
					msg: error.code,
				});
			});
	};

	const resetPassword = (password) => {
		var user = auth.currentUser;
		var newPassword = password;
		// console.log(user);
		// console.log(password);
		return user.updatePassword(newPassword).then(() => {
			setState({
				currentUser: null,
				isLoggedIn: false,
			});
			router.push('/adm');
		});
	};

	const updateMail = (emailAddress) => {
		var user = auth.currentUser;
		// console.log(user);
		console.log(emailAddress);
		return user.updateEmail(emailAddress).then(() => {
			setState({
				currentUser: null,
				isLoggedIn: false,
			});
			router.push('/adm');
		});
	};

	const sendEmail = (emailAddress) => {
		return auth
			.sendPasswordResetEmail(emailAddress)
			.then(function (result) {
				console.log(result);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const signout = () => {
		return auth.signOut().then(() => {
			setState({
				currentUser: null,
				isLoggedIn: false,
			});
			router.push('/adm');
		});
	};

	return {
		signup,
		signout,
		signin,
		resetPassword,
		sendEmail,
		updateMail,
		getApartment,
		getDayFromDB,
	};
}
