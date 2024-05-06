import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCrjDTr0dgOO7UIbCboRyDv1zptAfpxe2Q",
    authDomain: "react-netflix-clone-af7b8.firebaseapp.com",
    projectId: "react-netflix-clone-af7b8",
    storageBucket: "react-netflix-clone-af7b8.appspot.com",
    messagingSenderId: "342162477986",
    appId: "1:342162477986:web:d2fc667659ccd0666f18fb",
    measurementId: "G-DM4R5SSNDR"
};


const app = initializeApp(firebaseConfig);

/* This will point to our netflix application */
export const firebaseAuth = getAuth(app)