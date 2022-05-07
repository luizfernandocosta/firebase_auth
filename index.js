// const exports = {}
// Importing dependencies
// const firebase = require('firebase');
const firebase = require('firebase/app');
const firebaseAuth = require('firebase/auth');
const dotenv = require('dotenv');

dotenv.config();

// Creating firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
  appId: `${process.env.APP_ID}`,
};

// Initializing firebase
firebase.initializeApp(firebaseConfig);

// Getting auth instance
let auth = firebaseAuth.getAuth();

// Handling login
const handleLogin = async (event) => {

    let userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, event.email, event.password)
                                .then((userCredential) => {
                                    const user = userCredential.user.providerData[0];
                                    const token = userCredential.user.stsTokenManager;
                                    return {
                                        "name": user.displayName,
                                        "email": user.email,
                                        "phoneNumber": user.phoneNumber,
                                        "photoURL": user.photoURL,
                                        "refreshToken": token.refreshToken,
                                        "expirationTime": token.expirationTime,
                                    };
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    return `${errorCode}`;
                                });

    return userCredential;


}

exports.handler = handleLogin;