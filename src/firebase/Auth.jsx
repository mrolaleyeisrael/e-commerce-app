// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBNPHK12GDkC4UJ01pZdClJ4Z6_dcYNFm0",
	authDomain: "e-commerce-app-51c74.firebaseapp.com",
	projectId: "e-commerce-app-51c74",
	storageBucket: "e-commerce-app-51c74.appspot.com",
	messagingSenderId: "533437921497",
	appId: "1:533437921497:web:36344dfee7bd49506866c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
	const [user, setUser] = useState();

	const signUp = (email, password, displayName) =>
		createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
			updateProfile(user, { displayName });
			setUser(user);
			return user;
		});

	const signIn = (email, password) =>
		signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
			setUser(user);
			return user;
		});

	const signOutUser = () => signOut(auth).then(() => setUser(null));

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			user ? setUser(user) : setUser(null);
		});

		return () => unsubscribe();
	});

	return {
		signIn,
		signUp,
		signOut: signOutUser,
		user,
	};
}

export default AuthProvider;
