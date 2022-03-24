import firebase from "firebase/compat/app";
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBl0s48SQUWLIIBRaAtZmRbetVe6Ivfgtk",
    authDomain: "taxi-app-6367a.firebaseapp.com",
    projectId: "taxi-app-6367a",
    storageBucket: "taxi-app-6367a.appspot.com",
    messagingSenderId: "252866037998",
    appId: "1:252866037998:web:8fc37383c8ed7f9abc0bff",
    measurementId: "G-50JLDH98CQ"
};

const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage(app);
export default storage;