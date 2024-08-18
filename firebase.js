    // Import the functions you need from the SDKs you need
    import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyATYiR0M9S1NHhrkU-rfaOwfUYMwWCWExk",
    authDomain: "flashcard-saas-e3486.firebaseapp.com",
    projectId: "flashcard-saas-e3486",
    storageBucket: "flashcard-saas-e3486.appspot.com",
    messagingSenderId: "642221440123",
    appId: "1:642221440123:web:ff6385690c348d6153b6de",
    measurementId: "G-2JN2CYM03T"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);