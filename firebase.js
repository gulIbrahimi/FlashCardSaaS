    // Import the functions you need from the SDKs you need
    import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

    // Your web app's Firebase configuration
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
    const db = getFirestore(app); // Add this line to initialize Firestore

    export { db }; // Export the Firestore instance
